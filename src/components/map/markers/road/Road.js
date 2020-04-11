import React from "react";

class Road extends React.Component {
  render() {
    return (
      <div>
        <p>From: {this.props.from}</p>
        <p>To: {this.props.to}</p>
        <p>Duration: {this.props.duration}</p>
      </div>
    );
  }
}

export default Road;
