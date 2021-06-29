import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 10,
    borderTopLeftRadius: "10px ",
  },
  avatar: {
    width: 70,
    height: 70,
    borderStartStartRadius: 3,
    border: "1px solid var(--primary)",
    marginRight: 10,
  },
  img: {
    Height: "100%",
    width: "100%",
  },
  TOCmment: {
    color: "#777",
    marginInlineStart: 10,
  },
}));
function CommentCard({ comment }) {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <img
                src={comment.avatar}
                className={classes.img}
                alt={comment.name}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography variant="h6" component="span">
                  {comment.name}{" "}
                </Typography>{" "}
                <span className={classes.TOCmment}>{comment.TOC}</span>
              </>
            }
            secondary={
              <Typography variant="body1">{comment.comment}</Typography>
            }
          ></ListItemText>
        </ListItem>
      </List>
    </>
  );
}

export default CommentCard;
