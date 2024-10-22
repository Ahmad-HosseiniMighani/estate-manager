import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";


class SearchBoxHome extends Form {
  state = {
      data:{
        area: [],
        propertyType: [],
        propertyState: [],
        paymentType: [],
        roomCount: [],
        maxPrice: "",
        minPrice: "",
        foundationMax: "",
        foundationMin: "",
        p_id:""
      },
      errors: {},
    area_choices: [],
      propertyType_choices: [
        { name: "ویلایی", id: "0" },
        { name: "آپارتمان", id: "1" },
      ],
      paymentType_choices: [
        { name: "رهن", id: "0" },
        { name: "اجاره", id: "1" },
        { name: "فروش", id: "2" },
      ],
      propertyState_choices: [
        { name: "مسکونی", id: "0" },
        { name: "اداری", id: "1" },
        { name: "تجاری", id: "3" },
        { name: "انبار", id: "4" },
      ],
      roomCount_choices: [
        { name: "بدون خواب", id: "0" },
        { name: "تک خوابه", id: "1" },
        { name: "دو خوابه", id: "2" },
        { name: "بالای سه خواب", id: "3" },
      ],
  };

  schema={
    area: Joi.any(),
    propertyType: Joi.any(),
    propertyState: Joi.any(),
    paymentType: Joi.any(),
    roomCount: Joi.any(),
    p_id: Joi.string().allow(''),
    maxPrice: Joi.string()
    .label("حداکثر قیمت")
    .regex(/^[0-9]+$/, "عدد").allow('')
    .error((errors) => this.ErrorsLang(errors)),
    minPrice: Joi.string()
    .label("حداقل قیمت")
    .regex(/^[0-9]+$/, "عدد").allow('')
    .error((errors) => this.ErrorsLang(errors)),
    foundationMax: Joi.string()
    .label("حداکثر زیربنا")
    .regex(/^[0-9]+$/, "عدد").allow('')
    .error((errors) => this.ErrorsLang(errors)),
    foundationMin: Joi.string()
    .label("حداقل زیربنا")
    .regex(/^[0-9]+$/, "عدد").allow('')
    .error((errors) => this.ErrorsLang(errors)),
  }

  async componentDidMount(){
    try{
      const { data: { data: area_choices = [] } = {} } = await auth.getAllAreas();

      this.setState({area_choices});
    } catch (error) {
        toast.error("مشکلی در بروزرسانی لیست منطقه ها رخ داده است... لطفا صفحه را رفرش کنید.")
    }
  }

  doSubmit = () => {
    this.props.submitHandler(
      this.state.data
    )
  }

  render() {
    return (
        <section id="home-header">
        <div className="container" dir="rtl">
            <div className="row text-center home-header-title mb-4">
                <h4 className="fs-1 fw-bold pb-4 mb-5">ملک مورد نظر خود را در هرجای گرگان به ما بسپارید، چون ما خفنیم.</h4>
            </div>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                {this.renderInput(
                    "p_id",
                    "کد ملک",
                    "col-md-4",
                    "عدد"
                )}
                <div className="col-md-4">
                    {this.renderMultiSelect(
                    "area",
                    "منطقه",
                    "جستجو...",
                    this.state.area_choices,
                    "area_name"
                  )}
                </div>
                <div className="col-md-4">
                    {this.renderMultiSelect(
                    "propertyType",
                    "نوع ساختمان",
                    "جستجو...",
                    this.state.propertyType_choices
                  )}
                </div>
                <div className="col-md-4">
                    {this.renderMultiSelect(
                    "propertyState",
                    "نوع ملک",
                    "جستجو...",
                    this.state.propertyState_choices
                  )}
                </div>
                <div className="col-md-4">
                    {this.renderMultiSelect(
                    "paymentType",
                    "رهن / اجاره / فروش",
                    "جستجو...",
                    this.state.paymentType_choices
                  )}
                </div>
                <div className="col-md-4">
                    {this.renderMultiSelect(
                    "roomCount",
                    "تعداد اتاق",
                    "جستجو...",
                    this.state.roomCount_choices
                  )}
                </div>
                <div className="col-md-4">
                    <div className="row">
                        {this.renderInput(
                            "minPrice",
                            "حداقل قیمت",
                            "col-6",
                            "ریال"
                        )}
                        {this.renderInput(
                            "maxPrice",
                            "حداکثر قیمت",
                            "col-6",
                            "ریال"
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        {this.renderInput(
                            "foundationMin",
                            "حداقل زیربنا",
                            "col-6",
                            "مترمربع"
                        )}
                        {this.renderInput(
                            "foundationMax",
                            "حداکثر زیربنا",
                            "col-6",
                            "مترمربع"
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    {this.renderButton("اعمال","py-2 btn btn-primary")}
                </div>
                </form>
            </div>
    </section>
    );
  }
}

export default SearchBoxHome;
