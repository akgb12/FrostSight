import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/frostsight',
  redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
  s3Bucket: process.env.S3_BUCKET || 'frostsight-billing-exports',
  awsRegion: process.env.AWS_REGION || 'us-east-1',
  datadogHost: process.env.DD_AGENT_HOST || 'datadog',
  datadogPort: Number(process.env.DD_DOGSTATSD_PORT || 8125),
  nodeEnv: process.env.NODE_ENV || 'development'
};
