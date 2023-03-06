import asyncHandler from 'express-async-handler';
import multer, { memoryStorage } from 'multer';
import path from 'path';
import sharp from 'sharp';

import ApiError from '../errors/ApiError';

const upload = multer({
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith('image')) callback(null, true);
    else callback(new ApiError('only images allowed', 400));
  },
});

export const uploadImage = upload.single('profileImage');

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const imageId = `${res.locals.userId}.jpeg`;
    await sharp(req.file.buffer)
      .resize(800, 800)
      .toFormat('jpeg')
      .toFile(path.join(__dirname, `../uploads/profiles/${imageId}`));
    req.body.profileImage = imageId;
  }
  next();
});
