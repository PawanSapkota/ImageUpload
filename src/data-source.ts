import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { MultipleImages } from "./entity/Multipleimages"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "987654321",
    database: "ecommerce",
    synchronize: true,
    logging: false,
    entities: [User,MultipleImages],
    migrations: [],
    subscribers: [],
})
