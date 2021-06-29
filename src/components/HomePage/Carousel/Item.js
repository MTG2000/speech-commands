import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    minHeight: "80vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: "linear-gradient(0deg, #0000003b, #000000ad, #0000003b)",
      zIndex: 0,
    },
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  label: {
    color: "#FFF",
  },
}));
function Item(props) {
  const classes = useStyles();
  return (
    <Paper
      className={classes.paper}
      style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={classes.content}>
        <Link to={`/blog/${props.id}`}>
          <Typography variant="h3" className={classes.label}>
            {props.title}
          </Typography>
        </Link>
      </div>
    </Paper>
  );
}

export default Item;
