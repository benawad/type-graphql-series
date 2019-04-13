import { buildSchema } from "type-graphql";
import { AuthorBookResolver } from "../modules/author-book/AuthorBookResolver";
import { AuthorDataMapper } from "../modules/author-book/AuthorDataMapper";
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
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";
import { RegisterResolver } from "../modules/user/Register";
import { Container } from "typedi";

export const createSchema = () =>
  buildSchema({
    container: Container,
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreateProductResolver,
      ProfilePictureResolver,
      AuthorBookResolver,
      AuthorDataMapper
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
