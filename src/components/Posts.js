import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Videos from "./Videos";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import Like2 from "./Like2";
import AddComments from "./AddComments";
import Comments from "./Comments";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    return unsub;
  }, []);

  return (
    <div>
      {console.log("Hello out")}
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <div className="video-container">
            {posts.map((post, index) => (
              <React.Fragment key={index}>
                {console.log(post)}
                <div className="videos">
                  <Videos src={post.purl} id={post.pid} />
                  <div className="fa" style={{ display: "flex" }}>
                    <Avatar src={userData.profileUrl} />
                    <h4 style={{ color: "red" }}>{userData.fullname}</h4>
                  </div>
                  <Like userData={userData} postData={post} />
                  <ChatBubble
                    style={{ color: "red" }}
                    className="chat-styling"
                    onClick={() => handleClickOpen(post.pid)}
                  />
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Open alert dialog
                  </Button>
                  <Dialog
                    open={open == post.pid}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="md"
                  >
                    <div className="modal-container">
                      <div className="video-modal">
                        <video autoplay={true} muted="muted" controls>
                          <source src={post.purl}></source>
                        </video>
                      </div>
                      <div className="comment-modal">
                        <Card className="card1" style={{ padding: "1rem" }}>
                          <Comments postData={post} />
                        </Card>
                        <Card variant="outlined">
                          <Typography
                            style={{ padding: "0.4rem", marginLeft: "30px" }}
                          >
                            {post.likes.length == 0
                              ? ""
                              : `Liked By ${post.likes.length} users`}
                          </Typography>
                          <div style={{ display: "flex" }}>
                            <Like2
                              postData={post}
                              userData={userData}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                            <AddComments userData={userData} postData={post} />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
