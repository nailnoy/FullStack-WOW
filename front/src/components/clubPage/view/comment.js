import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@mui/material";


const Comment = ({ comments }) => {
  return (
    <List className="">
      {comments.map(comment => {
        console.log("Comment", comment);
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="">
                    {comment.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className=""
                      color="textPrimary"
                    >
                      {comment.email}
                    </Typography>
                    {` - ${comment.body}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comment;