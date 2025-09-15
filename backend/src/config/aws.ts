import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION || 'us-east-1'
})

const s3 = new AWS.S3()
const ses = new AWS.SES()

export { s3, ses }
