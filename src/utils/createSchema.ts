import { buildSchema } from "type-graphql";
import { newR } from "../modules/dynamic/DynamicResolvers";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import {
  CreateProductResolver,
  CreateUserResolver
} from "../modules/user/CreateUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";

let createSchema;
const init = async () => {
  // quick and dirty loader. Put here to secure correct call order of the decorators
  // but Not sure if needed. needs test
  // https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
  var normalizedPath = require("path").join(__dirname, "../entity");

  const fs = require("fs");
  await fs
    .readdirSync(normalizedPath)
    //@ts-ignore
    .forEach(function(file) {
      import("../entity/" + file);
    });
  //@ts-ignore
  const dynaResolver = newR.resolvers;
  //@ts-ignore
  const allResolvers = [
    ChangePasswordResolver,
    ConfirmUserResolver,
    ForgotPasswordResolver,
    LoginResolver,
    LogoutResolver,
    MeResolver,
    RegisterResolver,
    CreateUserResolver,
    CreateProductResolver
  ];
  allResolvers.push(...dynaResolver);

  createSchema = () =>
    buildSchema({
      resolvers: allResolvers,
      authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
      }
    });
};
init();

export { createSchema };
