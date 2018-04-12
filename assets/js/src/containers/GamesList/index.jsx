import React from "react";
import Placeholder from "../../components/Placeholder";
import { connect } from "react-redux";

class GamesList extends React.Component {
  render() {
    return <Placeholder name="Games list page" />;
  }
}

const mapStateToProps = () => {};

export default connect(mapStateToProps)(GamesList);
