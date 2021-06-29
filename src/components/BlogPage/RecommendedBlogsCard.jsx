import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { trim } from "../../utils/helpers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "280px",
  },
  media: {
    height: 140,
  },
});

export default function RecommendedBlogCard({ blog, isFocused }) {
  const classes = useStyles();
  const ref = useRef(null);

  useEffect(() => {
    if (ref && isFocused)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [isFocused]);

  return (
    <Link to={`/blog/${blog.id}`} ref={ref} className={classes.root}>
      <Tooltip title={blog.title}>
        <Card
          className={isFocused ? "focused" : ""}
          style={{ marginBottom: "2px" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={blog.img}
              title={blog.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {trim(blog.title, 30)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {blog.secondary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </Link>
  );
}
