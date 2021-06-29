import React, { useRef } from "react";
import { useContext, useEffect } from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useService } from "@xstate/react";
import { MachineContext } from "../../contexts/machineContext";
import CommentCard from "./CommentCard";

const useStyles = makeStyles(() => ({
  root: {
    background: "var(--secondary)",
    padding: 25,
    borderRadius: 15,
    "&.focuse": {
      animation: `$fadeBg 1000ms ease-in-out`,
    },
  },

  "@keyframes fadeBg": {
    "0%": {
      background: "var(--focused)",
    },
    "100%": {
      background: "var(--secondary)",
    },
  },
  title: {
    color: "var(--primary)",
    marginBottom: 10,
  },
}));
function Comments({ article }) {
  const { machine } = useContext(MachineContext);
  const [state] = useService(machine.createdMachine);
  const ref = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    machine.setExternalActions("reachedTopOfComments", () => {
      var elem = ref.current;
      if (elem.offsetTop - window.innerHeight * 1.1 <= window.scrollY)
        return true;
      return false;
    });
  }, [machine]);

  return (
    <>
      <Card
        className={`${state.matches("comments") ? "focuse" : ""} ${
          classes.root
        }`}
        ref={ref}
      >
        <Typography variant="h4" className={classes.title}>
          Comments
        </Typography>
        {article.comments.map((comment, idx) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isFocused={
              state.matches("recommendedArticles") && idx === state.context.idx
            }
          ></CommentCard>
        ))}
      </Card>
    </>
  );
}

export default Comments;
