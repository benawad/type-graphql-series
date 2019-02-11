import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [`${__dirname}/../modules/**/!(*.test).?(ts|js)`],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
