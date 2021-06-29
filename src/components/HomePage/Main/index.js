import MainList from "./MainList";
import { Grid } from "@material-ui/core";
import RecommendedList from "./RecommendedList";
import RecentsList from "./RecentsList";

function Body() {
  return (
    <>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={10} md={7} lg={7}>
          <MainList />
        </Grid>
        <Grid item xs={12} sm={10} md={4} lg={4}>
          <Grid container>
            <Grid item xs={12}>
              <RecommendedList />
            </Grid>
            <Grid item xs={12}>
              <RecentsList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Body;
