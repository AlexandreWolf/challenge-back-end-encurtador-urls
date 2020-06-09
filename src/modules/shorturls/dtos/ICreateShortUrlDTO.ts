export default interface ICreateShortUrlDTO {
  original: string;
  shortUrl: string;
  expireDate: Date;
}
