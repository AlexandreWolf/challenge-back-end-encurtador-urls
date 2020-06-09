import hashGenerator from '@shared/utils/hashGenerator';
import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async generateHash(length: number): Promise<string> {
    return hashGenerator(length);
  }
}

export default HashProvider;
