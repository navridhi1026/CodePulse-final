const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

/**
 * Profile Routes (CE-02 L41-44)
 */

// Upload Profile Picture
router.post('/upload-avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Update user profile_pic in DB
        const userId = req.user.id;
        await User.update(
            { profile_pic: req.file.path },
            { where: { id: userId } }
        );

        res.json({
            message: "Profile picture uploaded to Cloud successfully",
            url: req.file.path
        });
    } catch (error) {
        console.error("Cloud Upload Error:", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

module.exports = router;
