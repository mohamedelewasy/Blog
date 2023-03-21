import asyncHandler from 'express-async-handler';
import multer, { memoryStorage } from 'multer';
import path from 'path';
import sharp from 'sharp';
import { uuid } from 'uuidv4';

import { __BASEdIRECTORY } from '../app';
import ApiError from '../errors/ApiError';

const upload = multer({
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith('image')) callback(null, true);
    else callback(new ApiError('only images allowed', 400));
  },
});

export const uploadImage = (field: string) => upload.single(field);

export const resizeImage = (field: string, folder: string) =>
  asyncHandler(async (req, res, next) => {
    if (req.file) {
      const imageId = `${uuid()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(800, 800)
        .toFormat('jpeg')
        .toFile(path.join(__BASEdIRECTORY, `/uploads/${folder}/${imageId}`));
      req.body[field] = imageId;
    }
    next();
  });
