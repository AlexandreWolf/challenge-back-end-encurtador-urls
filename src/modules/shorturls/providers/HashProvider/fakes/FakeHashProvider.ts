import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(length: number): Promise<string> {
    return `abc${length}`;
  }
}

export default FakeHashProvider;
