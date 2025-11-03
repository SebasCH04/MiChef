process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import 'dotenv/config';

import app from './appExpress.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});