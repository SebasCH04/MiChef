

import sql from 'mssql';
import { executeQuery } from '../Services/azureDBConnect.js';
import { getConnection } from '../Services/azureDBConnect.js';

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
