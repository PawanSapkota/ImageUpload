import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { Request,Response,NextFunction } from "express";
import { MultipleImages } from "../entity/Multipleimages";



const multipleImagesRepo =AppDataSource.getRepository(MultipleImages)

export const getMultipleImagesHandler= async(req:Request,res:Response,next:NextFunction)=>{
    try{

         await multipleImagesRepo.find().then((images:any)=>{
            res.status(200).json({
                message:"Image has been fetched",
                images
            })            
         })
         .catch((err)=>{
            next( new AppError(500,err.message) )
         })

    }
    catch(error){
        next(new AppError(error.statusCode,error.message))
    }
}


export const postMultipleImageHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body,req.files)
  
        

    }
    catch(err){
        next(new AppError(err.statusCode,err.message))
    }
    
}

