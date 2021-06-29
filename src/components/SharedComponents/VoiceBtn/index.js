import { Fab, makeStyles } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import SpeakerIcon from "@material-ui/icons/RecordVoiceOver";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";
import { Recorder } from "./recorder";
import ScaleLoader from "react-spinners/ScaleLoader";
import UseMicDialog from "./UseMicDialog";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10000,

    "&.recording": {
      background: "#aaa",
    },
  },
  progress: {
    fill: "red",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  loading: {
    marginTop: 5,
  },
}));

export default function VoiceBtn() {
  const classes = useStyles();
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [permissionState, setPermissionState] = useState("denied");

  const handleDialogClose = (result) => {
    setDialogOpen(false);
    if (result) {
      const _recorder = new Recorder();
      setRecorder(_recorder);
    }
  };

  useEffect(() => {
    navigator.permissions
      .query({
        name: "microphone",
      })
      .then((status) => {
        setPermissionState(status.state);
      });
  }, []);

  return permissionState === "denied" ? (
    <></>
  ) : (
    <div>
      {recorder ? (
        <Fab
          color="primary"
          aria-label="add"
          className={`${classes.fab} ${isRecording ? "recording" : ""}`}
          onMouseDown={() => {
            if (isRecording) return;
            recorder.startRecording();
            setIsRecording(true);
            const time = 1200;
            const intervalCB = setInterval(() => {
              setPercentage((prev) => prev + 100 / 20);
            }, time / 20);
            setTimeout(() => {
              recorder.stopRecording();
              setIsRecording(false);
              setPercentage(0);
              clearInterval(intervalCB);
            }, time);
          }}
        >
          {percentage > 0 && (
            <CircularProgressbar
              value={percentage}
              className={classes.progress}
              styles={buildStyles({
                pathTransitionDuration: 0.1,
                pathColor: `var(--primary)`,
              })}
            />
          )}
          {isRecording ? (
            <span className={classes.loading}>
              <ScaleLoader
                color={`var(--primary)`}
                loading={true}
                width={2}
                height={17}
              />
            </span>
          ) : (
            <MicIcon />
          )}
        </Fab>
      ) : (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => {
            const micPermission = permissionState === "granted";
            if (micPermission) {
              const _recorder = new Recorder();
              setRecorder(_recorder);
            } else {
              setDialogOpen(true);
            }
          }}
          variant="extended"
        >
          <span> Voice Commands </span> <SpeakerIcon />
        </Fab>
      )}
      <UseMicDialog open={dialogOpen} onClose={handleDialogClose} />
    </div>
  );
}
