import {
  Dialog,
  Typography,
  Box,
  makeStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  body: {
    fontSize: 16,
    "& span": {
      color: "var(--primary)",
      fontWeight: "bold",
    },
  },
}));

export default function UseMicDialog({ open, onClose }) {
  const classes = useStyles();

  return (
    <Dialog open={open} className={classes.root} onClose={() => onClose()}>
      <Box pt={4} pb={2} px={2}>
        <DialogTitle>
          <Typography variant="h4">Using Voice Commands 📢</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" className={classes.body}>
            {/* 🎙📢 */}
            This Website allows you to use voice commands to navigate through
            the differnet pages of the website.
            <br />
            <br />- <span> UP </span>/<span> DOWN </span>/<span> LEFT </span>/
            <span> RIGHT </span>: for Directional movement. <br />-{" "}
            <span> GO </span>: to enter an article. <br />- <span> ON </span>/
            <span> OFF</span>: to play/stop video. <br />-{" "}
            <span> BACKWARD </span>: to go backward.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => onClose(true)}
            variant="contained"
            color="primary"
          >
            Enable Voice Commands
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
