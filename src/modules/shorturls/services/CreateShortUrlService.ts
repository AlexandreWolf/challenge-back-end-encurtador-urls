import addMinutes from 'date-fns/addMinutes';
import { injectable, inject } from 'tsyringe';

import ShortUrl from '../infra/typeorm/entities/ShortUrl';
import IShortUrlsRepository from '../repositories/IShortUrlRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  original: string;
}

@injectable()
class CreateShortUrlService {
  constructor(
    @inject('ShortUrlRepository')
    private shortUrlRepository: IShortUrlsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ original }: IRequest): Promise<ShortUrl> {
    const findBySameOriginalUrl = await this.shortUrlRepository.findByOriginal(
      original,
    );

    if (findBySameOriginalUrl) {
      findBySameOriginalUrl.expireDate = addMinutes(new Date(), 2);

      const short = this.shortUrlRepository.save(findBySameOriginalUrl);

      return short;
    }

    const expireDate = addMinutes(new Date(), 2);
    const shortUrl = await this.hashProvider.generateHash(10);

    const short = await this.shortUrlRepository.create({
      original,
      shortUrl,
      expireDate,
    });

    return short;
  }
}

export default CreateShortUrlService;
