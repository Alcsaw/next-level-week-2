import express from 'express';
import LessonsController from './controllers/LessonsController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const lessonsController = new LessonsController();
const connectionsController = new ConnectionsController;

routes.get('/lessons', lessonsController.index);
routes.post('/lessons', lessonsController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
