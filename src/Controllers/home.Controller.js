

import sql from 'mssql';
import bcrypt from 'bcrypt';
import { executeQuery } from '../Services/azureDBConnect.js';
import { getConnection } from '../Services/azureDBConnect.js';

// Normaliza listas CSV: recorta espacios, elimina vacíos y sinónimos de "ninguno",
// y de-duplica de forma case-insensitive preservando el primer casing visto.
const normalizeCsvList = (input) => {
    if (!input || typeof input !== 'string') return '';
    const noneSynonyms = new Set(['sin padecimiento','ninguno','ninguna','n/a','na','no aplica','ninguna alergia']);
    const map = new Map(); // lower -> original
    input.split(',').forEach(raw => {
        const token = String(raw || '').trim();
        if (!token) return;
        const lower = token.toLowerCase();
        if (noneSynonyms.has(lower)) return;
        if (!map.has(lower)) map.set(lower, token);
    });
    return Array.from(map.values()).join(', ');
};

export const getRecomendations = async (req, res) => {
    const { usuario_id } = req.query;
    const { filterType } = req.query;
    if (!filterType || !usuario_id) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros necesarios' });
    }
    try {
        const pool = await getConnection();
        const request = await pool.request();
        request.input('usuario_id', sql.Int, usuario_id);
        request.input('filterType', sql.NVarChar(20), filterType);
        const result = await request.execute('sp_GetHomeRecommendations');

        res.json({ success: true, data: result.recordset });
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener recomendaciones', error: error.message });
    }
};

export const toggleFavorite = async (req, res) => {
    const { usuario_id, receta_id } = req.body;

    if (!usuario_id || !receta_id) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros necesarios' });
    }

    try {
        const pool = await getConnection();
        const request = await pool.request();
        request.input('usuario_id', sql.Int, usuario_id);
        request.input('receta_id', sql.Int, receta_id);

        const result = await request.execute('sp_ToggleUsuarioFavorito');

        res.json({ success: true, message: 'Estado de favorito actualizado', data: result.recordset });
    } catch (error) {
        console.error('Error al alternar favorito:', error);
        return res.status(500).json({ success: false, message: 'Error al alternar favorito', error: error.message });
    }
};

export const searchAllRecipes = async (req, res) => {
    const { usuario_id } = req.query || {};
    let { searchTerm } = req.query || {};

    if (!usuario_id) {
        return res.status(400).json({ success: false, message: 'Falta el ID de usuario' });
    }

    // Permitir listar todas las recetas si no se envía término: usar comodín '%'
    const term = (typeof searchTerm === 'string' && searchTerm.trim()) ? `%${searchTerm.trim()}%` : '%';

    try{
        const pool = await getConnection();
        const request = await pool.request();
        request.input('usuario_id', sql.Int, usuario_id);
        request.input('searchTerm', sql.NVarChar(100), term);
        const result = await request.execute('sp_SearchAllRecipes');
        // Si el SP no ordena, el cliente puede ordenar por fecha/id desc; aquí devolvemos tal cual
        res.json({ success: true, data: result.recordset });
    } catch (error) {
        console.error('Error al buscar recetas:', error);
        return res.status(500).json({ success: false, message: 'Error al buscar recetas', error: error.message });
    }
};

export const getUserData = async (req, res) => {
    const { usuario_id } = req.query;
    if (!usuario_id) {
        return res.status(400).json({ success: false, message: 'Falta el ID de usuario' });
    }
    try {
        const pool = await getConnection();
        const request = await pool.request();
        request.input('usuario_id', sql.Int, usuario_id);
        const result = await request.execute('sp_GetUserData');
        res.json({ success: true, data: result.recordset[0] });
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener datos del usuario', error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { usuario_id, nombre, idNivelCocina, idTipoDieta, alergias, ingredientesEvitar } = req.body || {};

    if (!usuario_id || !nombre || idNivelCocina === undefined || idTipoDieta === undefined) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    try {
        const pool = await getConnection();
        const request = await pool.request();
        request.input('usuario_id', sql.Int, parseInt(usuario_id, 10));
        request.input('Nombre', sql.NVarChar(200), nombre);
        request.input('IdNivelCocina', sql.Int, parseInt(idNivelCocina, 10));
        request.input('IdTipoDieta', sql.Int, parseInt(idTipoDieta, 10));
    const alergiasClean = normalizeCsvList(alergias || '');
    const ingredientesClean = normalizeCsvList(ingredientesEvitar || '');
    request.input('Alergias', sql.NVarChar(sql.MAX), alergiasClean);
    request.input('IngredientesEvitar', sql.NVarChar(sql.MAX), ingredientesClean);

        const result = await request.execute('sp_UpdateUserProfile');

        // Devolver los datos actualizados si el SP los retorna, si no, solo success
        const updated = result?.recordset?.[0] || null;
        return res.json({ success: true, message: 'Perfil actualizado', data: updated });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar perfil', error: error.message });
    }
};


