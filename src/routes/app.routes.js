import { Router } from 'express';
import {controller} from '../controllers/app.controller';

//instanciar rutas
const routes = Router();

//Raiz inicial de nuestra aplicacion
routes.get('/', controller.inicio);
routes.post('/principal',controller.principal);
routes.get('/estado_cuenta/:id',controller.estado_cuenta);
routes.get('/transferencia/:id',controller.transferencia);
routes.get('/cuentas/:id',controller.cuentas);
routes.get('/table',controller.table);
routes.post('/transferir/:id', controller.trasnferir);

routes.post('/registro',controller.registro);

export default routes;