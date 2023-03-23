import "dotenv/config";
import { Client } from "minio";
export const minioClient = new Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "minioUser",
    secretKey: "minioPass",
});
export const UploadFileToMinio = async (file) => {
    let success = false;
    try {
        await minioClient.putObject("experience", file.filename, file.file, (error, etag) => {
            if (error) {
                console.log("Minio client putObject failed: ", error);
                success = false;
            }
            else {
                console.log("Succesfully uploaded file");
                success = true;
            }
        });
    }
    catch (err) {
        console.log("In upload file to minio with err: ", err);
        success = false;
    }
    return success;
};
export const GetFileFromMinio = async (filename) => {
    let size = 0;
    let stream;
    try {
        stream = await minioClient.getObject('experience', filename, (err, dataStream) => {
            if (err) {
                return console.log(err);
            }
            dataStream.on('data', (chunk) => {
                size += chunk.length;
            });
            dataStream.on('end', function () {
                console.log('End. Total size = ' + size);
            });
            dataStream.on('error', (err) => {
                console.log(err);
            });
        });
    }
    catch (err) {
        console.log("In get file to minio with err: ", err);
    }
    return stream;
};
//# sourceMappingURL=minio.js.map