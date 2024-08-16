const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dscgofn2s",
    api_key: "589673783116617",
    api_secret: "QnjmBme_SBkYbhrGTzjNQyrpEg0"
});

const uploadFile = (file) => {
    const res = cloudinary.uploader.upload(file);
    return res
};

module.exports = {
    uploadFile,
};