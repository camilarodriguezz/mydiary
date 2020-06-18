const controller = require('../controllers/controller');

module.exports = (app) => {
    // create is the same as register since we create one user
    app.post('/api/v1/create', controller.create);
    app.get('/api/v1/readAll', controller.authenticate, controller.readAll);
    app.get('/api/v1/readOne/:id', controller.authenticate, controller.readOne);
    app.put('/api/v1/updateOne/:id', controller.authenticate, controller.updateOne);
    app.put('/api/v1/updateProfile/:id', controller.authenticate, controller.updateProfile);
    app.delete('/api/v1/deleteOne/:id', controller.authenticate, controller.deleteOne);
    app.post("/api/v1/login", controller.login);
    app.get('/api/v1/logout', controller.authenticate, controller.logout)
    // just use updateOne to reupdate the user with a new task
}