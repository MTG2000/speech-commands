import jsonData from "../../utils/data.json";
import { Typography, makeStyles } from "@material-ui/core";
import { useService } from "@xstate/react";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import RecommendedBlogCard from "./RecommendedBlogsCard";
import { MachineContext } from "../../contexts/machineContext";

const data = jsonData.recommendedArticles.slice(0, 3);

const useStyles = makeStyles({
  content: {
    display: "flex",
    justifyContent: "space-around",
  },
  title: {
    color: "var(--primary)",
    marginTop: 60,
    marginBottom: 33,
  },
});

function RecommendedBlogsList() {
  const classes = useStyles();
  const { machine } = useContext(MachineContext);
  const [state] = useService(machine.createdMachine);

  const history = useHistory();
  useEffect(() => {
    machine.setCnts("recommendeds", data.length);
    machine.setExternalActions("enterRecommendedBlog", (context) => {
      history.push(`/blog/${data[context.idx].id}`);
    });
  }, [history, machine]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Recommended For You
      </Typography>
      <div className={classes.content}>
        {data.map((blog, idx) => (
          <RecommendedBlogCard
            blog={blog}
            key={blog.id}
            isFocused={
              state.matches("recommendedArticles") && idx === state.context.idx
            }
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedBlogsList;
