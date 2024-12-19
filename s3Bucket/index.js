const {S3Client,GetObjectCommand,PutObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.KEY,
        secretAccessKey:process.env.ACCESS_KEY
    }
})

async function getObjectUrl(key){
  const command = new GetObjectCommand({
    Bucket:"tark-private",
    Key:key
  });

  const url =await getSignedUrl(s3Client,command);
  return url;
}

async function putObject(fileName,contentType) {
    const command = new PutObjectCommand({
        Bucket:"tark-private",
        Key:`/uploads/user-uploads/${fileName}`,
        ContentType:contentType
    })
    const url = await getSignedUrl(s3Client,command)
    return url;
}

async function init(){
//console.log('Url for ',  await getObjectUrl("download.jpg"));
console.log('Url for uploading',await putObject(`image-${Date.now()}.jpeg`,'image/jpeg'))
}
init();