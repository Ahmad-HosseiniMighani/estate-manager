import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from "react-toastify";
import ReactImageUploading from "react-images-uploading";
import auth from "../../services/authService";
import Lds from "../common/lds";

class AddProperty extends Form {
  state = {
    data: {
      address: "",
      postal_code: "",
      foundation: "",
      room_count: "",
      rent: "",
      floor_count: "",
      unit_per_floor: "",
      age_of_building: "",
      payment_type: "رهن",
      building_type: "ویلایی",
      owner_name: "",
      floor_cover: "",
      view_of_building: "",
      property_state: "مسکونی",
      entry_type: "",
      price: "",
      kitchen: "",
      parking: false,
      elevator: false,
      sauna: false,
      pool: false,
      lobby: false,
      guardian: false,
      warehouse: false,
      balcony: false,
      patio: false,
      jacuzzi: false,
      hall: false,
      communities: false,
      air_conditioner: false,
      radiator: false,
      fan: false,
      coel: false,
      package_feature: false,
      chiller: false,
      split: false,
      heater: false,
      thumbnail: "",
      areas: [],
    },
    thumbnail: "",
    images: [],
    area_choices: [],
    boolanProperty_choics: [
      { key: "parking", name: "پارکینگ" },
      { key: "elevator", name: "آسانسور" },
      { key: "sauna", name: "سونا" },
      { key: "pool", name: "استخر" },
      { key: "lobby", name: "لابی" },
      { key: "guardian", name: "نگهبان" },
      { key: "warehouse", name: "انبار" },
      { key: "balcony", name: "بالکن" },
      { key: "patio", name: "پاتیو" },
      { key: "jacuzzi", name: "جکوزی" },
      { key: "hall", name: "هال" },
      { key: "communities", name: "سیستم ارتباطات" },
      { key: "air_conditioner", name: "تهویه هوا" },
      { key: "radiator", name: "رادیاتور" },
      { key: "fan", name: "پنکه" },
      { key: "coel", name: "کوئل" },
      { key: "package_feature", name: "پکیج" },
      { key: "chiller", name: "خنک کننده" },
      { key: "split", name: "اسپیلت" },
      { key: "heater", name: "سیستم گرمایشی" },
    ],
    building_type_choices: [
      { name: "ویلایی", _id: "ویلایی" },
      { name: "آپارتمان", _id: "آپارتمان" },
    ],
    payment_type_choices: [
      { name: "رهن", _id: "رهن" },
      { name: "اجاره", _id: "اجاره" },
      { name: "فروش", _id: "فروش" },
    ],
    property_state_choices: [
      { name: "مسکونی", _id: "مسکونی" },
      { name: "اداری", _id: "اداری" },
      { name: "تجاری", _id: "تجاری" },
      { name: "انبار", _id: "انبار" },
    ],
    errors: {},
  };
  schema = {
    address: Joi.string()
      .required()
      .label("آدرس ملک")
      .error((errors) => this.ErrorsLang(errors)),
    postal_code: Joi.string()
      .required()
      .label("کدپستی ملک")
      .regex(/^[0-9]+$/, "عدد")
      .min(10)
      .max(10)
      .error((errors) => this.ErrorsLang(errors)),
    foundation: Joi.string()
      .required()
      .label("زیربنا")
      .regex(/^[0-9]+$/, "عدد")
      .min(1)
      .error((errors) => this.ErrorsLang(errors)),
    room_count: Joi.string()
      .label("تعداد اتاق")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    rent: Joi.string()
      .label("اجاره")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    floor_count: Joi.string()
      .required()
      .label("تعداد طبقات")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    unit_per_floor: Joi.string()
      .required()
      .label("تعداد واحد در هر طبقه")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    age_of_building: Joi.string()
      .required()
      .label("سن بنا")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    payment_type: Joi.string()
      .required()
      .label("نوع فروش")
      .error((errors) => this.ErrorsLang(errors)),
    building_type: Joi.string()
      .required()
      .label("نوع ملک")
      .error((errors) => this.ErrorsLang(errors)),
    owner_name: Joi.string()
      .required()
      .label("نام مالک")
      .error((errors) => this.ErrorsLang(errors)),
    floor_cover: Joi.string()
      .required()
      .label("کفپوش")
      .error((errors) => this.ErrorsLang(errors)),
    view_of_building: Joi.string()
      .required()
      .label("نمای ساختمان")
      .error((errors) => this.ErrorsLang(errors)),
    property_state: Joi.string()
      .required()
      .label("شرایط ساختمان")
      .error((errors) => this.ErrorsLang(errors)),
    entry_type: Joi.string()
      .required()
      .label("نوع ورودی")
      .error((errors) => this.ErrorsLang(errors)),
    price: Joi.string()
      .required()
      .min(1)
      .label("قیمت")
      .regex(/^[0-9]+$/, "عدد")
      .error((errors) => this.ErrorsLang(errors)),
    kitchen: Joi.string()
      .required()
      .label("آشپزخانه")
      .error((errors) => this.ErrorsLang(errors)),
    // images: Joi.any(),
    thumbnail: Joi.any(),
    areas: Joi.any(),
    building_type: Joi.any(),
    property_state: Joi.any(),
    payment_type: Joi.any(),
    parking: Joi.any(),
    elevator: Joi.any(),
    sauna: Joi.any(),
    pool: Joi.any(),
    lobby: Joi.any(),
    guardian: Joi.any(),
    warehouse: Joi.any(),
    balcony: Joi.any(),
    patio: Joi.any(),
    jacuzzi: Joi.any(),
    hall: Joi.any(),
    communities: Joi.any(),
    air_conditioner: Joi.any(),
    radiator: Joi.any(),
    fan: Joi.any(),
    coel: Joi.any(),
    package_feature: Joi.any(),
    chiller: Joi.any(),
    split: Joi.any(),
    heater: Joi.any(),
  };
  async componentDidMount() {
    try {
      const { data: { data: area_choices = [] } = {} } = await auth.getAllAreas();

      this.setState({area_choices});
    } catch (error) {
      toast.error(
        "مشکلی در بروزرسانی لیست منطقه ها رخ داده است... لطفا صفحه را رفرش کنید."
      );
    }
  }
  onChangeThumbnail = async (thumbnail, addUpdateIndex) => {
    if (addUpdateIndex === undefined) {
      let { thumbnail } = { ...this.state };
      thumbnail = [];
      this.setState({ thumbnail });
    } else {
      this.setState({ thumbnail });
      thumbnail[0] = await this.handleUploadImage(thumbnail[0]);
      this.setState({ thumbnail });
    }
  };
  onChangeImages = async (imageList, addUpdateIndex) => {
    if (addUpdateIndex === undefined) {
      let { images } = { ...this.state };
      for (let i = 0; i < images.length; i++) {
        if (imageList.indexOf(images[i]) == -1) images[i] = "Deleted";
      }
      this.setState({ images });
    } else {
      this.setState({ images: imageList });
      // console.log(imageList.length-addUpdateIndex.length)
      for (
        let i = imageList.length - addUpdateIndex.length;
        i < imageList.length;
        i++
      ) {
        imageList[i] = await this.handleUploadImage(imageList[i]);
        // console.log(imageList[i])
        this.setState({ images: imageList });
      }
    }
  };
  async handleUploadImage(data) {
    try {
      const res = await auth.uploadImage(data.file);
      // console.log(res)
      if (res.status_code !== 200) throw "upload Failled";
      data.uploadinfo = res.message;
      // console.log(res.message)
      data.uploadStatus = "Successfull";
      return data;
    } catch (error) {
      toast.error(
        "مشکلی در ارتباط با سرور پیش آمد و عکس آپلود نشد. از فرمت فایل مورد نظر مطمئن باشید."
      );
      data.uploadStatus = "Failled";
      return data;
    }
  }
  handleBooleanPropetyOnClick = (item) => {
    const data = { ...this.state.data };
    data[item.key] = !data[item.key];
    this.setState({ data });
  };
  handleBooleanProperty(value) {
    return value
      ? "col-11 col-md-5 py-3 my-2 mx-auto boolean-property shadow-sm text-center text-success"
      : "col-11 col-md-5 py-3 my-2 mx-auto boolean-property shadow-sm text-center text-danger";
  }
  handleBooleanPropertyIcon(value) {
    return value ? (
      <i className="fas fa-check ms-2"></i>
    ) : (
      <i className="fas fa-times ms-2"></i>
    );
  }
  doSubmit = async () => {
    const { data, images, thumbnail } = this.state;
		// console.log('>>> data:', data);
		// return;

    const tempImages = [];
    const { areas = [] } = data || {};
    const areasDocId = areas.map(({ documentId }) => documentId);
    // const tempAreas = [];

    // for (let i = 0; i < data.areas.length; i++) {
    //   tempAreas.push(data.areas[i].id);
    // }

    // console.log(tempAreas)
    // delete data.areas;
    data.areas = { connect: areasDocId }

    try {
      for (let i = 0; i < images.length; i++) {
        if (images[i].uploadinfo !== undefined) {
          tempImages.push(images[i].uploadinfo.id);
        }
      }

      if (thumbnail[0] !== undefined && thumbnail[0].uploadinfo !== undefined) {
        data.thumbnail = thumbnail[0].uploadinfo.url;
      }

      console.log('>>> data', data);
      console.log('>>> tempImages', tempImages);
      console.log('>>> areasDocId', areasDocId);
      const res = await auth.addProperty(data, tempImages, areasDocId);

      if (res.status_code !== 200) {
        throw res.message;
      }

      // window.location.replace("/propery/" + res.message);
    } catch (error) {
      console.log(error);
      toast.error("ملک مورد نظر ثبت نشد. لطفا ورودی های خود را چک کنید.");
    }
  };

