import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Author } from "./Author";
import { Book } from "./Book";

@Entity()
export class AuthorBook extends BaseEntity {
  @PrimaryColumn()
  authorId: number;

  @PrimaryColumn()
  bookId: number;

  @ManyToOne(() => Author, author => author.bookConnection, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "authorId" })
  author: Promise<Author>;

  @ManyToOne(() => Book, book => book.authorConnection, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "bookId" })
  book: Promise<Book>;
}
