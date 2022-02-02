import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import { useContext } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./Login.css";
import Instalogo from "../Assets/Instalogo.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Mobile1 from "../Assets/Mobile1.png";
import { Link, useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Img1 from "../Assets/Img1.png";
import Img2 from "../Assets/Img2.png";
import Img3 from "../Assets/Img3.png";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const store = useContext(AuthContext);
  // console.log(store);
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      height: "7vh",
      marginTop: "2%",
    },
  });
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <div className="login-Wrapper">
      <div
        className="imgcar"
        style={{ backgroundImage: `url(${Mobile1})`, backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={3}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            totalSlides={3}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={Img1}></Image>
              </Slide>
              <Slide index={1}>
                <Image src={Img2}></Image>
              </Slide>
              <Slide index={2}>
                <Image src={Img3}></Image>
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img
              src={Instalogo}
              style={{ width: "100%", marginRight: "20px" }}
              alt="logo"
            ></img>
          </div>
          <CardContent>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography className={classes.text1} variant="subtitle1">
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Forgot Password ?
              </Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="secondary"
              fullWidth={true}
              variant="contained"
              onClick={handleClick}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Don't have an Account ?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
