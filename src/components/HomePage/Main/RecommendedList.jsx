import jsonData from "../../../utils/data.json";
import MiniBlogCard from "./MiniBlogCard";
import { Typography, makeStyles, Card } from "@material-ui/core";
import { useService } from "@xstate/react";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MachineContext } from "../../../contexts/machineContext";

const data = jsonData.recommendedArticles;

const useStyles = makeStyles({
  root: {
    background: "var(--secondary)",
    padding: 25,
    marginBottom: 25,
    borderRadius: 15,
  },
  title: {
    color: "var(--primary)",
    marginBottom: 10,
  },
});

function RecommendedList() {
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
    <Card className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Recommended
      </Typography>
      {data.map((blog, idx) => (
        <MiniBlogCard
          blog={blog}
          key={blog.id}
          isFocused={
            state.matches("recommendedArticles") && idx === state.context.idx
          }
        />
      ))}
    </Card>
  );
}

export default RecommendedList;
