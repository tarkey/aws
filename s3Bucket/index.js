const {S3Client,GetObjectCommand,PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.KY,
        secretAccessKey:process.env.AC
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

async function deleteCommand(params) {
    const command = new DeleteObjectCommand({
        Bucket:"tark-private",
        Key:"download.jpg"
    })
}
async function listObjects() {
    const command = new ListObjectsV2Command({
        Bucket:"tark-private",
        key:"/"
    })
    const result = await s3Client.send(command);
    console.log(result);
}
async function init(){
//console.log('Url for ',  await getObjectUrl("download.jpg"));
//console.log('Url for uploading',await putObject(`image-${Date.now()}.jpeg`,'image/jpeg'))
console.log(await listObjects());
}
init();