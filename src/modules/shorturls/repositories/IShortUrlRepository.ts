import ShortUrl from '../infra/typeorm/entities/ShortUrl';
import CreateShortUrlDTO from '../dtos/ICreateShortUrlDTO';

export default interface IShortUrlsRepository {
  create(data: CreateShortUrlDTO): Promise<ShortUrl>;
  save(shortUrl: ShortUrl): Promise<ShortUrl>;
  findByOriginal(original: string): Promise<ShortUrl | undefined>;
  findByHash(shortUrl: string): Promise<ShortUrl | undefined>;
}
