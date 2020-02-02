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
import { isUser, updateUserUrl } from "../../config/all.js";
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
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function Reset(props) {
  const classes = useStyles();
  console.log("props", props);
  const { values, handleChange, handleSubmit } = useForm(loginUser, validate);
  const isReset = props.match.params.email;
  if (isReset) {
    values.email = props.match.params.email;
    values.organization = props.match.params.organization;
  }
  //console.log("props", props);
  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    return errors;
  }
  async function loginUser() {
    // console.log(props);

    console.log(values);
    const { data } = await axios.post(isUser, {
      email: values.email,
      organization: values.organization
    });
    if (data.status) {
      props.match.params.email = values.email;
      props.match.params.organization = values.organization;
      window.location = `/reset/${values.organization}/${values.email}`;
    }
  }
  async function onReset() {
    console.log(values);

    const { data } = await axios.put(updateUserUrl, {
      email: values.email,
      password: values.password
    });
    if (data) {
      props.auth.setUserInfo(data, values.remember);
      window.location = "/login";
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {!isReset && (
            <div>
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
                value={values.email}
                type="text"
              />
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
                value={values.organization}
                type="text"
              />
            </div>
          )}
          {isReset && (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                disabled
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={values.email}
                type="text"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                disabled
                fullWidth
                id="organization"
                label="Organization"
                name="organization"
                autoComplete="organization"
                autoFocus
                onChange={handleChange}
                value={values.organization}
                type="text"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={handleChange}
                value={values.password}
                type="password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                autoFocus
                onChange={handleChange}
                value={values.confirmPassword}
                type="password"
              />
            </div>
          )}
          {isReset ? (
            <div>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onReset}
              >
                Reset Password
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Continue
              </Button>
            </div>
          )}
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

export default withRouter(Reset);
