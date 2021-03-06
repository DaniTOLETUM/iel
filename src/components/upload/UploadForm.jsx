import React, { Component } from "react";
import { createCourse } from "../../api/coursesHandler";
import { getAllCategories } from "../../api/categoryHandler";
import { uploadImage } from "../../services/imageUploadAPI";
import InputFile from "../InputFile";
import Dropdown from "../RealDropDown";
import SidePanel from "../../pages/components/CourseSidePanel";
import { Heading } from "react-bulma-components";
import { getLocalToken } from "../../api/ajaxLogin.js";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import { faPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default class uploadForm extends Component {
  state = {
    title: "",
    description: "",
    video: "",
    image: "",
    category: [],
    categories: [],
    selectedCategory: {},
    submitted: false,
    courseModules: []
  };

  componentDidMount() {
    getAllCategories()
      .then(res => {
        this.setState({
          categories: res.data,
          selectedCategory: res.data[0]
        });
      })
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    this.setState({ submitted: false });
  }

  notifyError = message =>
    toast(message, {
      type: toast.TYPE.WARNING
    });

  handleImage = file => {
    this.setState({
      imgFileList: file,
      imageName: file[0].name
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userToken = getLocalToken();
    try {
      uploadImage(this.state.imgFileList).then(res => {
        this.setState({
          image: res.data.results[0].secure_url
        });
        createCourse({
          teacher: userToken._id,
          title: this.state.title,
          description: this.state.description,
          category: [this.state.selectedCategory._id],
          media: {
            video: this.state.video,
            image: this.state.image
          }
        })
          .then(res => {
            console.log("We go to the course page");
            // <Redirect to="/coursemanagement" />;
            this.setState({ submitted: true });
          })
          .catch(err => console.error(err));
      });
    } catch (err) {
      this.notifyError("Be sure to upload an image !");
    }
  };

  onChange = ({ currentTarget }) => {
    this.setState({
      [currentTarget.name]: currentTarget.value
    });
  };

  handleCategory = category => {
    this.setState({
      selectedCategory: category
    });
  };

  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/build-course" />;
    }
    const { onSubmit, onChange } = this;
    const { title, selectedCategory, categories, description } = this.state;

    return (
      <React.Fragment>
        <SidePanel
          firstNavItem="My Courses"
          firstNavItemIcon={faSignInAlt}
          firstNavItemLink="/profile"
          secondNavItem="Build Course"
          secondNavItemIcon={faPlus}
          secondNavItemLink="/build-course"
          thirdNavItem="Create Lessons"
          thirdNavItemIcon={faPlus}
          thirdNavItemLink="/create/lesson"
          fourthNavItem="Create Course"
          fourthNavItemIcon={faPlus}
          fourthNavItemLink="/create-course"
          fifthNavItem="Edit Lessons"
          fifthNavItemIcon={faPlus}
          fifthNavItemLink="/edit-lesson"
          sixthNavItem="Manage Courses"
          sixthNavItemIcon={faPlus}
          sixthNavItemLink="/coursemanagement"
          courseModules={this.state.courseModules}
        />
        <section className="login-register-section">
          <Heading className="has-text-centered	">Upload Course</Heading>
          <form className="register-form box shadow" onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={onChange}
              className="input"
              placeholder="input your title here..."
              name="title"
              type="text"
            />
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={onChange}
              className="input"
              placeholder="input your description here..."
              name="description"
              type="text"
            />

            <Dropdown
              handleSelect={this.handleCategory}
              key={title}
              data={categories}
              currentItem={!selectedCategory ? "Categories" : selectedCategory}
              name={!selectedCategory ? "Categories" : selectedCategory}
              label="Category"
            />
            <InputFile
              handleImage={this.handleImage}
              name={
                !this.state.imageName ? "upload image" : this.state.imageName
              }
            />

            <button
              className="button is-primary  is-focused"
              onClick={this.onClick}
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </section>
      </React.Fragment>
    );
  }
}
