import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@material-ui/icons/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";

import { database, storage } from "../firebase";

export default function UploadFile(props) {
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = async (file) => {
    if (file == null) {
      setError("Please select a file");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("File shhould be less than 100 MB");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    let uid = uuidv4();
    setloading(true);
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed", fn1, fn2, fn3);
    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done.`);
    }
    function fn2(error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
      setloading(false);
      return;
    }
    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        let obj = {
          likes: [],
          comment: [],
          pid: uid,
          purl: url,
          uName: props.user.fullname,
          uProfile: props.user.profileUrl,
          userId: props.user.userId,
          createdAt: database.getTimeStamp(),
        };
        database.posts
          .add(obj)
          .then(async (ref) => {
            let res = await database.users.doc(props.user.userId).update({
              postIds:
                props.user.postIds != null
                  ? [...props.user.postIds, ref.id]
                  : [ref.id],
            });
          })
          .then(() => {
            setloading(false);
          })
          .catch((err) => {
            setError(err);
            setTimeout(() => {
              setError("");
            }, 2000);
            setloading(false);
          });
      });
    }
  };
  return (
    <div>
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <label htmlFor="upload-input">
            <input
              type="file"
              accept="video/*"
              id="upload-input"
              hidden={true}
              onChange={(e) => {
                handleChange(e.target.files[0]);
              }}
            ></input>
            <Button
              variant="outlined"
              color="secondary"
              disabled={loading}
              component="span"
            >
              <MovieIcon />
              &nbsp; Upload Video
            </Button>
          </label>
          {loading && (
            <LinearProgress color="secondary" style={{ marginTop: "3px" }} />
          )}
        </>
      )}
    </div>
  );
}
