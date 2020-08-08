const AWS = require('aws-sdk');
const fs = require('fs');
const path =require('path');

const ID = process.env.ID;
const SECRET = process.env.SECRET;

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

const uploadFile = async (filename) => {
    const fileContent = fs.readFileSync(filename);

    const params = {
        Bucket: BUCKET_NAME,
        Key: "test_img",
        Body: fileContent,
    };

    await s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }
        console.log(`File uploaded successfully ${data.Location}`);
    });
};

uploadFile(path.join('uploads', '3A5A0753.JPG' ));

const removeFile = (key) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
    };

    s3.deleteObject(params, (err, data) => {
        if(err){
            throw err;
        }
        console.log('Deleted Successfully');
    });
};

// removeFile('test_img.jpg');