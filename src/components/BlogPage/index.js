import { useParams, useHistory } from "react-router-dom";
import { Container, Grid, Box } from "@material-ui/core";
import jsonData from "../../utils/data.json";
import ArticleBody from "./ArticleBody";
import RecentsList from "../HomePage/Main/RecentsList";
import { ArticlePageMachine } from "../../machines/articlePageMachine";
import MachineProvider, { MachineContext } from "../../contexts/machineContext";
import { withProviders } from "../../utils/withProviders";
import { useContext, useEffect } from "react";
import { useService } from "@xstate/react";
import RecommendedBlogsList from "./RecommendedBlogsList";
import CommentsList from "./CommentsList";

function BlogPage() {
  let { id } = useParams();
  let article = jsonData.articles.filter((ar) => ar.id === +id);
  const { machine } = useContext(MachineContext);
  const [, send] = useService(machine.createdMachine);
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      send("RESET");
      send("READY");
    });
    send("READY");
  }, [send, history]);

  if (!article.length) return <h1>404 NOT FOUND</h1>;
  article = article[0];

  return (
    <Box py={5}>
      <Container>
        <Grid container justify="space-between">
          <Grid item xs={12} lg={8}>
            <ArticleBody article={article} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <RecentsList />
          </Grid>
        </Grid>
        <RecommendedBlogsList />
        <Box py={10}>
          <Grid container justify="space-between">
            <Grid item xs={12} lg={8}>
              <CommentsList article={article}></CommentsList>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default withProviders([
  MachineProvider,
  { Machine: ArticlePageMachine },
])(BlogPage);
