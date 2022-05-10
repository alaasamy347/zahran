// Main Imports
import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(async (req, res) => {
  req.session.user = null;
  await req.session.save();
  res.status(200).json({ message: "successfully logout" });
});
