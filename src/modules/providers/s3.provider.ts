import {PutObjectCommand, S3Client, S3} from '@aws-sdk/client-s3'
import * as path from 'path'

const client = new S3Client({
  region: process.env.AWS_S3_REGION,
});

const clients3 = new S3({
  region: process.env.AWS_S3_REGION,
});

export const s3 = {
  files: null as string[] | null,
  get: async (key: string): Promise<string> => {
    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
  },

  put: async (key: string, body: any): Promise<string> => {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: body,
      ACL: 'public-read',
    });
    await client.send(command);
    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
  },

  async exists(key: string) {
    if (!this.files) {
      const files = await clients3
        .listObjectsV2({
          Bucket: `${process.env.AWS_S3_BUCKET}`,
          Prefix: 'course',
        });
      files.Contents = files.Contents ?? [];

      this.files = files.Contents.map((file) => file.Key as string);
    }
    return !!this.files.find((file) => path.basename(file) === path.basename(key));
  },
};
