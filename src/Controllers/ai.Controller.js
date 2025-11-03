import axios from 'axios';

// POST /ai/chat
// Body: { messages: [{ role: 'user'|'assistant'|'system', content: string }] }
// Returns: { success: true, content: string }
export const aiChat = async (req, res) => {
  try {
    const { messages = [] } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'messages requerido' });
    }

  const provider = (process.env.AI_PROVIDER || 'lmstudio').toLowerCase();

    // Fallback local para desarrollo/demos sin costo
    const useFake = process.env.AI_FAKE === '1' || process.env.AI_FAKE === 'true';
    if (useFake) {
      const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content || '';
      const content = `Demo IA (sin costo): recibí tu consulta "${lastUser}". Como ejemplo, te sugiero:\n- Revisa ingredientes disponibles y preferencias.\n- Elige una receta rápida (15-20 minutos) con 5-7 pasos.\n- Ajusta cantidades según número de comensales.\n- Si deseas, pide una lista de compras.\n\n¿Te preparo una receta con tiempo, dificultad y sustitutos de ingredientes?`;
      return res.json({ success: true, content });
    }

  // Asegurar respuesta en español y concisa, con límite de palabras configurable
  const systemMsg = { role: 'assistant', content: `Responde siempre en español de latinoamerica, de forma clara, útil, concisa y que cualquier persona pueda entender. Siempre y obligatoriamente tienes que limita tu respuesta a un máximo de 350 palabras.` };
  // Límite de tokens de salida y temperatura configurables
  const tempEnv = process.env.AI_TEMPERATURE;
  const temperature = (tempEnv !== undefined && !Number.isNaN(Number(tempEnv))) ? Number(tempEnv) : 0.5;

    if (provider === 'lmstudio' || provider === 'local-qwen') {
      // LM Studio expone una API local compatible con Qwen en http://127.0.0.1:1234
      const baseRaw = process.env.LOCAL_OPENAI_BASE_URL || 'http://127.0.0.1:1234';
      const base = baseRaw.trim().endsWith('/v1')
        ? baseRaw.trim().replace(/\/$/, '')
        : `${baseRaw.trim().replace(/\/$/, '')}/v1`;
      const localModel = process.env.LOCAL_MODEL || 'qwen/qwen3-vl-4b';
      const payload = {
        model: localModel,
        messages: [systemMsg, ...messages],
        temperature,
        stream: false,
      };
      const url = `${base}/chat/completions`;
      const resp = await axios.post(url, payload, {
        timeout: 45000,
        headers: { 'Content-Type': 'application/json' },
        validateStatus: s => s >= 200 && s < 600,
      });

      if (resp.status >= 400) {
        const err = resp.data?.error || resp.data;
        const rawMsg = err?.message || err?.error?.message || `Error del servidor local (${resp.status})`;
        console.error('Local Qwen-compatible error:', resp.status, err);
        return res.status(resp.status).json({ success: false, message: rawMsg });
      }

      let content = resp.data?.choices?.[0]?.message?.content
        ?? resp.data?.choices?.[0]?.text
        ?? '';
      if (!content || (typeof content === 'string' && content.trim() === '')) {
        const info = typeof resp.data === 'string' ? resp.data : (resp.data ? JSON.stringify(resp.data) : '');
        return res.status(502).json({
          success: false,
          message: 'El servidor local no devolvió contenido. Verifica que la URL base termine en /v1 y que el Local Server esté activo.',
          details: info?.slice(0, 500),
        });
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.json({ success: true, content });
    } else {
      // Proveedor no soportado: usa LM Studio como fallback
      return res.status(400).json({ success: false, message: 'Proveedor de IA no soportado. Usa LM Studio.' });
    }
  } catch (e) {
    console.error('AI Chat error:', e?.message);
    return res.status(500).json({ success: false, message: 'No se pudo obtener respuesta de la IA' });
  }
};

export default { aiChat };
