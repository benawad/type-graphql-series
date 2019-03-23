import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Author } from "../../entity/Author";
import { Book } from "../../entity/Book";
import { AuthorRepo } from "../../repos/AuthorRepo";
import { BookRepo } from "../../repos/BookRepo";

@Resolver()
export class AuthorDataMapper {
  @InjectRepository(AuthorRepo)
  private readonly authorRepo: AuthorRepo;
  @InjectRepository(BookRepo)
  private readonly bookRepo: BookRepo;

  @Mutation(() => Book)
  async createBook2(@Arg("name") name: string) {
    return this.bookRepo.save({ name });
  }

  @Mutation(() => Author)
  async createAuthor2(@Arg("name") name: string) {
    return this.authorRepo.save({ name });
  }

  @Mutation(() => Boolean)
  async deleteBook2(@Arg("bookId", () => Int) bookId: number) {
    await this.bookRepo.delete({ id: bookId });
    return true;
  }

  @Query(() => [Book])
  async books2() {
    return this.bookRepo.find();
  }
}
