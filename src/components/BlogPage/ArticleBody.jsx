import { makeStyles, Typography } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { useService } from "@xstate/react";
import { MachineContext } from "../../contexts/machineContext";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import RatioContainer from "../SharedComponents/RatioContainer/RatioContainer";
import { buildDOM1 } from "../../utils/buildDom1";

const useStyles = makeStyles({
  root: {
    "&.focuse": {
      animation: `$fadeBg 1000ms ease-in-out`,
    },
  },
  "@keyframes fadeBg": {
    "0%": {
      background: "var(--focused)",
    },
    "100%": {
      background: "transparent",
    },
  },
  img: {
    width: "100%",
    objectFit: "cover",
  },
  title: {
    marginTop: 25,
  },
  body: {
    marginTop: 25,
    fontWeight: "normal",
    "& img": {
      maxWidth: "100%",
    },
  },
});

export default function ArticleBody({ article }) {
  const classes = useStyles();
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const { machine } = useContext(MachineContext);
  const [state] = useService(machine.createdMachine);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    machine.setExternalActions("reachedBottomOfBlog", () => {
      var elem = ref.current;
      if (
        elem.offsetTop + elem.scrollHeight - window.innerHeight * 1.1 <=
        window.scrollY
      )
        return true;
      return false;
    });
    machine.setExternalActions("playVideo", () => setVideoPlaying(true));
    machine.setExternalActions("stopVideo", () => setVideoPlaying(false));
  }, [machine]);

  useEffect(() => {
    bodyRef.current.innerHTML = "";
    buildDOM1(bodyRef.current, article.content);
  }, [article.content]);

  return (
    <>
      <div
        className={`${state.matches("mainArticle") ? "focuse" : ""} ${
          classes.root
        }`}
        ref={ref}
      >
        {article.video ? (
          <ReactPlayer
            url={article.video}
            playing={videoPlaying}
            wrapper={RatioContainer}
          />
        ) : (
          <img src={article.img} alt={article.title} className={classes.img} />
        )}
        <Typography variant="h2" component="h1" className={classes.title}>
          {article.title}
        </Typography>
        <div className={classes.body} ref={bodyRef}></div>
      </div>
    </>
  );
}
