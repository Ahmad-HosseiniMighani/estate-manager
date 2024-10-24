import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from "react-toastify";
import ReactImageUploading from "react-images-uploading";
import auth from "../../services/authService";
import Lds from "../common/lds";

class EditProperty extends Form {
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
            thumbnail:"",
            areas:[]
        },
        preselectedAreas:[],
        property_id:"",
        thumbnail:"",
        images:[],
        area_choices:[],
        boolanProperty_choics:[
            {key: "parking", name:"پارکینگ"},
            {key: "elevator", name:"آسنانسور"},
            {key: "sauna", name:"سونا"},
            {key: "pool", name:"استخر"},
            {key: "lobby", name:"لابی"},
            {key: "guardian", name:"نگهبان"},
            {key: "warehouse", name:"انبار"},
            {key: "balcony", name:"بالکن"},
            {key: "patio", name:"پاتیو"},
            {key: "jacuzzi", name:"جکوزی"},
            {key: "hall", name:"هال"},
            {key: "communities", name:"سیستم ارتباطات"},
            {key: "air_conditioner", name:"تهویه هوا"},
            {key: "radiator", name:"رادیاتور"},
            {key: "fan", name:"پنکه"},
            {key: "coel", name:"کوئل"},
            {key: "package_feature", name:"پکیج"},
            {key: "chiller", name:"خنک کننده"},
            {key: "split", name:"اسپیلت"},
            {key: "heater", name:"سیستم گرمایشی"},
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
    }
    schema={
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
    }
    async componentDidMount(){
        const { data: { data: area_choices = [] } = {} } = await auth.getAllAreas();
        const result = await auth.getSpecificProperty(this.props.match.params.id);

        if (!(result.status == 200 || result.status == 201)) {
            throw "Error";
        }

        const { data: { data: rawData = [] } = {} } = result;
        const data = { ...this.fixDataNumericValue(rawData) };
        // data.areas = [];
        const property_id = data.documentId;

        delete data.documentId;
        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.publishedAt;
        delete data.locale;
        delete data.gallery;
        delete data.localizations;

        const thumbnail = [{
            uploadStatus : "AlreadyExisted",
            data_url: auth.getImageUrl(data.thumbnail),
            uploadInfo : { url:data.thumbnail }
        }];

        const images = [];

        (JSON.parse(rawData.gallery)).forEach((image, index) => {
            images.push( {
                uploadStatus : "AlreadyExisted",
                data_url: auth.getImageUrl(image),
                uploadInfo : { id: index  , url:image }
            });
        });

        const preselectedAreas = [];

        for (let i=0;i<rawData.areas.length;i++) {
            preselectedAreas.push(rawData.areas[i]);
        }

        // data.areas = [...area_choices];

        this.setState({data,area_choices,property_id,preselectedAreas,thumbnail,images})
    }

    onChangeThumbnail = async (thumbnail, addUpdateIndex) => {
        if (addUpdateIndex===undefined) {
            let {thumbnail} = {...this.state};
            thumbnail=[];
            this.setState({thumbnail});
        } else {
            this.setState({thumbnail});
            thumbnail[0] = await this.handleUploadImage(thumbnail[0]);
            this.setState({thumbnail})
        }
    };
    onChangeImages = async (imageList, addUpdateIndex) => {
        if(addUpdateIndex===undefined){
            let {images} = {...this.state};
            for(let i=0;i<images.length;i++){
                if(imageList.indexOf(images[i]) == -1) images[i] = "Deleted";
            }
            this.setState({images});
        }else{
            this.setState({images:imageList});
            // console.log(imageList.length-addUpdateIndex.length)
            for (let i=imageList.length-addUpdateIndex.length;i<imageList.length;i++){
                imageList[i] = await this.handleUploadImage(imageList[i]);
                // console.log(imageList[i])
                this.setState({images:imageList})
            }
        }
    };

    onImageRemove = async (index) => {
        let images = this.state.images;//might get bugged?
        // const tempImage = images[index];
        // let {property_id} = this.state;
        // let flag=false;
        // if(images[index].uploadStatus === "Successfull") flag=true;
        images[index] = "Deleted";
        this.setState({images});
        // if (flag) return;
        // try {
        //     const res = await auth.delPropertyImage(property_id,tempImage.uploadInfo.id);
        //     if(res.status_code !== 200) throw "Error";
        // } catch (error) {
        //     // console.log(error);
        //     toast.error("عکس مورد نظر پاک نشد.");
        //     // console.log(tempImage)
        //     images[index] = tempImage;
        //     this.setState({images});
        // }
    }

    async handleUploadImage(data){
        try {
            const res = await auth.uploadImage(data.file)

            if (!(res.status === 200 || res.status === 201)) {
                throw "Upload failed";
            }

            data.uploadInfo = res.data[0];
            data.uploadStatus = "Successful";

            return data;
        } catch (error) {
            toast.error("مشکلی در ارتباط با سرور پیش آمد و عکس آپلود نشد. از فرمت فایل مورد نظر مطمئن باشید.");

            data.uploadStatus = "Failled";

            return data;
        }
    }
    // onImageSave = async (index) => {
    //     let {images} = this.state;//might get bugged?
    //     let {property_id} = this.state;
    //     images[index].uploadStatus = "Successfull";
    //     this.setState({images});
    //     try {

    //         const res = await auth.addPropertyImage(property_id,images[index].uploadInfo.id);
    //         if(res.status_code !== 200) throw "Error";
    //         images[index].uploadStatus = "Saved";
    //         this.setState({images});
    //     } catch (error) {
    //         toast.error("عکس مورد نظر ثبت نشد.");
    //         images[index].uploadStatus = "Successfull";
    //         this.setState({images});
    //     }
    // }
    handleBooleanPropetyOnClick = (item) => {
        const data = {...this.state.data};
        data[item.key] = !data[item.key];
        this.setState({data});
    }
    handleBooleanProperty(value) {
        return value ? "col-11 col-md-5 py-3 my-2 mx-auto boolean-property shadow-sm text-center text-success" : "col-11 col-md-5 py-3 my-2 mx-auto boolean-property shadow-sm text-center text-danger";
    }
    handleBooleanPropertyIcon(value) {
        return value ? <i className="fas fa-check ms-2"></i> : <i className="fas fa-times ms-2"></i>;
    }
    fixDataNumericValue(data) {
        for (const item in data) {
            if(!isNaN(data[item]) && typeof(data[item]) !== "boolean" && typeof(data[item]) !== "array") data[item] = data[item]+'';
        }

        return data;
    }
    // addArea = async (area_id) => {
    //     return await auth.addPropertyArea(this.state.property_id,area_id);
    // }
    // removeArea = async (area_id) => {
    //     return await auth.delPropertyArea(this.state.property_id,area_id);
    // }

    doSubmit = async () => {
        const {property_id, data,thumbnail, images} = this.state;

        try {
            if (thumbnail[0] !== undefined && thumbnail[0].uploadInfo !== undefined) data.thumbnail = thumbnail[0].uploadInfo.url;

            const { areas = [] } = data || {};
            const areasDocId = areas.map(({ documentId }) => documentId);
            data.areas = { connect: areasDocId };
            const galleryImages = [];

            for (let i = 0; i < images.length; i++) {
                if (images[i].uploadInfo !== undefined) {
                    galleryImages.push(images[i].uploadInfo.url);
                }
            }

            data.gallery = JSON.stringify(galleryImages);

            const res = await auth.updatePropertyInfo(data,property_id);

            if (!(res.status === 200 || res.status === 201)) throw "something went wrong :("

            window.location.replace("/edit-property/"+property_id);
        } catch(error) {
            toast.error("برخی از تغییرات ملک مورد نظر ثبت نشد. لطفا ورودی های خود را چک کنید.");
        }
    }

    render() {
        const {images,thumbnail,boolanProperty_choics,data} = this.state;
        const {isLoggedIn} = this.props;
        if (!isLoggedIn) window.location = process.env.PUBLIC_URL+"/";
        return (
        <section id="add-property" className="edit-property">
            {isLoggedIn && (<div className="container py-5">
                <div className="row">
                    <React.Fragment>
                        <div className="col-lg-8 col-10 col-md-9 mx-auto mx-auto property-properties-container shadow py-4 mt-3">
                            <div className="row">
                                <h3 className="text-center mt-3 mb-5"><i className="fas fa-home"></i> تغییر اطلاعات ملک</h3>
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
                                        "area_name",
                                        this.state.preselectedAreas
                                    )}
                                </div>
                                {
                                    boolanProperty_choics.map((item,index) => (
                                        index%2==0 && (
                                        <div className="col-11 col-md-5 px-0 mx-auto justify-content-between">
                                            <div className="row">
                                                <div className={this.handleBooleanProperty(data[item.key])} key={item.key} onClick={()=>this.handleBooleanPropetyOnClick(item)}>
                                                {this.handleBooleanPropertyIcon(data[item.key])}
                                                <span>{item.name}</span>
                                                </div>
                                                <div className={this.handleBooleanProperty(data[boolanProperty_choics[index+1].key])} key={boolanProperty_choics[index+1].key} onClick={()=>this.handleBooleanPropetyOnClick(boolanProperty_choics[index+1])}>
                                                {this.handleBooleanPropertyIcon(data[boolanProperty_choics[index+1].key])}
                                                <span>{boolanProperty_choics[index+1].name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    ))
                                }
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
                                        <label className="mb-2">بارگزاری تصویر بندانگشتی ملک</label>
                                        <span className="d-flex justify-content-center align-items-center fw-bold drag-n-drop"
                                        style={isDragging ? { color: 'red' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        >
                                            <i className="fas fa-cloud-upload-alt ps-2"></i>
                                            کلیک کنید یا عکس را داخل کادر بکشید.
                                        </span>

                                        {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                        <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
                                        {imageList.map((image, index) => ( image!=="Deleted" && 
                                            (<div className={image.uploadStatus ? "col "+image.uploadStatus : "col div-uploading"}>
                                                <div key={index} className="image-item card">
                                                    {!image.uploadStatus && (
                                                        <div class="uploading">
                                                            <Lds/>
                                                        </div>)
                                                    }
                                                    <img src={image['data_url']} alt="" className="card-img-top" />
                                                    <div className="image-item__btn-wrapper card-body text-center">
                                                        <span className="p-2" onClick={() => onImageRemove(index)}><i className="fas fa-trash-alt"></i></span>
                                                    </div>
                                                </div>
                                            </div>)
                                        ))}
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
                                        <span className="d-flex justify-content-center align-items-center fw-bold drag-n-drop"
                                        style={isDragging ? { color: 'red' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        >
                                            <i className="fas fa-cloud-upload-alt ps-2"></i>
                                            کلیک کنید یا عکس را داخل کادر بکشید.
                                        </span>
                                        {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                        <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
                                        {imageList.map((image, index) => ( image!=="Deleted" && 
                                            (<div className={image.uploadStatus ? "col "+image.uploadStatus : "col div-uploading"}>
                                                <div key={index} className="image-item card">
                                                    {!image.uploadStatus && (
                                                        <div class="uploading">
                                                            <Lds/>
                                                        </div>)
                                                    }
                                                    <img src={image['data_url']} alt="" className="card-img-top" />
                                                    <div className="image-item__btn-wrapper card-body text-center">
                                                        {/* <span className="p-2" onClick={() => onImageUpdate(index)}><i className="fas fa-edit"></i></span> */}
                                                        <span className="p-2" onClick={() => this.onImageRemove(index)}><i className="fas fa-trash-alt"></i></span>
                                                    </div>
                                                </div>
                                            </div>)
                                        ))}
                                        </div>
                                    </div>
                                    )}
                                </ReactImageUploading>
                                <div className="d-flex justify-content-center mt-5">
                                    {this.renderButton("ثبت تغییرات","py-2 btn btn-success")}
                                </div>
                                </form>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>)}
        </section> );
    }
}

export default EditProperty;