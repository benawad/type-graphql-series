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

function myNewDecorator(value: any) {
  console.log("myNewDecorator value: ", value);
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("target: ", target);
    console.log("propertyKey: ", propertyKey);
    console.log("descriptor: ", descriptor);
  };
}

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  decorator: any[]
) {
  const decoratorFactory = (decos: any[]): Function => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
      decos.map((deco: () => Function) =>
        deco()(target, propertyKey, descriptor)
      );
  };

  @Resolver()
  class BaseResolver {
    @decoratorFactory(decorator)
    @Mutation(() => returnType, { name: `create${suffix}` })
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
  [Authorized, myNewDecorator]
);
export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product,
  [Authorized, myNewDecorator]
);
