import { Router } from 'express';
import urlShortenerRouter from '@modules/shorturls/infra/http/routes/urlShortener.routes';
import rootRouter from './root.routes';

const routes = Router();

routes.use('/encurtador', urlShortenerRouter);
routes.use('/', rootRouter);

export default routes;
