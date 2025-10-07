import multer from "multer";

/**
 * Multer configuration using memory storage.
 * Files will be stored in memory as Buffer (useful for Cloudinary upload).
 */
class MediaMiddleware {
  private storage = multer.memoryStorage();
  private uploader = multer({ storage: this.storage });

  single(fieldName: string) {
    return this.uploader.single(fieldName);
  }

  multiple(fieldName: string) {
    return this.uploader.array(fieldName);
  }
}

export const mediaMiddleware = new MediaMiddleware();
