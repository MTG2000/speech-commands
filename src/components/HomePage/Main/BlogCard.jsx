import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const useStyles = makeStyles({
  card: {
    marginBottom: "5px",
    "&:hover": {
      background: "var(--secondary)",
      "& $title": {
        color: "var(--primary)",
      },
    },
    "&.focus": {
      background: "var(--focused)",
    },
  },
  img: {
    backgroundSize: "cover",
    width: "250px",
    height: "200px",
    border: "1px solid blck",
    boxShadow: "1px 1px 3px 1px blue",
    borderRadius: "10%",
    marginRight: 20,
  },
  title: { padding: "20px 20px 20px 0" },
  listItemTextPrimary: { padding: "0 13px 13px 0" },
  btn: {
    display: "block",
    marginInlineStart: "auto",
    backgroundColor: "transparent",
    border: "3px solid var(--primary)",
    color: "var(--primary)",
    fontWeight: "bold",
    borderRadius: "0 12px",
    "&:hover": {
      backgroundColor: "var(--primary)",
      color: "#FFF",
    },
  },
  extraInfo: {
    marginInlineEnd: 20,
  },
  icon: {
    verticalAlign: "middle",
    marginInlineEnd: 7,
  },
});

function BlogCard({ blog, isFocused }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref && isFocused)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [isFocused]);

  const classes = useStyles();
  return (
    <Card
      key={blog.id}
      className={`${classes.card} ${isFocused ? "focus" : ""}`}
      ref={ref}
    >
      <List>
        <ListItem>
          <Grid container>
            <ListItemAvatar>
              <div
                className={classes.img}
                style={{
                  backgroundImage: `url(${blog.img})`,
                }}
              ></div>
            </ListItemAvatar>
            <Grid item xs={12} sm={10} lg={7} xl={7}>
              <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Typography className={classes.title} variant="h4">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <ListItemText
                    className={classes.listItemTextPrimary}
                    primary={blog.summary}
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Grid container>
                    <Grid item className={classes.extraInfo}>
                      <AccessTimeIcon
                        className={classes.icon}
                        color="primary"
                      ></AccessTimeIcon>
                      <Typography variant="subtitle1" component="span">
                        {blog.date}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.extraInfo}>
                      <CommentIcon
                        className={classes.icon}
                        color="primary"
                      ></CommentIcon>
                      <Typography variant="subtitle1" component="span">
                        {blog.comments.length}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.extraInfo}>
                      <VisibilityIcon
                        className={classes.icon}
                        color="primary"
                      ></VisibilityIcon>
                      <Typography variant="subtitle1" component="span">
                        {blog.viewsCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Link to={`/blog/${blog.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                  >
                    Read More
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Card>
  );
}

export default BlogCard;
