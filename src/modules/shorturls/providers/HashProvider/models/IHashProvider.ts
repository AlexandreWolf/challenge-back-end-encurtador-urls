export default interface HashProvider {
  generateHash(length: number): Promise<string>;
}
