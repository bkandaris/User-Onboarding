import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const FormData = ({ values, touched, handleChange, errors, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <Field
          type="text"
          name="username"
          placeholder="Your Name"
          value={values.username}
          onChange={handleChange}
        />
        {touched.username && errors.username && <p>{errors.username}</p>}
        <br />
        <Field
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <br />
        <Field
          type="text"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <br />
        <label>
          Accept Terms of Service
          <Field
            type="checkbox"
            name="terms"
            // value={values.terms}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
      {users.map(item => (
        <div key={item.id}>
          <p>Username: {item.username} </p>
          <p>Password: {item.password}</p>
          <p>E-mail: {item.email}</p>
        </div>
      ))}
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ username, email, password, terms }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      terms: terms || true
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("What is your Username?"),
    email: Yup.string().required("What is your e-mail?"),
    password: Yup.string().required("Password Required"),
    terms: Yup.boolean()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        // console.log(`Our data:`, res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
})(FormData);

export default FormikForm;
