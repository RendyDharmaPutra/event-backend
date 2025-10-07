import { CloudinaryUtil } from "../../utils/cloudinary";

export class MediaService {
  async uploadSingle(file: Express.Multer.File) {
    return CloudinaryUtil.uploadSingle(file);
  }

  async uploadMultiple(files: Express.Multer.File[]) {
    return CloudinaryUtil.uploadMultiple(files);
  }

  async remove(fileUrl: string) {
    return CloudinaryUtil.remove(fileUrl);
  }
}

export const mediaService = new MediaService();
