import express = require('express');
import moment = require('moment');
import fs = require('fs');
import axios from 'axios';
import { AWS_S3 } from '../../constants/aws-s3.constant';

export class AwsS3Service {
    public static cloudBucketName: string = 'cabson-bucket';

    public static uploadFileBuffer(
        fileBuffer: any,
        fileOriginalName: string,
        fileMime: string,
        pathId?: string,
        bucketName?: string,
    ) {
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }

        const awsKey = `attachments/${moment().format('Y/M/D')}/${pathId ? `${pathId}/` : ''}${fileOriginalName}`;
        // NOTE: The optional contentType option can be used to set Content/mime type of the file.
        // By default the content type is set to application/octet-stream.
        return AWS_S3.putObject({
            ACL: 'public-read',
            ContentType: fileMime,
            Body: fileBuffer,
            Bucket: bucketName,
            Key: awsKey,
        })
            .promise()
            .then(() => {
                return {
                    awsKey,
                };
            });
    }
    public static uploadFileBase64(
        base64String: string,
        awsKey: string,
        bucketName?: string,
    ) {
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }
        // const awsKey = `attachments/${
        //   pathId ? `${pathId}/` : ''
        // }${moment().format('Y/M/D')}/${fileOriginalName}`;
        // attachments/tms-check-in/123456789-file.png OR attachments/123456789-file.png
        // CHANGE: attachments/tms-check-in/19/8/12/file.png OR attachments/19/8/12/file.png
        // Ensure that you POST a base64 data to your server.
        const base64Data = Buffer.from(
            base64String.replace(/^data:image\/\w+;base64,/, ''),
            'base64',
        );
        // Getting the file type, ie: jpeg, png or gif
        const type = base64String.split(';')[0].split('/')[1];
        const contentType = `image/${type}`;
        // NOTE: The optional contentType option can be used to set Content/mime type of the file.
        // By default the content type is set to application/octet-stream.
        return AWS_S3.putObject({
            ACL: 'public-read',
            ContentType: contentType,
            Body: base64Data,
            Bucket: bucketName,
            Key: awsKey,
        })
            .promise()
            .then(() => {
                return {
                    awsKey,
                    contentType,
                };
            });
    }
    public static async uploadFromUrl(
        url: string,
        awsKey: string,
        bucketName?: string,
    ) {
        // init bucketName
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }
        try {
            const res = await axios.get(url, { responseType: 'arraybuffer' });
            if (res) {
                // NOTE: The optional contentType option can be used to set Content/mime type of the file.
                // By default the content type is set to application/octet-stream.
                return AWS_S3.putObject({
                    ACL: 'public-read',
                    ContentType: res.headers['content-type'],
                    Body: res.data, // buffer
                    Bucket: bucketName,
                    Key: awsKey,
                })
                    .promise()
                    .then(() => {
                        return {
                            awsKey,
                        };
                    });
            }
        } catch (error) {
            console.log('get error: ', error.message);
        }
    }
    public static async uploadFromFilePath(
        filePath: string,
        fileName: string,
        bucketName?: string,
    ) {
        // init bucketName
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }
        const awsKey = fileName;
        try {
            // upload file to S3
            return AWS_S3.putObject({
                ACL: 'public-read',
                Body: fs.readFileSync(filePath),
                Bucket: bucketName,
                Key: awsKey,
            })
                .promise()
                .then(() => {
                    return { awsKey };
                });
        } catch (err) {
            console.log('get error: ', err);
        }
    }
    public static downloadFileAndStreamToClient(
        res: express.Response,
        key: string,
        fileName: string,
        fileMime?: string,
        bucketName?: string,
    ) {
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }

        res.setHeader('Content-Disposition', 'inline; filename=' + fileName);
        res.setHeader('Content-Type', fileMime ? fileMime : 'application/json');

        const readStream = AWS_S3.getObject({
            Bucket: bucketName,
            Key: key,
            ResponseContentType: fileMime,
        }).createReadStream();

        let dataLength = 0;
        readStream.on('data', (chunk) => {
            dataLength += chunk.length;
        })

        readStream.on('end', () => {
            res.setHeader('Content-Length', dataLength);
        });

        readStream.pipe(res);

        res.on('finish', () => {
            res.send(200);
        })
    }

    public static async deleteFile(key: string, bucketName?: string) {
        if (!bucketName && this.cloudBucketName) {
            bucketName = this.cloudBucketName;
        }

        return AWS_S3.deleteObject({
            Bucket: bucketName,
            Key: key,
        }).promise();
    }
}