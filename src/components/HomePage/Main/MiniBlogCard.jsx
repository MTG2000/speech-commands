import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { trim } from "../../../utils/helpers";

export default function MiniBlogCard({ blog, isFocused }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref && isFocused)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [isFocused]);

  return (
    <Link to={`/blog/${blog.id}`} ref={ref}>
      <Card
        className={isFocused ? "focused" : ""}
        style={{ marginBottom: "2px" }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img
                  src={blog.img}
                  alt="article"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={trim(blog.title, 30)}
              secondary={blog.secondary}
            />
          </ListItem>
        </List>
      </Card>
    </Link>
  );
}
