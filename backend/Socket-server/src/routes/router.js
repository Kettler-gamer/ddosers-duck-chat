import express from "express";
import sockets from "../../socket.js";
import jwtVerify from "../filter/jwtVerify.js";
const router = express.Router();

router.use(jwtVerify.isRequestFromServer);

router.route("/updatedChannel").put((req, res) => {
  const channel = req.body.channel;
  for (let i = 0; i < sockets.length; i++) {
    sockets[i].emit("updatedChannel", channel);
  }
  res.send("Done!");
});

router.post("/newMessage", (req, res) => {
  const { channelId, newMessage } = req.body;
  for (let i = 0; i < sockets.length; i++) {
    sockets[i].emit("newMessage", { channelId, newMessage });
  }
  res.send("Done!");
});

export default router;
