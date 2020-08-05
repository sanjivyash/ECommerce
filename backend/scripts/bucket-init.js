const AWS = require('aws-sdk');
const ID = process.env.ID;
const SECRET = process.env.SECRET;

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: process.env.LOCATION_CONSTRAINT
    }
};

s3.createBucket(params, (err, data) => {
    if(err) console.log(err, err.stack);
    else console.log(`Bucket created Successfully: ${data.Location}`);
});

module.exports = { s3 };