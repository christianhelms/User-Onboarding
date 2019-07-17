import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./login-form.css";

window.axios = axios;

function NewUserForm({ errors, touched, isSubmitting }) {
  // console.log(errors);
  console.log(isSubmitting);
  // console.log(touched);
  return (
    <Form className="login-form">
      <h2>Create User</h2>
      <div className="form-group">
        <label htmlFor="username">Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        <p className="error-text">{touched.Name && errors.Name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <Field
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          // defaultValue="doe"
        />
        <p className="error-text">{touched.Email && errors.Email}</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password </label>
        <Field autoComplete="off" type="text" id="password" name="password" />
        <p className="error-text">{touched.Password && errors.Password}</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">Terms of Service </label>
        <Field autoComplete="off" type="checkbox" id="terms" name="terms" />
        <p className="error-text">{touched.Terms && errors.Terms}</p>
      </div>
      {isSubmitting && <p>Loading...</p>}
      <button className="submit-button" disabled={isSubmitting}>
        Submit &rarr;
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      Name: "",
      Email: "",
      Password: "",
      Terms: false
    };
  },
  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log("FORM SUCCESSFULLY SUBMITTED");
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response.data);
      window.alert("Form submitted " + response.data.firstName);
      formikBag.setSubmitting(false);
    });
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(5, "Name should be at least 5 characters long")
      .max(10)
      .required("First Name is required"),
    email: Yup.string()
      .min(3)
      .max(10)
      .required(),
    password: Yup.string()
      .min(7, "The best passwords have symbols(^%#!)")
      .max(15)
      .required(),
    terms: Yup.bool().required(),
  })
})(NewUserForm);
