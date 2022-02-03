import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../firebase";

function AddComments({ userData, postData }) {
  const [text, setText] = useState("");
  const handleClick = () => {
    let obj = {
      text: text,
      uProfileImage: userData.profileUrl,
      uName: userData.fullname,
    };
    console.log([...postData.comment]);
    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.postId).update({
        comment: [...postData.comment, doc.id],
      });
    });
    console.log([...postData.comment]);
    setText("");
  };
  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="filled-basic"
        label="filled"
        variant="filled"
        size="small"
        sx={{ width: "70%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}

export default AddComments;
