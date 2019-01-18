import { ClassType, Query, Resolver } from "type-graphql";

// @ts-ignore
export function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  // @ts-ignore
  inputType: X,
  // @ts-ignore
  entity: any,
  operations: any[]
): any {
  function classDecorator(): any {
    console.log("classDecorator operations: ", operations);
    return function(
      target: any,
      // @ts-ignore
      propertyKey: string,
      // @ts-ignore
      descriptor: PropertyDescriptor
    ) {
      operations.forEach(oper => {
        // @ts-ignore
        const deco = oper.genre;
        console.log("classDecorator deco: ", deco);
        // @ts-ignore
        oper.meth.forEach(method => {
          target.prototype[method.name] = method;
          const targetPrototype = target.prototype;
          const methodKey = method.name;
          // @ts-ignore
          deco(() => returnType, {
            name: `${method.name}${suffix}`,
            nullable: true
          })(
            targetPrototype,
            // @ts-ignore
            methodKey
          );
          console.log("classDecorator targetPrototype: ", targetPrototype);
        });
      });
      /* console.log("target: ", target);
      console.log("propertyKey: ", propertyKey);
      console.log("descriptor: ", descriptor); */
    };
  }

  @classDecorator()
  @Resolver()
  class ResolversFactory {
    @Query(() => String, {
      nullable: true
    })
    base() {
      return console.log("base query");
    }
  }

  return ResolversFactory;
}

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
