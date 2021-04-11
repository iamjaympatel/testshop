
// import path from 'path'
// import express from 'express'
// import multer from 'multer'
// const router = express.Router()

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

// export default router

import express from 'express'
 const router = express.Router()
import multer from"multer";
import shortid from "shortid";
import path from "path";
import multerS3 from"multer-s3";
import aws from "aws-sdk";




const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

 const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
 }
);

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket:"mernstore",
    acl: "public-read",
    metadata: function (req, file, cb) {
     
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
    
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
},(err,data)=>{
  if(err){
    console.log(err)
  }
});

router.post('/', uploadS3.single('image'), (req, res) => {
  try{
    console.log(req.file.location)
    res.send(`${req.file.location}`)

  }catch(err)
  {
    console.log(err)
  }
  
})

export default router
