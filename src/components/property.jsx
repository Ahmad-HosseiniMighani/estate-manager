import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import housePhoto from "../imgs/house-photo.jpg";
import {Magnifier} from "react-image-magnifiers";
import { toast } from "react-toastify";
import Lds from './common/lds';
import auth from "../services/authService";

class Property extends Component {
    state = {
        IsRequestDone: false,
        data: "",
    }
    async componentDidMount() {
        try {
            const rawData = await auth.getSpecificProperty(this.props.match.params.id);
            // console.log(rawData)
            if(isNaN(this.props.match.params.id) || rawData.status_code!==200) throw "Error";
            const data= this.separateData(rawData.message,rawData.area,rawData.images);
            this.setState({
                data,
                IsRequestDone: true,
             });
        } catch (error) {
            toast.error("مشکلی در ارتباط با سرور پیش آمد :(");
            this.setState({ IsRequestDone: true });
        }
    }
    separateData(data,area,images){
        let result={
            booleanProperties:{},
            stringProperties:{},
            propertyinfo:{}
        };
        for (let item in data){
            if(item == "thumbnail" || item == "address" || item == "postalCode" || item == "releaseDateTime" || item == "ownerName" || item == "id"){
                result.propertyinfo[item]= data[item];
            }else if(typeof data[item] == "boolean"){
                switch(item){
                    case "parking":
                        result.booleanProperties[item]= {
                            key: "پارکینگ",
                            value: data[item]
                        };
                        break;
                    case "elevator":
                        result.booleanProperties[item]= {
                            key: "آسانسور",
                            value: data[item]
                        };
                        break;
                    case "sauna":
                        result.booleanProperties[item]= {
                            key: "سونا",
                            value: data[item]
                        };
                        break;
                    case "pool":
                        result.booleanProperties[item]= {
                            key: "استخر",
                            value: data[item]
                        };
                        break;
                    case "lobby":
                        result.booleanProperties[item]= {
                            key: "لابی",
                            value: data[item]
                        };
                        break;
                    case "guardian":
                        result.booleanProperties[item]= {
                            key: "نگهبان",
                            value: data[item]
                        };
                        break;
                    case "warehouse":
                        result.booleanProperties[item]= {
                            key: "انبار",
                            value: data[item]
                        };
                        break;
                    case "balcony":
                        result.booleanProperties[item]= {
                            key: "بالکن",
                            value: data[item]
                        };
                        break;
                    case "patio":
                        result.booleanProperties[item]= {
                            key: "پاتیو",
                            value: data[item]
                        };
                        break;
                    case "jacuzzi":
                        result.booleanProperties[item]= {
                            key: "جکوزی",
                            value: data[item]
                        };
                        break;
                    case "hall":
                        result.booleanProperties[item]= {
                            key: "هال؟",
                            value: data[item]
                        };
                        break;
                    case "communities":
                        result.booleanProperties[item]= {
                            key: "ارتباطات؟",
                            value: data[item]
                        };
                        break;
                    case "air_conditioner":
                        result.booleanProperties[item]= {
                            key: "کولر؟",
                            value: data[item]
                        };
                        break;
                    case "radiator":
                        result.booleanProperties[item]= {
                            key: "رادیاتور",
                            value: data[item]
                        };
                        break;
                    case "fan":
                        result.booleanProperties[item]= {
                            key: "پنکه",
                            value: data[item]
                        };
                        break;
                    case "coel":
                        result.booleanProperties[item]= {
                            key: "کوئل",
                            value: data[item]
                        };
                        break;
                    case "package_feature":
                        result.booleanProperties[item]= {
                            key: "پکیج",
                            value: data[item]
                        };
                        break;
                    case "chiller":
                        result.booleanProperties[item]= {
                            key: "خنک کننده",
                            value: data[item]
                        };
                        break;
                    case "split":
                        result.booleanProperties[item]= {
                            key: "اسپیلت",
                            value: data[item]
                        };
                        break;
                    case "heater":
                        result.booleanProperties[item]= {
                            key: "گرم کننده",
                            value: data[item]
                        };
                        break;
                    default:
                        result.booleanProperties[item]= data[item];
                    }
            }else{
                switch(item){
                    case "foundation":
                        result.stringProperties[item]= {
                            key: "زیربنا",
                            value: new Intl.NumberFormat().format(data[item])
                        };
                        break;
                    case "roomCount":
                        if(data[item]>0){
                            result.stringProperties[item]= {
                                key: "تعداد اتاق",
                                value: data[item]+" اتاق"
                            };

                        }else{
                            result.stringProperties[item]= {
                                key: "تعداد اتاق",
                                value: "بدون اتاق"
                            };
                        }
                        break;
                    case "rent":
                        if(data[item]>0){
                            result.stringProperties[item]= {
                                key: "اجاره",
                                value: new Intl.NumberFormat().format(data[item])+ " ریال"
                            };
                        }else{
                            result.stringProperties[item]= {
                                key: "اجاره",
                                value: "ندارد"
                            };
                        }
                        break;
                    case "floorCount":
                        result.stringProperties[item]= {
                            key: "تعداد طبقات",
                            value: data[item]+ " طبقه"
                        };
                        break;
                    case "unitPerFloor":
                        result.stringProperties[item]= {
                            key: "تعداد واحد در هر طبقه",
                            value: data[item]+ " واحد"
                        };
                        break;
                    case "ageOfBuilding":
                        result.stringProperties[item]= {
                            key: "سن بنا",
                            value: data[item]+ " سال"
                        };
                        break;
                    case "paymentType":
                        result.stringProperties[item]= {
                            key: "نوع فروش",
                            value: data[item]
                        };
                        break;
                    case "buildingType":
                        result.stringProperties[item]= {
                            key: "نوع ساختمان",
                            value: data[item]
                        };
                        break;
                    case "floorCover":
                        result.stringProperties[item]= {
                            key: "کفپوش",
                            value: data[item]
                        };
                        break;
                    case "viewOfBuilding":
                        result.stringProperties[item]= {
                            key: "نمای ساختمان",
                            value: data[item]
                        };
                        break;
                    case "propertyState":
                        result.stringProperties[item]= {
                            key: "شرایط ساختمان",
                            value: data[item]
                        };
                        break;
                    case "entryType":
                        result.stringProperties[item]= {
                            key: "نوع ورودی",
                            value: data[item]
                        };
                        break;
                    case "price":
                        result.stringProperties[item]= {
                            key: "قیمت",
                            value: new Intl.NumberFormat().format(data[item])+ " ریال"
                        };
                        break;
                    case "kitchen":
                        result.stringProperties[item]= {
                            key: "آشپزخانه",
                            value: data[item]
                        };
                        break;
                    default:
                        result.stringProperties[item]= data[item];
                    }
            }
        }
        result.propertyinfo["area"]= area;
        result.propertyinfo["images"]= images;
        // console.log(result.propertyinfo["images"])
        return result;
    }
    handleBooleanProperty(value){
        return value ? "col-11 col-md-5 py-3 my-2 mx-auto single-property shadow-sm text-center text-success" : "col-11 col-md-5 py-3 my-2 mx-auto single-property shadow-sm text-center text-danger";
    }
    handleBooleanPropertyIcon(value){
        return value ? <i className="fas fa-check ms-2"></i> : <i className="fas fa-times ms-2"></i>;
    }
    customRenderItem = (item, props) => <item.type {...item.props} {...props} />;
    customRenderThumb = (children) => 
            children.map((item) => {
                return <img src={item.props.imageSrc} />;
    });
    render() { 
        const stringProperties = {...this.state.data.stringProperties};
        const booleanProperties = {...this.state.data.booleanProperties};
        let images = [];
        let areas = [];
        if(this.state.data !=="") {
            images = [...this.state.data.propertyinfo.images];
            areas = [...this.state.data.propertyinfo.area]
        }
        const {IsRequestDone, data} = this.state;
        // console.log(data)
        return ( 
            <section id="property">
                <div className="container py-5">
                    <div className="row">
                        {
                        (!IsRequestDone) &&
                            (<div className="col-lg-8 col-10 col-md-9 mx-auto property-photo-container shadow py-5 px-5">
                                <Lds/>
                            </div>)
                        }
                        {
                        (IsRequestDone) && data=="" &&
                            (<div className="col-lg-8 col-10 col-md-9 mx-auto property-photo-container shadow py-5 px-5 text-center text-white my-auto" dir="rtl">
                                ملک مورد نظر پیدا نشد :(
                            </div>)
                        }
                        {
                        (IsRequestDone) && data!=="" &&(
                            <React.Fragment>
                                {images.length==0 &&(
                                    <div className="col-lg-8 col-10 col-md-9 mx-auto property-photo-container shadow pt-5 pb-4 px-5">
                                        <img className="img-fluid" src={auth.getImageUrl(this.state.data.propertyinfo.thumbnail)}></img>
                                    </div>
                                )}
                                {images.length>0 && (<div className="col-lg-8 col-10 col-md-9 mx-auto property-photo-container shadow pt-5 pb-4 px-5">
                                <Carousel
                                    dynamicHeight={true}
                                    showArrows={false}
                                    swipeable={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    renderItem={this.customRenderItem}
                                    renderThumbs={this.customRenderThumb}
                                >
                                {images.map((item)=>
                                        (<Magnifier
                                            imageSrc={auth.getImageUrl(item.url)}
                                            imageAlt="عکسی از ملک"
                                            touchActivation={"doubleTap"}
                                        />)
                                    )}
                                </Carousel>
                                
                                </div>)}
                                <div className="col-lg-8 col-10 col-md-9 mx-auto mx-auto property-properties-container shadow py-4 mt-3">
                                    {areas.length > 0 && (<div className="row">
                                        <div className="property-areas col-11 px-0 mx-auto d-flex flex-row">
                                            {areas.map((area)=>(
                                                <div className="col p-2">{area.area_id.area_name}</div>
                                            ))}
                                        </div>
                                    </div>)}
                                    <div className="row">
                                        {
                                            Object.keys(stringProperties).map((item) => (
                                                (<div className="col-11 col-md-5 py-3 px-4 my-2 mx-auto single-property d-flex shadow-sm" key={item}>
                                                    <span className="ms-auto">{stringProperties[item].key}: </span> <span className="text-start"> {stringProperties[item].value}</span>
                                                </div>)
                                            ))
                                        }
                                    </div>
                                    <div className="row">
                                        {
                                            Object.keys(booleanProperties).map((item,index) => (
                                                index%2==0 && (
                                                <div className="col-11 col-md-5 px-0 mx-auto justify-content-between">
                                                    <div className="row">
                                                        <div className={this.handleBooleanProperty(booleanProperties[Object.keys(booleanProperties)[index]].value)} key={Object.keys(booleanProperties)[index]}>
                                                        {this.handleBooleanPropertyIcon(booleanProperties[Object.keys(booleanProperties)[index]].value)}
                                                        <span>{booleanProperties[Object.keys(booleanProperties)[index]].key}</span>
                                                        </div>
                                                        <div className={this.handleBooleanProperty(booleanProperties[Object.keys(booleanProperties)[index+1]].value)} key={Object.keys(booleanProperties)[index+1]}>
                                                        {this.handleBooleanPropertyIcon(booleanProperties[Object.keys(booleanProperties)[index+1]].value)}
                                                        <span>{booleanProperties[Object.keys(booleanProperties)[index+1]].key}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            ))
                                        }
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </section>
         );
    }
}
 
export default Property;