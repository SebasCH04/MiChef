process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


import app from './appExpress.js'

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
    console.log('También accesible en http://10.31.193.169:3000');
});