import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import "../../../../styles/common.css";
import "../../../../styles/login.css";
import "../../../../../src/_metronic/layout/components/Input/InputField.jsx";
import {
  useLogin,
  useUserByToken,
} from "../../../../hooks/queries/Dashboard.js";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "cy2001435@gmail.com",
  password: "password",
};
// const initialValues = {
//   email: "admin@demo.com",
//   password: "demo",
// };

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: loginSchema,
  //   onSubmit: async (values, { setStatus, setSubmitting }) => {
  //     setLoading(true);
  //     try {
  //       const { data: auth } = await login(values.email, values.password);
  //       saveAuth(auth);
  //       const { data: user } = await getUserByToken(auth.api_token);
  //       setCurrentUser(user);
  //     } catch (error) {
  //       console.error(error);
  //       saveAuth(undefined);
  //       setStatus("The login details are incorrect");
  //       setSubmitting(false);
  //       setLoading(false);
  //     }
  //   },
  // });
  const { mutateAsync: login, isLoading: loginLoding } = useLogin();
  const { mutateAsync: userByToken, isLoading: userByTokenLoding } =
    useUserByToken();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        const authResponse = await login(payload);
        const auth = authResponse.data; // Access data property or handle undefined

        saveAuth(auth);
        if (auth?.api_token) {
          const payload = {
            api_token: auth?.api_token,
          };
          const userResponse = (await userByToken(payload)) as any;
          const user = userResponse?.data; // Access data property or handle undefined
          setCurrentUser(user);
        }
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The login details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="d-flex flex-column flex-root"
      id="kt_app_root"
    >
      {/* <style>body { background-image: url('assets/media/auth/bg10.jpeg'); } [data-bs-theme="dark"] body { background-image: url('assets/media/auth/bg10-dark.jpeg'); }</style> */}

      {/* flex-column flex-lg-row flex-column-fluid */}
      <div className="d-flex flex-column flex-lg-row">
        <div className="d-flex flex-lg-row-fluid">
          <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
            <h1 className=" fs-2qx fw-bold text-center mb-7 green">
              Strategy Analyser
            </h1>
            <img
              src={toAbsoluteUrl("media/login-page-image/login.png")}
              className="h-200px"
              alt=""
            />
          </div>
        </div>

        <div className="d-flex flex-column-fluid justify-content-center p-12">
          <div>
            <div className="bg-body d-flex flex-column flex-center rounded-4 w-100 w-md-500px p-10 login-card mt-4 ">
              <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-100 w-md-400px ">
                {/* pb-15 pb-lg-20 */}
                <div className="d-flex flex-center flex-column flex-column-fluid ms-5">
                  <form
                    className="form w-100"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    id="kt_login_signin_form"
                  >
                    <div className=" mb-11">
                      <h1 className="login-header black-Charcoal mb-3">
                        Login Now for Insights
                      </h1>
                      <span className="Details gray">
                        Enter your Login Details and Enjoy Trading
                      </span>
                    </div>
                    <div className="fv-row mb-8">
                      <div className="fv-row mb-11">
                        <div className="position-relative">
                          <div className="form-input w-100">
                            <input
                              className="w-100"
                              type="email"
                              placeholder="Enter User ID"
                              {...formik.getFieldProps("email")}
                              autoComplete="off"
                            />
                            <label
                              style={{ fontWeight: "400", color: " #969ba1" }}
                            >
                              Enter User ID
                            </label>
                          </div>
                          {formik.touched.email && formik.errors.email && (
                            <div className="fv-plugins-message-container">
                              <span role="alert">{formik.errors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="fv-row mb-3">
                      <div className="fv-row mb-3">
                        <div className="position-relative w-100">
                          <div className="form-input">
                            <input
                              className="w-100"
                              type="password"
                              placeholder="Enter User ID"
                              {...formik.getFieldProps("password")}
                              autoComplete="off"
                            />
                            <label
                              style={{ fontWeight: "400", color: " #969ba1" }}
                            >
                              Enter Password
                            </label>
                          </div>
                          {formik.touched.email && formik.errors.email && (
                            <div className="fv-plugins-message-container">
                              <span role="alert">{formik.errors.email}</span>
                            </div>
                          )}
                        </div>

                        {formik.touched.password && formik.errors.password && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.password}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-grid mt-20 pt-20">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn login-btn white"
                        disabled={formik.isSubmitting || !formik.isValid}
                      >
                        {!loading && (
                          <span className="indicator-label">Login</span>
                        )}
                        {loading && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <p>
                Made with{" "}
                <i
                  className="bi bi-heart-fill"
                  style={{ color: "red", marginRight: "4px" }}
                ></i>
                in India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
