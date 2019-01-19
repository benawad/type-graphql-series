import { Resolver, Mutation, Arg, ClassType, Query } from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";

const methodList: {
  createM: (data: any) => void;
  deleteM: (data: any) => void;
} = {
  createM: (data: any) => {
    console.log("create data: ", data);
  },
  deleteM: (data: any) => {
    console.log("delete data: ", data);
  }
};

// @ts-ignore
interface BaseResolver {
  createM?: typeof methodList.createM;
  deleteM?: typeof methodList.deleteM;
  [key: string]: any;
}

// @ts-ignore
function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  methods: any[]
): any {
  function classDecorator(): any {
    return function(
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      methods.forEach(method => {
        // @ts-ignore
        target.prototype[method] = methodList[method];
        const targetMethod = target.prototype[method];
        const targetPrototype = target.prototype;
        const methodKey = Object.keys(targetPrototype).find(
          key => targetPrototype[key] === targetMethod
        );
        // @ts-ignore
        Query(() => User, { nullable: true })(
          targetPrototype,
          // @ts-ignore
          methodKey,
          {
            value: targetMethod,
            writable: true,
            enumerable: false,
            configurable: true
          }
        );
      });
      console.log("target: ", target);
      console.log("propertyKey: ", propertyKey);
      console.log("descriptor: ", descriptor);
    };
  }

  @classDecorator()
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    create(
      @Arg("data", () => inputType)
      data: any
    ) {
      return entity.create(data).save();
    }

    /* constructor() {
      methods.forEach(method => {
        BaseResolver.prototype[method] = createM;
      });
    } */
  }

  return BaseResolver;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User,
  ["createM", "deleteM"]
);
