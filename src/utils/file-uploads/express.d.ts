declare namespace Express {
  export interface MulterFile {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }
}
