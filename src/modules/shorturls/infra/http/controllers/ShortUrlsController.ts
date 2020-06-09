import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateShortUrlService from '@modules/shorturls/services/CreateShortUrlService';
import GetShortUrlService from '@modules/shorturls/services/GetShortUrlService';

export default class ShortUrlsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { url } = request.body;

    const createShortUrl = container.resolve(CreateShortUrlService);

    const condition = /^https?:\/\//i;
    if (!condition.test(url))
      return response.status(400).json({ message: 'Invalid URL passed' });

    const shortUrl = await createShortUrl.execute({
      original: url,
    });

    return response.status(201).json({
      newUrl: `http://localhost:3333/${shortUrl.shortUrl}`,
    });
  }

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { shortUrl } = request.params;

    const getShortUrl = container.resolve(GetShortUrlService);

    const redirectToUrl = await getShortUrl.execute({ shortUrl });

    if (redirectToUrl && redirectToUrl.original)
      return response.redirect(301, redirectToUrl.original);

    return response.status(404).json({ message: 'Page not found' });
  }
}
