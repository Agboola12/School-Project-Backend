var admin = require("firebase-admin");
var serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:process.env.BUCKET
});

const bucket=admin.storage().bucket();

 module.exports.FirebaseImageUpload = async (file) => {
    const uuid = (Math.random() + 1).toString(36).substring(2);
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject('no file found');
        }
        const filePath =  `file/${uuid}${file.originalname}`
        const bucketFile = bucket.file(filePath);
        bucketFile
            .save(Buffer.from(file.buffer))
            .then(() => {
                bucketFile.makePublic().then(() => {
                    resolve(`https://storage.googleapis.com/${bucket.name}/${filePath}`);
                });
            })
    });
};