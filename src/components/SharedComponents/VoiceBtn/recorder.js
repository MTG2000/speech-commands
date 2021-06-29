import RecorderJs from "recorder-js";
import { cmds as allCmds } from "../../../cmds/allCmds";
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

export class Recorder {
  recorder = null;

  constructor() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.recorder = new RecorderJs(audioContext);
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          volume: 1.0,
        },
        video: false,
      })
      .then((stream) => this.recorder.init(stream))
      .catch((err) => console.log("Uh oh... unable to get stream...", err));
  }

  startRecording() {
    this.recorder.start();
  }

  stopRecording() {
    this.recorder.stop().then(({ blob }) => {
      var data = new FormData();
      data.append("audio", blob, `${Date.now()}.wav`);
      fetch(" https://speech-nav.herokuapp.com/stt", {
        method: "POST",
        body: data,
      }).then((response) =>
        response.json().then(({ result }) => {
          if (result) {
            switch (result) {
              case "up":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.UP })
                );
                createToast(ArrowUpward, "UP");
                break;
              case "down":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.DOWN })
                );
                createToast(ArrowDownward, "DOWN");
                break;
              case "left":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.LEFT })
                );
                createToast(ArrowLeft, "LEFT");
                break;
              case "right":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.RIGHT })
                );
                createToast(ArrowRight, "RIGHT");
                break;
              case "go":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.GO })
                );
                createToast(GoIcon, "GO");
                break;
              case "on":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.ON })
                );
                createToast(PlayIcon, "ON");
                break;
              case "off":
                document.dispatchEvent(
                  new CustomEvent("cmd", { detail: allCmds.OFF })
                );
                createToast(StopIcon, "OFF");
                break;
              case "backward":
                window.history.back();
                createToast(BackwardIcon, "Backward");
                break;
              default:
                break;
            }
          }
        })
      );
    });
  }
}
