import * as express from "express"
import * as bodyParser from "body-parser";
import {Response,Request,NextFunction} from "express";
import * as swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUiExpress from "swagger-ui-express";
import {port } from "./config"
import * as cors from "cors"
import * as morgan from "morgan"

import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { config } from "dotenv";
import AppError from "./utils/AppError";
import MultipleImagesRoute from "./routes/Multipleimages.routes"

AppDataSource.initialize().then(async () => {

  //Express App
    const app =express()
    app.use(bodyParser.json());
    app.use(cors({credentials:true, origin: "http://localhost:8000"}))
    
    app.use("/public",express.static("src/public"))
    app.use(morgan("dev"))

    //Swagger Setup
    const swaggerOptions={
      definition:{
        openapi:"3.0.0",
        info:{
          title:"Ecommerce Backend Documentation",         
          version: "15",
          description: "Main website",
          contact: {
            name: "Pawan",
        },
        servers:[8000]
        
      }
    },
    apis:[
      "./routes/*.ts",
      "./Routes/*.ts",
      "./**/*.ts",
      "index.ts",
      `${__dirname}/routes/*.routes.ts`,
      `${__dirname}/Routes/*.routes.ts`,
    ]
  }

  const swaggerDocs=swaggerJsDoc(swaggerOptions)

  app.use("/doc",swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs))



  //Routes Here
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
          message: "working",
        });
      });

      app.use("/multipleimages",MultipleImagesRoute)




      //Unhandled Routes
      app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(new AppError(404,`Route ${req.originalUrl} not found `))

      })

      //Global Error Handler
      app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
        error.status = error.status || "error"
        error.statusCode = error.statusCode || 500


        res.status(error.statusCode).json({
          status:error.status,
          message:error.message

        })
      })



    //Run the server
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
        console.log("port",port)

    })

}).catch(error => console.log(error))
