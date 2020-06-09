import { container } from 'tsyringe';

import '@modules/shorturls/providers';
// import './providers';

import IShortUrlRepository from '@modules/shorturls/repositories/IShortUrlRepository';
import ShortUrlsRepository from '@modules/shorturls/infra/typeorm/repositories/ShortUrlsRepository';

container.registerSingleton<IShortUrlRepository>(
  'ShortUrlRepository',
  ShortUrlsRepository,
);
