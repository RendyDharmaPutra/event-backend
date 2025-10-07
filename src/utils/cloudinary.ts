import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

/**
 * Konfigurasi Cloudinary berdasarkan environment variable.
 */
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export class CloudinaryUtil {
  /**
   * Mengubah file hasil upload multer menjadi Data URL (Base64).
   */
  private static toDataURL(file: Express.Multer.File): string {
    const base64 = Buffer.from(file.buffer).toString("base64");
    return `data:${file.mimetype};base64,${base64}`;
  }

  /**
   * Mengambil public_id Cloudinary dari URL file.
   */
  private static extractPublicId(fileUrl: string): string {
    const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    return fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
  }

  /**
   * Upload satu file ke Cloudinary.
   */
  static async uploadSingle(file: Express.Multer.File) {
    const fileDataURL = this.toDataURL(file);
    return cloudinary.uploader.upload(fileDataURL, { resource_type: "auto" });
  }

  /**
   * Upload banyak file sekaligus ke Cloudinary.
   */
  static async uploadMultiple(files: Express.Multer.File[]) {
    const uploadTasks = files.map((file) => this.uploadSingle(file));
    return Promise.all(uploadTasks);
  }

  /**
   * Menghapus file dari Cloudinary berdasarkan URL publik.
   */
  static async remove(fileUrl: string) {
    const publicId = this.extractPublicId(fileUrl);
    return cloudinary.uploader.destroy(publicId);
  }
}
