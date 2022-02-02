import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Videos from "./Videos";
import "./Posts.css";
import { Avatar } from "@mui/material";
import Like from "./Like";

export default function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
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
          {console.log("Hello in")}
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
                  <Like userData={userData} postDats={post} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
