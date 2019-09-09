import React from "react";
import { withRouter, Route } from "react-router-dom";
import routes from "./routes";

// https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1
class EnsureLoggedInContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isLoginValid: false
    };
  }
  async componentDidMount() {
    const loginCheck = await this.init();
    this.setState({
      loading: false,
      isLoginValid: loginCheck
    });
    if (!loginCheck) {
      this.props.history.replace("/login");
    }
  }

  async init() {
    // Get saved data from sessionStorage
    let savedSession = await sessionStorage.getItem("foodishSession");
    console.log(typeof savedSession !== "undefined" && savedSession !== null);
    if (typeof savedSession !== "undefined" && savedSession !== null) return true;
    return false;
  }

  renderRoutes() {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={props => {
          return (
            <route.layout {...props}>
              <route.component {...props} />
            </route.layout>
          );
        }}
        // component={withTracker(props => {
        //   return (
        //     <route.layout {...props}>
        //       <route.component {...props} />
        //     </route.layout>
        //   );
        // })}
      />
    ));
  }

  render() {
    if (this.state.isLoginValid) {
      return this.renderRoutes();
    } else {
      return null;
    }
  }
}

export default withRouter(EnsureLoggedInContainer);
