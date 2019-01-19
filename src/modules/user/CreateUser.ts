import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  Authorized
} from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";
import { Product } from "../../entity/Product";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  decorator: any
) {
  const decoratorFactory = (deco: any): any => {
    return deco();
  };

  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @decoratorFactory(decorator)
    create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User,
  Authorized
);
export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product,
  Authorized
);
