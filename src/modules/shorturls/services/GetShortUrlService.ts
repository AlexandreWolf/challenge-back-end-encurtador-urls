import { injectable, inject } from 'tsyringe';

import ShortUrl from '../infra/typeorm/entities/ShortUrl';
import IShortUrlsRepository from '../repositories/IShortUrlRepository';

interface IRequest {
  shortUrl: string;
}

@injectable()
class GetShortUrlService {
  constructor(
    @inject('ShortUrlRepository')
    private shortUrlRepository: IShortUrlsRepository,
  ) {}

  public async execute({ shortUrl }: IRequest): Promise<ShortUrl | undefined> {
    const findBySameOriginalUrl = await this.shortUrlRepository.findByHash(
      shortUrl,
    );

    return findBySameOriginalUrl;
  }
}

export default GetShortUrlService;
