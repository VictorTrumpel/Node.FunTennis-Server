import pick from "lodash.pick";
import bcrypt from "bcrypt";
import { tryCatchCRUD } from "@helpers/tryCatchCRUD";
import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { Response, Request } from "express";
import { SignupFields, signupValidate } from "@forms/signup";
import { createSession } from "@helpers/createSession";
import { User } from "@models/User";
import { deleteSession } from "@helpers/deleteSession";
import { loginValidate } from "@forms/login";
import { ObjectId } from "mongodb";
import cloneDeep from "lodash.clonedeep";

export class UserController {
  async login(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      const fields: (keyof SignupFields)[] = ["username", "password"];
      const { username, password } = pick(req.body, ...fields) as SignupFields;

      await loginValidate({ username, password });

      const user = await req.usersCollection.findOne({ username });

      if (!user) throw new Error("User is not found!");

      const isPassword = await bcrypt.compare(
        password as string,
        user.password
      );

      if (!isPassword) throw new Error("Auth error!");

      const sessionId = await createSession(req.sessionsCollection, user._id);

      return res.cookie("sessionId", sessionId).json({ sessionId });
    });
  }

  async logout(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      if (!req.user) throw new Error("No user");
      await deleteSession(req.sessionsCollection, req.sessionId);
      res.clearCookie("sessionId").json({ message: "success" });
    });
  }

  async signup(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      const fields: (keyof SignupFields)[] = ["username", "password"];
      const { username, password } = pick(req.body, ...fields) as SignupFields;

      await signupValidate(req.body);

      const isUserExists = !!(await req.usersCollection.findOne({
        username: username,
      }));

      if (isUserExists) throw new Error("User already exist");

      const hashPassword = await bcrypt.hash(password as string, 5);
      const userId = await req.usersCollection.insertOne({
        ...req.body,
        password: hashPassword,
      } as User);

      return res.json(userId);
    });
  }

  async auth(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;
    await tryCatchCRUD(res, async () => {
      res.json(req.user);
    });
  }

  async getUserList(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      const users = await req.usersCollection.find(req.query).toArray();
      const usersSecurity = users.map((user) => {
        const securityUser: Partial<User> = {
          ...user,
        };
        delete securityUser["password"];
        return securityUser;
      });

      res.json(usersSecurity);
    });
  }

  async getUser(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      const pathParts = req.path.split("/");
      const id = pathParts[pathParts.length - 1];

      const user = await req.usersCollection.findOne({
        _id: new ObjectId(id),
      });

      const protectedUser: Partial<User> = { ...user };
      delete protectedUser["password"];

      res.json(protectedUser);
    });
  }

  async updateUser(request: Request, res: Response) {
    const req = request as TypedRequest<AuthRequest & DbRequest>;

    await tryCatchCRUD(res, async () => {
      const fields: (keyof SignupFields)[] = ["username", "password"];
      const { username } = pick(req.body, ...fields) as SignupFields;

      await signupValidate(req.body);

      const dispatchInf = cloneDeep(req.body);
      delete dispatchInf["password"];
      delete dispatchInf["_id"];

      await req.usersCollection.updateOne(
        { username: { $eq: username } },
        { $set: { ...dispatchInf } }
      );

      res.json({ message: "success" });
    });
  }
}
