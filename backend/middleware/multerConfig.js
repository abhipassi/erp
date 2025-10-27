import multer from "multer"
import path from "path"
// multer config 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage })

export default upload