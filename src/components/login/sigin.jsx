import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "./useForms";
import axios from "axios";
import { withRouter } from "react-router";
import GoogleLogin from "react-google-login";
import SocialLogin from "./socialLogin";
import validate from "./loginFormValidation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { loginUrl, isUser } from "../../config/all.js";
import { async } from "q";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#fd7e14"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#36cce6",
    color: "white",
    "&:hover": {
      backgroundColor: "#26c8d0",
      // Reset on mouse devices
      "@media (hover: none)": {
        backgroundColor: "  #36cce6"
      }
    }
  }
}));
function SignIn(props) {
  const classes = useStyles();
  console.log("props", props);
  const { values, handleChange, handleSubmit, errors } = useForm(
    loginUser,
    validate
  );
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //console.log("props", props);
  async function loginUser() {
    // console.log(props);
    console.log(values);
    let data;

    await axios
      .post(loginUrl, {
        email: values.email,
        password: values.password,
        organization: values.organization
      })
      .then(response => {
        console.log("response", response);
        props.auth.setUserInfo(response.data, values.remember);
        props.auth.setToken(response.data.token, values.remember);
        window.location = "/admin";
        return;
      })
      .catch(function(error) {
        if (error.response.status == "400") {
          console.log("Response---", error.response.data);
          if (error.response.data.indexOf("password") > -1) {
            setText("Incorrect Password");
          } else {
            setText("User With this Email Doesn't Exist");
          }
          handleClickOpen();
        }
      });
  }
  async function responseGoogle(response) {
    console.log("Google Login", response);
    const { data } = await axios.post(isUser, {
      email: response.profileObj.email
    });
    if (data.status) {
      var newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: response.profileObj.email,
        role: data.role
      };
      props.auth.setUserInfo(newUser);
      window.location = "/admin";
    } else {
      alert("User doesnt exist");
    }
  }
  function onFailure(response) {
    console.log("Login Failesd", response);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="organization"
            label="Organization"
            name="organization"
            autoComplete="organization"
            autoFocus
            onChange={handleChange}
            value={values.organization || ""}
            type="text"
            error={errors.organization}
            helperText={errors.organization}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email || ""}
            type="text"
            error={errors.email}
            helperText={errors.email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={values.remember}
                onClick={handleChange}
                color="primary"
              />
            }
            // onClick={handleChange}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId="499483309789-7eocphv0g1s3mom1gaafrv32o9nmi6c8.apps.googleusercontent.com"
            buttonText="Sign In With Google"
            onSuccess={responseGoogle}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            render={renderProps => (
              <SocialLogin clickHandler={renderProps.onClick} />
            )}
          />
          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Failed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default withRouter(SignIn);
