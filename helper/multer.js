const multer  = require('multer')
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null,uniqueSuffix)
    }
  })
  const fileFilter=(req,file,cb)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false);
    }
  }
  const upload = multer({ storage: storage,fileFilter:fileFilter});

  module.exports={upload};
