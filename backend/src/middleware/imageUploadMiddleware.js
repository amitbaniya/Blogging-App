import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinaryConfig.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'next-blog',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

export const imageUploadMiddleware = multer({ storage });
