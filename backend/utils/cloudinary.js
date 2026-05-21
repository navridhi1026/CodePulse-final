const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

/**
 * Cloudinary Configuration (CE-02 L41-44)
 * Handles uploading data to the cloud.
 */

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drscx0q3n',
    api_key: process.env.CLOUDINARY_API_KEY || 'your_key',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'your_secret',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'codepulse_profiles',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
