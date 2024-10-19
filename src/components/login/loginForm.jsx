import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";
import Lds from './../common/lds';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .label("نام کاربری")
      .error((errors) => this.ErrorsLang(errors)),
    password: Joi.string()
      .required()
      .label("رمز عبور")
      .error((errors) => this.ErrorsLang(errors)),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
  
      window.location = process.env.PUBLIC_URL + "/";
    } catch (ex) {
      const errors = { ...this.state.errors };

      if (ex.response && (ex.response.status === 401 || ex.response.status === 400)) {
        errors.username = "نام کاربری یا رمزعبور اشتباه است";
      }

      this.setState({ errors });
    }
  };
  handleRedirect(){
    window.location = process.env.PUBLIC_URL;
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <div className="form-login">
        <div className="card col-lg-4 col-md-5 col-sm-7 col-10 mx-auto mt-5 px-5 pb-5">
        {isLoggedIn &&
          (<React.Fragment>
            {this.handleRedirect()}
              <Lds/>
          </React.Fragment>)
        }
        {!isLoggedIn &&(
          <React.Fragment>
            <h4 className="text-center text-muted py-3">ورود به پنل مدیریت</h4>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "نام کاربری")}
              {this.renderInput("password", "رمز عبور", "", "", "password")}
              <div className="text-center pt-4">
                {this.renderButton("ورود", "mt-3 btn btn-primary")}
              </div>
            </form>
            {/* <Link
              className="text-center text-muted small mt-3"
              to="/forgot-password"
            >
              رمز عبورم را فراموش کردم
            </Link> */}
          </React.Fragment>
        )}
        </div>
      </div>
    );
  }
}

export default LoginForm;
