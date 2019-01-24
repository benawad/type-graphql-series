import { Query } from "type-graphql";
import { newR } from "./DynamicResolvers";
import { createResolver } from "./ResolversFactory";

// @ts-ignore
export function autoQueries(queries: any[]): any {
  return function(target: any) {
    const resolverClass = createResolver(
      target.name,
      target,
      class {},
      target,
      [{ genre: Query, meth: queries }]
    );

    newR.resolvers = [resolverClass];
  };
}
