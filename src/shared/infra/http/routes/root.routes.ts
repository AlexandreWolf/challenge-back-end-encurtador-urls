import { Router } from 'express';

import ShortUrlsController from '@modules/shorturls/infra/http/controllers/ShortUrlsController';

const shorterRouter = Router();
const shortUrlsController = new ShortUrlsController();

shorterRouter.get('/', async (request, response) => {
  return response.json({ message: 'Server OK' });
});

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     tags:
 *       - URLs
 *     name: Shorten url
 *     summary: Receives a common url and returns a shortened url
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shortUrl
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       301:
 *         description: Redirect to original url
 *       404:
 *         description: Return error and message
 *         schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             description: Page not found
 */
shorterRouter.get('/:shortUrl', shortUrlsController.show);

export default shorterRouter;
