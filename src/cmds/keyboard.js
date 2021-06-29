import { cmds as allCmds } from "./allCmds";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import ArrowRight from "@material-ui/icons/ArrowForward";
import GoIcon from "@material-ui/icons/Navigation";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/PauseCircleFilled";
import BackwardIcon from "@material-ui/icons/Undo";

const createToast = (Icon, text) => {
  toast(
    <>
      <Icon
        htmlColor="red"
        fontSize="large"
        style={{ verticalAlign: "middle" }}
      />{" "}
      <Typography
        component="span"
        style={{ color: "#111", fontWeight: "bold" }}
      >
        {text}
      </Typography>
    </>
  );
};
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.UP }));

      createToast(ArrowUpward, "UP");
      break;
    case "KeyS":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.DOWN }));
      createToast(ArrowDownward, "DOWN");
      break;
    case "KeyA":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.LEFT }));
      createToast(ArrowLeft, "LEFT");
      break;
    case "KeyD":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.RIGHT }));
      createToast(ArrowRight, "RIGHT");
      break;
    case "KeyE":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.GO }));
      createToast(GoIcon, "GO");
      break;
    case "KeyP":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.ON }));
      createToast(PlayIcon, "ON");
      break;
    case "KeyO":
      document.dispatchEvent(new CustomEvent("cmd", { detail: allCmds.OFF }));
      createToast(StopIcon, "OFF");
      break;
    case "Backspace":
      window.history.back();
      createToast(BackwardIcon, "Backward");
      break;
    default:
      break;
  }
});
