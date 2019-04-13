import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../../entity/Author";
import { AuthorBook } from "../../entity/AuthorBook";
import { Book } from "../../entity/Book";
import { getConnection } from "typeorm";

@Resolver()
export class AuthorBookResolver {
  @Mutation(() => Book)
  async createBook(@Arg("name") name: string) {
    await getConnection().queryResultCache!.remove(["book:find"]);
    return Book.create({ name }).save();
  }

  @Mutation(() => Author)
  async createAuthor(@Arg("name") name: string) {
    return Author.create({ name }).save();
  }

  @Mutation(() => Boolean)
  async addAuthorBook(
    @Arg("authorId", () => Int) authorId: number,
    @Arg("bookId", () => Int) bookId: number
  ) {
    await AuthorBook.create({ authorId, bookId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("bookId", () => Int) bookId: number) {
    // await AuthorBook.delete({ bookId });
    await Book.delete({ id: bookId });
    return true;
  }

  @Query(() => [Book])
  async books() {
    // return getConnection()
    //   .getRepository(Book)
    //   .createQueryBuilder("book")
    //   .select("book.id")
    //   .addSelect("book.name")
    //   .addSelect("pg_sleep(3)")
    //   .leftJoinAndSelect("book.authorConnection", "author")
    //   .cache(true)
    //   .getMany();
    return Book.find({
      // cache: { id: "book:find", milliseconds: 50000 },
      cache: true,
      relations: ["authorConnection", "authorConnection.author"]
    });
  }
}