  render() {
    const { images, thumbnail, boolanProperty_choics, data } = this.state;
    // const { isLoggedIn } = this.props;
    const isLoggedIn = true;
    // if (!isLoggedIn) window.location = process.env.PUBLIC_URL + "/";
    return (
      <section id="add-property">
        {isLoggedIn && (
          <div className="container py-5">
            <div className="row">
              <React.Fragment>
                <div className="col-lg-8 col-10 col-md-9 mx-auto mx-auto property-properties-container shadow py-4 mt-3">
                  <div className="row">
                    <h3 className="text-center mt-3 mb-5">
                      <i className="fas fa-home"></i> افزودن ملک جدید
                    </h3>
                    <form className="row" onSubmit={this.handleSubmit}>
                      {this.renderInput(
                        "postal_code",
                        "کدپستی",
                        "col-11 col-md-5 my-2 mx-auto",
                        "کدپستی را وارد کنید..."
                      )}
                      {this.renderInput(
                        "foundation",
                        "زیربنا (مترمربع)",
                        "col-11 col-md-5 my-2 mx-auto",
                        "زیربنا را وارد کنید..."
                      )}
                      {this.renderInput(
                        "rent",
                        "اجاره (ریال)",
                        "col-11 col-md-5 my-2 mx-auto",
                        "اجاره را وارد کنید..."
                      )}
                      {this.renderInput(
                        "price",
                        "قیمت (ریال)",
                        "col-11 col-md-5 my-2 mx-auto",
                        "قیمت را وارد کنید..."
                      )}
                      {this.renderInput(
                        "room_count",
                        "تعداد اتاق",
                        "col-11 col-md-5 my-2 mx-auto",
                        "تعداد اتاق را وارد کنید..."
                      )}
                      {this.renderInput(
                        "floor_count",
                        "تعداد طبقات",
                        "col-11 col-md-5 my-2 mx-auto",
                        "تعداد طبقات را وارد کنید..."
                      )}
                      {this.renderInput(
                        "unit_per_floor",
                        "تعداد واحد در هر طبقه",
                        "col-11 col-md-5 my-2 mx-auto",
                        "تعداد واحد در هر طبقه را وارد کنید..."
                      )}
                      {this.renderInput(
                        "age_of_building",
                        "سن بنا (سال)",
                        "col-11 col-md-5 my-2 mx-auto",
                        "سن بنا را وارد کنید..."
                      )}
                      {this.renderSelect(
                        "payment_type",
                        "رهن / اجاره / فروش",
                        this.state.payment_type_choices,
                        "col-11 col-md-5 my-2 mx-auto"
                      )}
                      {this.renderSelect(
                        "building_type",
                        "نوع ساختمان",
                        this.state.building_type_choices,
                        "col-11 col-md-5 my-2 mx-auto"
                      )}
                      {this.renderInput(
                        "owner_name",
                        "نام مالک",
                        "col-11 col-md-5 my-2 mx-auto",
                        "نام مالک را وارد کنید..."
                      )}
                      {this.renderInput(
                        "floor_cover",
                        "کفپوش",
                        "col-11 col-md-5 my-2 mx-auto",
                        "کفپوش را وارد کنید..."
                      )}
                      {this.renderInput(
                        "view_of_building",
                        "نمای ساختمان",
                        "col-11 col-md-5 my-2 mx-auto",
                        "نمای ساختمان را وارد کنید..."
                      )}
                      {this.renderSelect(
                        "property_state",
                        "نوع ملک",
                        this.state.property_state_choices,
                        "col-11 col-md-5 my-2 mx-auto"
                      )}
                      {this.renderInput(
                        "entry_type",
                        "نوع ورودی",
                        "col-11 col-md-5 my-2 mx-auto",
                        "نوع ورودی را وارد کنید..."
                      )}
                      {this.renderInput(
                        "kitchen",
                        "آشپزخانه",
                        "col-11 col-md-5 my-2 mx-auto",
                        "آشپزخانه را وارد کنید..."
                      )}
                      {this.renderInput(
                        "address",
                        "آدرس",
                        "col-11 col-md-5 my-2 mx-auto",
                        "آدرس را وارد کنید..."
                      )}
                      <div className="col-11 col-md-5 my-2 mx-auto">
                        {this.renderMultiSelect(
                          "areas",
                          "منطقه",
                          "جستجو...",
                          this.state.area_choices,
                          "area_name"
                        )}
                      </div>
                      {boolanProperty_choics.map(
                        (item, index) =>
                          index % 2 == 0 && (
                            <div className="col-11 col-md-5 px-0 mx-auto justify-content-between">
                              <div className="row">
                                <div
                                  className={this.handleBooleanProperty(
                                    data[item.key]
                                  )}
                                  key={item.key}
                                  onClick={() =>
                                    this.handleBooleanPropetyOnClick(item)
                                  }
                                >
                                  {this.handleBooleanPropertyIcon(
                                    data[item.key]
                                  )}
                                  <span>{item.name}</span>
                                </div>
                                <div
                                  className={this.handleBooleanProperty(
                                    data[boolanProperty_choics[index + 1].key]
                                  )}
                                  key={boolanProperty_choics[index + 1].key}
                                  onClick={() =>
                                    this.handleBooleanPropetyOnClick(
                                      boolanProperty_choics[index + 1]
                                    )
                                  }
                                >
                                  {this.handleBooleanPropertyIcon(
                                    data[boolanProperty_choics[index + 1].key]
                                  )}
                                  <span>
                                    {boolanProperty_choics[index + 1].name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                      <ReactImageUploading
                        value={thumbnail}
                        onChange={this.onChangeThumbnail}
                        maxNumber={10}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          <div className="upload__image-wrapper col-11 my-2 mx-auto">
                            <label className="mb-2">
                              بارگزاری تصویر بندانگشتی ملک
                            </label>
                            <span
                              className="d-flex justify-content-center align-items-center fw-bold drag-n-drop"
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              <i className="fas fa-cloud-upload-alt ps-2"></i>
                              کلیک کنید یا عکس را داخل کادر بکشید.
                            </span>

                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                            <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
                              {imageList.map(
                                (image, index) =>
                                  image !== "Deleted" && (
                                    <div
                                      className={
                                        image.uploadStatus
                                          ? "col " + image.uploadStatus
                                          : "col div-uploading"
                                      }
                                    >
                                      <div
                                        key={index}
                                        className="image-item card"
                                      >
                                        {!image.uploadStatus && (
                                          <div class="uploading">
                                            <Lds />
                                          </div>
                                        )}
                                        <img
                                          src={image["data_url"]}
                                          alt=""
                                          className="card-img-top"
                                        />
                                        <div className="image-item__btn-wrapper card-body text-center">
                                          {/* <span className="p-2" onClick={() => onImageUpdate(index)}><i className="fas fa-edit"></i></span> */}
                                          <span
                                            className="p-2"
                                            onClick={() => onImageRemove(index)}
                                          >
                                            <i className="fas fa-trash-alt"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </ReactImageUploading>
                      <ReactImageUploading
                        multiple
                        value={images}
                        onChange={this.onChangeImages}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          <div className="upload__image-wrapper col-11 my-2 mx-auto">
                            <label className="mb-2">بارگزاری تصاویر ملک</label>
                            <span
                              className="d-flex justify-content-center align-items-center fw-bold drag-n-drop"
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              <i className="fas fa-cloud-upload-alt ps-2"></i>
                              کلیک کنید یا عکس را داخل کادر بکشید.
                            </span>
                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                            <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
                              {imageList.map(
                                (image, index) =>
                                  image !== "Deleted" && (
                                    <div
                                      className={
                                        image.uploadStatus
                                          ? "col " + image.uploadStatus
                                          : "col div-uploading"
                                      }
                                    >
                                      <div
                                        key={index}
                                        className="image-item card"
                                      >
                                        {!image.uploadStatus && (
                                          <div class="uploading">
                                            <Lds />
                                          </div>
                                        )}
                                        <img
                                          src={image["data_url"]}
                                          alt=""
                                          className="card-img-top"
                                        />
                                        <div className="image-item__btn-wrapper card-body text-center">
                                          {/* <span className="p-2" onClick={() => onImageUpdate(index)}><i className="fas fa-edit"></i></span> */}
                                          <span
                                            className="p-2"
                                            onClick={() => onImageRemove(index)}
                                          >
                                            <i className="fas fa-trash-alt"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </ReactImageUploading>
                      <div className="d-flex justify-content-center mt-5">
                        {this.renderButton("ثبت ملک", "py-2 btn btn-success")}
                      </div>
                    </form>
                  </div>
                </div>
              </React.Fragment>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default AddProperty;
