import { Ctx, Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { MyContext } from "../types/MyContext";
import { Author } from "./Author";
import { AuthorBook } from "./AuthorBook";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => AuthorBook, ab => ab.book)
  authorConnection: Promise<AuthorBook[]>;

  @Field(() => [Author])
  async authors(@Ctx() { authorsLoader }: MyContext): Promise<Author[]> {
    return authorsLoader.load(this.id);
  }
}
