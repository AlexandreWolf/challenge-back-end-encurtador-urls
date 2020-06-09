import { uuid } from 'uuidv4';
import { format } from 'date-fns';

import IShortUrlsRepository from '@modules/shorturls/repositories/IShortUrlRepository';
import ICreateShortUrlDTO from '@modules/shorturls/dtos/ICreateShortUrlDTO';

import ShortUrl from '../../infra/typeorm/entities/ShortUrl';

class ShortUrlRepository implements IShortUrlsRepository {
  private shortened: ShortUrl[] = [];

  public async findByHash(shortUrl: string): Promise<ShortUrl | undefined> {
    const findShortUrl = this.shortened.find(
      short =>
        short.shortUrl === shortUrl &&
        format(short.expireDate, 'yyyy-MM-dd HH:mm:ss') >=
          format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    );

    return findShortUrl;
  }

  public async findByOriginal(original: string): Promise<ShortUrl | undefined> {
    const findOriginal = this.shortened.find(
      short => short.original === original,
    );

    return findOriginal;
  }

  public async create({
    original,
    expireDate,
    shortUrl,
  }: ICreateShortUrlDTO): Promise<ShortUrl> {
    const short = new ShortUrl();

    Object.assign(short, {
      id: uuid(),
      original,
      expireDate,
      shortUrl,
    });

    this.shortened.push(short);

    return short;
  }

  public async save(shortUrl: ShortUrl): Promise<ShortUrl> {
    const findIndex = this.shortened.findIndex(
      short => short.id === shortUrl.id,
    );

    this.shortened[findIndex] = shortUrl;

    return shortUrl;
  }
}

export default ShortUrlRepository;
