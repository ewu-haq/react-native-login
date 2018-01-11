import React, { Component } from "react";
import { AppNavigator } from "./AppNavigator";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
