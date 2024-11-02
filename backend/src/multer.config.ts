// backend/src/config/multer.config.ts
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Specify the folder to store files
    filename: (req, file, callback) => {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniquePrefix}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
