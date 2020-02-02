import React, { useState } from "react";
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
import validate from "./loginFormValidation";
import { registerationUrl } from "../../config/all.js";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {
  console.log("SIgn up ", props);
  const classes = useStyles();
  const { fromAdmin } = props;
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    validate
  );

  async function onSubmit() {
    console.log("On Submit", values);
    const { data } = await axios.post(registerationUrl, {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      organization: !fromAdmin
        ? values.organization
        : props.auth.getUserInfo().organization,
      role: fromAdmin && values.remember === "true" ? "Admin" : "User"
    });
    if (data && !fromAdmin) {
      //props.auth.setUserInfo(data, false);
      window.location = "/login";
    }
    if (data && fromAdmin && props.onAdd) {
      props.onAdd();
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {!fromAdmin && (
          <div>
            {" "}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </div>
        )}

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {!fromAdmin && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="organization"
                  label="Organization"
                  name="organization"
                  autoComplete="organization"
                  onChange={handleChange}
                  value={values.organization}
                  error={errors.organization}
                  helperText={errors.organization}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            {fromAdmin && (
              <div>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        value={values.remember}
                        onClick={handleChange}
                        color="primary"
                      />
                    }
                    label="Is Admin ?"
                  />
                </Grid>
              </div>
            )}
          </Grid>
          {fromAdmin ? (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add User
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
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </div>
          )}
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
export default withRouter(SignUp);
