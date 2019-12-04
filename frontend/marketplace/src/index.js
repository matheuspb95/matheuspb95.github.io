import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch } from "react-router-dom";
import './index.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Album from './Album';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

var hist = createBrowserHistory();

var indexRoutes = [
    { path: "/login", name: "SignIn", component: SignIn },
    { path: "/register", name: "SignUp", component: SignUp },
    { path: "/home", name: "Home", component: Album },
    { path: "/", name: "SignIn", component: SignIn },
];

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#9ccc65',
      },
      secondary: lightBlue,
    },
  });

ReactDom.render(
    <ThemeProvider theme={theme}>
    <HashRouter basename={''} history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
    </HashRouter>

    </ThemeProvider>,
    document.getElementById("root")
  );