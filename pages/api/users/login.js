// Main Imports
const bcrypt = require("bcryptjs");
const { usersRepo } = require("../../../components/helpers/user-repo");
import { withSessionRoute } from "../../../lib/withSession";
import { apiHandler } from "../../../lib/handlers";

export default withSessionRoute(
  apiHandler({
    post: login,
  })
);

async function login(req, res) {
  // split out password from user details
  const { password, email } = await JSON.parse(req.body);
  // requested user
  let requestedUser = usersRepo.find((x) => x.email === email);

  // validate
  if (!requestedUser) {
    throw `This email is not registered`;
  }

  if (!bcrypt.compareSync(password, requestedUser.hash)) {
    throw `Wrong password`;
  }
  // get user from database then:
  req.session.user = requestedUser;
  await req.session.save();

  return res.status(200).json(requestedUser);
}
