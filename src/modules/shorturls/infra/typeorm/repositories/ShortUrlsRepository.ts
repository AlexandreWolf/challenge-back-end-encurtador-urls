import { getRepository, Repository, MoreThanOrEqual } from 'typeorm';
import { format } from 'date-fns';

import IShortUrlsRepository from '@modules/shorturls/repositories/IShortUrlRepository';
import ICreateShortUrlDTO from '@modules/shorturls/dtos/ICreateShortUrlDTO';

import ShortUrl from '../entities/ShortUrl';

class ShortUrlRepository implements IShortUrlsRepository {
  public ormRepository: Repository<ShortUrl>;

  constructor() {
    this.ormRepository = getRepository(ShortUrl);
  }

  public async findByHash(shortUrl: string): Promise<ShortUrl | undefined> {
    const findShortUrl = await this.ormRepository.findOne({
      where: {
        shortUrl,
        expireDate: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd HH:mm:ss')),
      },
    });

    return findShortUrl;
  }

  public async findByOriginal(original: string): Promise<ShortUrl | undefined> {
    const findShortUrl = await this.ormRepository.findOne({
      where: {
        original,
      },
    });

    return findShortUrl;
  }

  public async create(shortUrlData: ICreateShortUrlDTO): Promise<ShortUrl> {
    const shortened = this.ormRepository.create(shortUrlData);

    await this.ormRepository.save(shortened);

    return shortened;
  }

  public async save(shortUrl: ShortUrl): Promise<ShortUrl> {
    return this.ormRepository.save(shortUrl);
  }
}

export default ShortUrlRepository;
