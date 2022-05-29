import { login } from "@controllers/user/methods/login";
import { logout } from "@controllers/user/methods/logout";
import { signup } from "@controllers/user/methods/signup";
import { auth } from "@controllers/user/methods/auth";
import { getUserList } from "@controllers/user/methods/getUserList";
import { getUser } from "@controllers/user/methods/getUser";
import { updateUser } from "@controllers/user/methods/updateUser";
import { searchByName } from "@controllers/user/methods/searchByName";

export default {
  login,
  logout,
  signup,
  auth,
  getUserList,
  getUser,
  updateUser,
  searchByName,
};
