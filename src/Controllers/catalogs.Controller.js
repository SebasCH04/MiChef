import { executeQuery } from '../Services/azureDBConnect.js';

export const catalogsController = {
    getNivelesCocina: async (req, res) => {
        try {
            console.log('=== GET /api/catalogs/niveles-cocina ===');
            const result = await executeQuery('SELECT id_nivel, nombre_nivel FROM niveles_cocina ORDER BY id_nivel');
            console.log('Niveles obtenidos de BD:', result);
            
            return res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('=== ERROR en getNivelesCocina ===');
            console.error('Error completo:', error);
            console.error('Stack:', error.stack);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener niveles de cocina',
                error: error.message
            });
        }
    },

    getTiposDieta: async (req, res) => {
        try {
            console.log('=== GET /api/catalogs/tipos-dieta ===');
            const result = await executeQuery('SELECT id_dieta, nombre_dieta FROM tipos_dieta ORDER BY id_dieta');
            console.log('Tipos de dieta obtenidos de BD:', result);
            
            return res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('=== ERROR en getTiposDieta ===');
            console.error('Error completo:', error);
            console.error('Stack:', error.stack);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener tipos de dieta',
                error: error.message
            });
        }
    }
};
