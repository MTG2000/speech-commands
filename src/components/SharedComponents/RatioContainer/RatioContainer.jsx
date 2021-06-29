import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#111",
    position: "relative",
    paddingTop: "56.25%",
    "&>*": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

export default function RatioContainer(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}
