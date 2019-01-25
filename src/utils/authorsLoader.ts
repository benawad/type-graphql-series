import DataLoader from "dataloader";
import { In } from "typeorm";
import { Author } from "../entity/Author";
import { AuthorBook } from "../entity/AuthorBook";

const batchAuthors = async (bookIds: number[]) => {
  const authorBooks = await AuthorBook.find({
    join: {
      alias: "authorBook",
      innerJoinAndSelect: {
        author: "authorBook.author"
      }
    },
    where: {
      bookId: In(bookIds)
    }
  });

  const bookIdToAuthors: { [key: number]: Author[] } = {};

  /*
  {
    authorId: 1,
    bookId: 1,
    __author__: { id: 1, name: 'author1' }
  }
  */
  authorBooks.forEach(ab => {
    if (ab.bookId in bookIdToAuthors) {
      bookIdToAuthors[ab.bookId].push((ab as any).__author__);
    } else {
      bookIdToAuthors[ab.bookId] = [(ab as any).__author__];
    }
  });

  return bookIds.map(bookId => bookIdToAuthors[bookId]);
};

export const createAuthorsLoader = () => new DataLoader(batchAuthors);
