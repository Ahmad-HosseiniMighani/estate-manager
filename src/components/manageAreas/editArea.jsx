import React from "react";
import { toast } from "react-toastify";
import Lds from "../common/lds";
import auth from "../../services/authService";
import Joi from "joi-browser";
import Form from "../common/form";

class EditArea extends Form {
  state = {
    data: {
      area_name: "",
    },
    errors: {},
    id: "",
    IsRequestDone: false,
  };

  schema = {
    area_name: Joi.string()
      .required()
      .label("منطقه")
      .error((errors) => this.ErrorsLang(errors)),
  };

  componentDidMount() {
    const data = {
      area_name: this.props.match.params.name,
    };

    this.setState({
      data,
      id: this.props.match.params.id,
      IsRequestDone: true,
    });
  }
  doSubmit = async () => {
    const { data, id } = this.state;

    try {
      const res = await auth.editArea(data, id);
      if (res.status == 404) {
        toast.error("منتطقه مورد نظر یافت نشد.");
      } else if (!(res.status == 200 || res.status == 201)) {
        throw res.message;
      } else {
        toast.success("تغییرات منتطقه مورد نظر ثبت شد.");
      }

      setTimeout(() => {
        window.location.replace("/manage-area");
      }, 3000);
    } catch (error) {
      toast.error(
        "تغییرات منتطقه مورد نظر ثبت نشد. لطفا ورودی های خود را چک کنید."
      );
    }
  };
  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) window.location = process.env.PUBLIC_URL + "/";

    return (
      <section id="area-management" dir="rtl">
        {isLoggedIn && (
          <div className="card col-lg-8 col-10 col-md-9 mx-auto property-photo-container shadow pt-5 pb-4 px-5">
            <div className="card-body">
              <form className="row  mb-4" onSubmit={this.handleSubmit}>
                {this.renderInput(
                  "area_name",
                  "منطقه",
                  "col-11 col-md-6 my-2",
                  "نام منطقه را وارد کنید..."
                )}
                <div className="col-11 col-md-6 my-2 d-flex align-items-end">
                  {this.renderButton("ثبت منطقه", "py-2 btn btn-success")}
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default EditArea;
