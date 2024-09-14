import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import {ErrorHandler} from './utility.js'


const uploadFilesToCloudinary = async (files) => {
    if (!Array.isArray(files) || files.length === 0) {
        throw new ErrorHandler("Input should be an array of files", 400);
    }
    const uploadPromises = files.map(async (file) => {
        try {
            if (!file || !file.path) return null; // Ensure there is a file path
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "auto"
            });
            fs.unlinkSync(file.path); // Use async unlink
            return {
                url: result.secure_url,
                public_id: result.public_id,
            };
        } catch (error) {
            console.error("Upload error:", error);
            if (file.path)  fs.unlinkSync(file.path); // Use async unlink
            return null; // Return null for failed uploads
        }
    });

    const uploadedFiles = await Promise.all(uploadPromises); // Wait for all uploads
    return uploadedFiles.filter(file => file !== null); // Filter out null results
}



const deleteFilesFromCloudinary = async (publicIdsArray) => {
    if (!Array.isArray(publicIdsArray)) {
        throw new ErrorHandler("Input should be an array of files", 400);
    }


    // Create an array of promises to delete each public ID
    const deletePromises = publicIdsArray.map(async (publicId) => {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result; // Return the result for each deletion
        } catch (error) {
            console.error(`Error deleting public ID ${publicId}:`, error);
            return null; // Return null for failed deletion
        }
    });

    try {
        const deletionResults = await Promise.all(deletePromises);
        return deletionResults.filter(result => result !== null); // Filter out failed deletions
    } catch (error) {
        console.error("Error processing deletions:", error);
        return Array(publicIdsArray.length).fill(false); // Return an array of false for each public ID
    }
};

export { uploadFilesToCloudinary, deleteFilesFromCloudinary }