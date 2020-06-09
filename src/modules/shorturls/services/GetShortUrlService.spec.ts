import FakeShortUrlsRepository from '../repositories/fakes/FakeShortUrlsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateShortUrlService from './CreateShortUrlService';
import GetShortUrlService from './GetShortUrlService';

describe('GetShortUrlService', () => {
  it('should be able to return a short url with a original property', async () => {
    const fakeShortUrlsRepository = new FakeShortUrlsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createShortUrl = new CreateShortUrlService(
      fakeShortUrlsRepository,
      fakeHashProvider,
    );

    const short = await createShortUrl.execute({
      original: 'www.wisereducacao.com',
    });

    const getShortUrl = new GetShortUrlService(fakeShortUrlsRepository);
    const response = await getShortUrl.execute({
      shortUrl: short.shortUrl,
    });

    expect(response).toHaveProperty('id');
    expect(short).toHaveProperty('original');
  });

  it('should be able to return undefined on pass a expired or inexistent short url', async () => {
    const fakeShortUrlsRepository = new FakeShortUrlsRepository();

    const getShortUrl = new GetShortUrlService(fakeShortUrlsRepository);
    const response = await getShortUrl.execute({
      shortUrl: 'wyz987',
    });

    expect(response).not.toBeDefined();
  });
});
