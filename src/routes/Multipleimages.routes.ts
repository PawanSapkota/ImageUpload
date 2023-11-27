import {Router } from "express"
import {upload} from "../utils/Fileupload"
import { deleteMultipleImages, getMultipleImagesHandler, postMultipleImageHandler } from "../controller/Multipleimages.controller";

const router=Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     multipleimagesDto:
 *         type: object                
 *         properties:
 *           name:
 *             type: string
 *           image:
 *             type: array
 *             items: 
 *               type: file
 *             description: this is for name of the MultipleImages
 *
 */

/**
 * @swagger
 * tags:
 *   name: MutipleImages Record
 *   description: Record of all  CRUD
 *
 */

/**
 * @swagger
 * /multipleimages/:
 *  get:
 *     summary: Use to request all multipleimages Record
 *     tags: [MutipleImages Record]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 * 
 *  post:
 *     summary: use to update multipleimages Record
 *     tags: [MutipleImages Record]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:                            
 *             $ref: '#/components/schemas/multipleimagesDto'
 *     responses:
 *        '200':
 *          description: A sucessfull response
 * 
 * /multipleimages/{id}:
 *  patch:
 *     summary: use to update multipleimages
 *     tags: [MutipleImages Record]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: this if or params with name id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/multipleimagesDto'
 *     responses:
 *        '200':
 *          description: A sucessfull response
 *  delete:
 *     summary: Use to request all MutipleImages Record
 *     tags: [MutipleImages Record]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: this is for id
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */

router.route("/").post(upload.array("image"),postMultipleImageHandler).get(getMultipleImagesHandler);

router.route("/:id").delete(deleteMultipleImages)



export default router;
