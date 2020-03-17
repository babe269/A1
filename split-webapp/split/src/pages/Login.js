import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import "../App.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";
import InputAdornment from "@material-ui/core/InputAdornment";
import mainLogo from "./split2.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const apiBaseUrl = process.env.REACT_APP_BACKEND_API;

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
      background: "white"
    }
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined
    };
  }
  handleOnChangeUser = event => {
    console.log("Click");
    this.state.username = event.target.value;
    console.log(this.state.username);
  };
  handleOnChangePassword = event => {
    console.log("Click");
    this.state.password = event.target.value;
    console.log(this.state.password);
  };

  createDetails() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("created user");
    this.Authenticate(user);
  }

  Authenticate(data) {
    fetch("/api/account/login:", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // If "this" is not called in the createBill method, you may have to create the function outside of the class (es-lint rule)
        this.setState({});
        return res;
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    const classes = this.props;
    return (
      <React.Fragment key="LoginKey">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={0}>
            <Container fixed justifyContent="center">
              <Container fixed>
                <Box
                  component="div"
                  borderRadius={12}
                  className="SignInContainer"
                >
                  <img
                    src={mainLogo}
                    style={{ width: "50%", marginTop: "10%" }}
                    alt="Main logo for login"
                  />
                  <Box component="div" className="InnerContainer">
                    <Typography component="h3" className="SignIn">
                      Sign In
                    </Typography>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="filled"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                        onChange={this.handleOnChangeUser}
                      />

                      <TextField
                        id="outlined-password-input"
                        type="password"
                        label="Password"
                        variant="filled"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKey />
                            </InputAdornment>
                          )
                        }}
                        onChange={this.handleOnChangePassword}
                      />
                    </form>

                    <Typography component="h3" className="LogIn">
                      <NavLink to="/home/transactions">
                        <Button
                          variant="contained"
                          color="primary"
                          borderRadius={30}
                          className={classes.margin}
                          onClick={() => {
                            this.createDetails();
                          }}
                        >
                          Log In
                        </Button>
                      </NavLink>

                      <NavLink to="/SignUp">
                        <Button
                          variant="contained"
                          color="primary"
                          borderRadius={30}
                          className={classes.margin}
                        >
                          Sign up
                        </Button>
                      </NavLink>
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Container>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Login);
