import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { Request,Response,NextFunction } from "express";
import { MultipleImages } from "../entity/Multipleimages";
import { QueryResult } from "typeorm";

interface Requestcustom extends Request{
    files:any
}



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


export const postMultipleImageHandler=async(req:Requestcustom,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body,req.files)

        const arrayOfImages =[]

        req.files.map((img:any)=>{
            arrayOfImages.push(img.filename)
        })
        req.body.image = arrayOfImages

        await multipleImagesRepo.save(req.body).then((result:any)=>{
            res.status(200).json({
                status:"success",
                data:result
            })
        })
        

    }
    catch(err){
        next(new AppError(err.statusCode,err.message))
    }
    
}


export const deleteMultipleImages = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // await multipleImagesRepo.findOneBy({id:req.params.id}).then((result:any)=>{
        //     res.status(200).json({
        //         status:"success",
        //         data:result
        //     })

        // })

        let multipleimages = await multipleImagesRepo.findOneBy({id:req.params.id})

        if (!multipleimages){
            return next(new AppError(404,"Image with this id not found"))
        }

        await multipleImagesRepo.remove(multipleimages).then((result:any)=>{
            res.status(200).json({
                status:"succes",
                data:result
            })
        })

    }
    catch(err){
        next(new AppError(err.statusCode,err.message))
    }
}

