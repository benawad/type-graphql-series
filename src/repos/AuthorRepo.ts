import { EntityRepository, Repository } from "typeorm";
import { Author } from "../entity/Author";

@EntityRepository(Author)
export class AuthorRepo extends Repository<Author> {}
