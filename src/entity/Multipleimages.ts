import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class MultipleImages {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    @CreateDateColumn()
    dateCreated:Date

    @UpdateDateColumn()
    dateUpdated:Date


}
