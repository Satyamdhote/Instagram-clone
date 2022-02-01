import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@material-ui/icons/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";

export default function UploadFile() {
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = async () => {
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
      setLoading(false);
      return;
    }
    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
      });
      setLoading(false);
      navigate("/");
    }
  };
  return (
    <div>
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            onChange={(e) => {
              handleChange(e.target.files[0]);
            }}
          ></input>
          <label htmlFor="upload-input">
            <Button
              color="secondary"
              variant="outlined"
              component="span"
              disabled={loading}
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
