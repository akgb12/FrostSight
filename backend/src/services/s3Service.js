import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../config/env.js';

const s3 = new S3Client({ region: env.awsRegion });

export async function archiveRawExport(fileName, body) {
  if (env.nodeEnv === 'test') {
    return { bucket: env.s3Bucket, key: `raw-exports/${fileName}`, skipped: true };
  }

  const key = `raw-exports/${Date.now()}-${fileName}`;

  try {
    await s3.send(new PutObjectCommand({
      Bucket: env.s3Bucket,
      Key: key,
      Body: body,
      ContentType: 'application/json'
    }));
    return { bucket: env.s3Bucket, key };
  } catch {
    return { bucket: env.s3Bucket, key, skipped: true };
  }
}
