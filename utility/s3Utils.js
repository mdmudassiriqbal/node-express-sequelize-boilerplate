const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const jimp = require('jimp');
const ApiError = require('../utility/ApiError');
const sizeOf = require('image-size');
const FileType = require('file-type');
const S3 = new AWS.S3({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
	region: process.env.S3_REGION,
});
const imageURL = process.env.S3_IMAGE_URL;

const getObjectFromS3 = req => {
	return new Promise((resolve, reject) => {
		const key = req.query.key;
		if (!key) {
			reject('unauthorised');
		}
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
		};
		S3.getUnsignedUrl('putObject', params, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const putObjectToS3 = req => {
	return new Promise(async (resolve, reject) => {
		const file = req.files[0];
		const extension = path.extname(file.name);
		const key = v4() + extension;
		const params = {
			Body: fs.readFileSync(file.path),
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
			ACL: 'public-read',
			ContentType: 'image/jpeg, image/png',
		};
		S3.putObject(params, function (err, data) {
			if (err) {
				reject(err);
			} else {
				const result = {
					url: imageURL + key,
					data,
				};
				resolve(result);
			}
		});
	});
};
const setfileObjectToArr = files => {
	const arr = [];
	for (let i = 0; i < 5; i++) {
		const imageObj = files[i.toString()];
		if (!imageObj) {
			return arr;
		} else {
			arr.push(imageObj);
		}
	}
};

const putBulkObjectToS3 = files => {
	return new Promise(async (resolve, reject) => {
		if (!files) {
			resolve([]);
		}
		const fileArr = setfileObjectToArr(files);
		const urls = [];
		fileArr.forEach((element, index, array) => {
			const file = element;
			const extension = path.extname(file.name);
			const key = v4() + extension;
			const params = {
				Body: fs.readFileSync(file.path),
				Bucket: process.env.S3_BUCKET_NAME,
				Key: key,
				ACL: 'public-read',
				ContentType: 'image/jpeg, image/png',
			};
			S3.putObject(params, function (err) {
				if (err) {
					reject(err);
				} else {
					urls.push(imageURL + key);
					if (index === fileArr.length - 1) {
						resolve(urls);
					}
				}
			});
		});
	});
};

const deleteObjectFromS3 = key => {
	return new Promise((resolve, reject) => {
		if (!key) {
			reject('unauthorised');
		}
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
		};
		S3.deleteObject(params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const bulkDeleteS3Object = async keys => {
	if (!Array.isArray(keys)) {
		keys = [keys];
	}
	for (const key of keys) {
		await deleteObjectFromS3(key);
	}
};

module.exports = {
	getObjectFromS3,
	putObjectToS3,
	deleteObjectFromS3,
	bulkDeleteS3Object,
	putBulkObjectToS3,
};
