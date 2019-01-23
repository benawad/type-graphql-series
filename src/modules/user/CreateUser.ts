import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

const methodList = {
  query: {
    genre: Query,
    list: {
      findAll: (data: any) => {
        console.log("query findAll data: ", data);
      },
      findOne: (data: any) => {
        console.log("query findOne data: ", data);
      }
    }
  },
  mutation: {
    genre: Mutation,
    list: {
      createM: (data: any) => {
        console.log("mutation create data: ", data);
      },
      deleteM: (data: any) => {
        console.log("mutation delete data: ", data);
      }
    }
  }
};

// @ts-ignore
interface BaseResolver {
  // @ts-ignore
  createM?: typeof methodList.createM;
  // @ts-ignore
  deleteM?: typeof methodList.deleteM;
  [key: string]: any;
}

// @ts-ignore
function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  operations: any[]
): any {
  function classDecorator(): any {
    return function(
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      operations.forEach(oper => {
        // @ts-ignore
        const deco = methodList[oper.genre].genre;
        // @ts-ignore
        oper.meth.forEach(method => {
          // @ts-ignore
          target.prototype[method] = methodList[oper.genre].list[method];
          //const targetMethod = target.prototype[method];
          const targetPrototype = target.prototype;
          const methodKey = method;
          // @ts-ignore
          deco(() => returnType, {
            name: `${method}${suffix}`,
            nullable: true
          })(
            targetPrototype,
            // @ts-ignore
            methodKey
          );
        });
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
  [{ genre: "query", meth: ["findAll", "findOne"] }]
);

/*
 *  List of type-graphql decorators and their needed parameters:
 *    ParameterDecorator: prototype, propertyKey, parameterIndex
 *      Arg, Args, Ctx, Info, PubSub, Root,
 *
 *    ClassDecorator: target
 *      ArgsType, InputType, InterfaceType, ObjectType, Resolver,
 *
 *    MethodAndPropDecorator: prototype, propertyKey, descriptor
 *      Authorized, Field,
 *
 *    MethodDecorator: prototype, propertyKey/methodName
 *      FieldResolver, Mutation, Query, Subscription,
 *
 *    UseMiddleware can be: MethodAndPropDecorator, MethodDecorator , PropertyDecorator
 *
 *    registerEnumType accepts enumObj and EnumConfig
 *    createUnionType to be seen better
 *
 */
