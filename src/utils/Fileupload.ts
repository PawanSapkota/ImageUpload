import * as multer from "multer"

import {Request } from "express"

const storage=multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb){
        cb(null,`src/public`)
        
    },


    filename:function(req:Request,file:Express.Multer.File,cb){
        console.log(file.originalname)
        let newName = file.originalname.split(".");
      let date = new Date().toDateString();
      let name = Date.parse(date) + "." + newName[1];
      cb(null, name);

    }
})

export const upload =multer({storage:storage})