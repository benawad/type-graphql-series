import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("LOGIN: no user");
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("LOGIN: invalid password");
      return null;
    }

    if (!user.confirmed) {
      console.log("LOGIN: user not confirmed");
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
