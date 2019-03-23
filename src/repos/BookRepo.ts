import { EntityRepository, Repository } from "typeorm";
import { Book } from "../entity/Book";

@EntityRepository(Book)
export class BookRepo extends Repository<Book> {
  async findOrCreate({ id, ...data }: Partial<Book>) {
    let book = await this.findOne(id);

    if (!book) {
      book = await this.save({
        id,
        ...data
      });
    }

    return book;
  }
}
