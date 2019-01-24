import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { autoQueries } from "../modules/dynamic/AutoDecorators";
import { findAll, findOne } from "../modules/dynamic/MyQueries";

@autoQueries([findAll, findOne])
@ObjectType()
@Entity()
export class Tomato extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;
}
