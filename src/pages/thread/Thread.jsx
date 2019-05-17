import React, { Component } from "react";
import Post from "./Post";
import PostInput from "./PostInput";
import "./thread.css";
class Thread extends Component {
  state = {
    postMessage: ""
  };

  componentDidMount() {}

  handleChange = ({ currentTarget }) => {
    const key = currentTarget.name;
    const value = currentTarget.value;
    this.setState({ [key]: value });
  };
  handleKeyDown = ({ key }) => {
    if (key === "Enter") this.sendPost();
  };
  sendPost = () => {
    this.setState({ postMessage: "" });
  };
  render() {
    return (
      <section className="thread-section">
        <h1 className="title">Threads</h1>
        <div className="post-message column is-5">
          <Post />
        </div>
        <div className="post-send column is-6 is-centered">
          <PostInput
            handleKeyDown={this.handleKeyDown}
            value={this.state.postMessage}
            name="postMessage"
            handleChange={this.handleChange}
          />
        </div>
      </section>
    );
  }
}

export default Thread;
