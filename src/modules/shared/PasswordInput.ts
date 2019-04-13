import { MinLength } from "class-validator";
import { Field, InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType(
    "I" +
      Math.random()
        .toString(36)
        .substring(2, 15)
  )
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(5)
    password: string;
  }
  return PasswordInput;
};
