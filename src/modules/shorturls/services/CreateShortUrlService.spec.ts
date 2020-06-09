import FakeShortUrlsRepository from '../repositories/fakes/FakeShortUrlsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateShortUrlService from './CreateShortUrlService';

describe('CreateShortUrlService', () => {
  it('should be able to create a new short url', async () => {
    const fakeShortUrlsRepository = new FakeShortUrlsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createShortUrl = new CreateShortUrlService(
      fakeShortUrlsRepository,
      fakeHashProvider,
    );

    const short = await createShortUrl.execute({
      original: 'www.wisereducacao.com',
    });

    expect(short).toHaveProperty('id');
    expect(short).toHaveProperty('shortUrl');
  });

  it('should be able to return an existing short URL by sending the same original url', async () => {
    const fakeShortUrlsRepository = new FakeShortUrlsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createShortUrl = new CreateShortUrlService(
      fakeShortUrlsRepository,
      fakeHashProvider,
    );

    const short = await createShortUrl.execute({
      original: 'www.wisereducacao.com',
    });

    const equalShort = await createShortUrl.execute({
      original: 'www.wisereducacao.com',
    });

    expect(equalShort.id).toBe(short.id);
  });
});
