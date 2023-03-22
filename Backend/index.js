const app = require('./src/main');

function start() {
    app.listen(app.get("PORT"), console.log("Listening --->", app.get("PORT")));
}

start();