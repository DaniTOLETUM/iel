import React, { Component } from "react";
import { Heading } from "react-bulma-components";
import "./loginRegister.css";
import { createUser } from "../../api/userHandler";
import { Btn } from "../../components/Btn";
import { setLocalToken } from "../../api/ajaxLogin";
import _ from "lodash";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();

    createUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.firstName,
      password: this.state.password,
      password2: this.state.password2
    })
      .then(res => {
        // console.log(res.data);
        const user = _.pick(
          res.data,
          "avatar",
          "_id",
          "firstName",
          "lastName",
          "userName"
        );
        setLocalToken(user);
        this.props.history.push("/profile");
      })
      .catch(err => console.log(err.response));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state.firstName);
  };

  render() {
    const { firstName, lastName, email, password, password2 } = this.state;
    return (
      <section className="login-register-section">
        <Heading className="has-text-centered	">Register</Heading>
        <form className="register-form box" onSubmit={this.onSubmit}>
          <div className="control">
            <label htmlFor="firstName">First Name</label>
            <input
              value={firstName}
              onChange={this.onChange}
              className="input"
              placeholder="input your first name here..."
              name="firstName"
              type="text"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={this.onChange}
              className="input"
              placeholder="input your last name here..."
              name="lastName"
              type="text"
            />
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={this.onChange}
              className="input"
              placeholder="input your email here..."
              name="email"
              type="email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={this.onChange}
              className="input"
              placeholder="input your password here..."
              name="password"
              type="password"
            />
            <label htmlFor="password2">Password confirmation</label>
            <input
              value={password2}
              onChange={this.onChange}
              className="input"
              placeholder="input your password here..."
              name="password2"
              type="password"
            />
          </div>
          <button className="button is-primary  is-focused">Submit</button>
        </form>
        <p>You have an account?</p>
        <Btn className="is-small" name="Log in" toPage="login" />
      </section>
    );
  }
}
