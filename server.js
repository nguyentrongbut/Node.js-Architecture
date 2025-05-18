require('dotenv').config();
const app = require('./src/app')


const PORT = process.env.PORT || 3056

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with ${PORT}`)
});

process.on('SIGINT', () => {
    server.close( ()  => {
        console.log( "Exit Server Express" )
        process.exit(0);
    });
    // notify.send(ping ...)
})