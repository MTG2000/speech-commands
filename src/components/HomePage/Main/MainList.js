import jsonData from "../../../utils/data.json";
import BlogCard from "./BlogCard";
import { useService } from "@xstate/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { MachineContext } from "../../../contexts/machineContext";

const data = jsonData.articles.slice(0, 10);

function MainList() {
  const { machine } = useContext(MachineContext);

  const [state] = useService(machine.createdMachine);
  const history = useHistory();

  useEffect(() => {
    machine.setCnts("articles", data.length);
    machine.setExternalActions("enterBlog", (context) => {
      history.push(`/blog/${data[context.idx].id}`);
    });
  }, [history, machine]);

  return (
    <div style={{ marginBottom: "50px" }}>
      {data.map((item, idx) => (
        <BlogCard
          blog={item}
          key={item.id}
          isFocused={state.matches("articlesList") && idx === state.context.idx}
        />
      ))}
    </div>
  );
}

export default MainList;
