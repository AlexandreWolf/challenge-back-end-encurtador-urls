import { Router } from 'express';

import ShortUrlsController from '../controllers/ShortUrlsController';

const shorterRouter = Router();
const shortUrlsController = new ShortUrlsController();

/**
 * @swagger
 * /encurtador:
 *   post:
 *     tags:
 *       - URLs
 *     name: Shorten url
 *     summary: Receives a common url and returns a shortened url
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: url
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            url:
 *             type: string
 *             example: "https://wisereducacao.com"
 *             required: true
 *     responses:
 *       200:
 *         description: A single object with newUrl property
 *         schema:
 *           type: object
 *           properties:
 *            newUrl:
 *             type: string
 *       400:
 *         description: A single object with newUrl property
 *         schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             description: Invalid URL passed
 */
shorterRouter.post('/', shortUrlsController.create);

export default shorterRouter;
