import { Link } from "react-router-dom";
import React from 'react';
import _404notfound from "../imgs/404-house-photo.jpg";

const PropertyTimeLine = ({properties,handleGetImageUrl,isLoggedIn,onClick}) => {
    return (
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xs-4 g-3">
            {
            properties.map((property) => (
                <div className="col" key={property.documentId}>
                    <div className="card shadow-sm">
                        <img className="bd-placeholder-img card-img-top" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={handleGetImageUrl(property.thumbnail)} onError={(e)=>(e.target.src=_404notfound)}></img>
                        <div className="card-body">
                            <span className="payment-type p-3 fw-bold shadow-sm">{property.payment_type}</span>
                            <span className="property-id p-3 fw-bold shadow-sm">{property.documentId}</span>
                            <div className="house-info d-flex flex-column">
                            <span className="fw-bold text-center house-price py-1 px-3 fw-bold">{new Intl.NumberFormat().format(property.price)} ریال</span>
                            <span className="text-muted fw-bold d-flex house-address my-3"><i className="fas fa-map-marker-alt text-danger ps-1 pt-1"></i><span>{property.address}</span></span>
                            <div className="row text-center property-info">
                                <div className="col small fw-bold d-flex align-items-center justify-content-center">تعداد اتاق: {property.room_count}</div>
                                <div className="col small fw-bold d-flex align-items-center justify-content-center">{property.building_type}</div>
                                <div className="col small fw-bold d-flex align-items-center justify-content-center">زیربنا: {property.foundation}مترمربع</div>
                            </div>
                            </div>
                            <div className="property-areas mt-2">
                                {property.areas.map(({ area_name })=>(
                                    <div className="col">{ area_name }</div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <div className="btn-group" dir="ltr">
                                    {isLoggedIn && (<React.Fragment>
                                        <button onClick={()=>onClick(property.documentId)} className="btn btn-sm btn-outline-primary fw-bold px-4 py-2 d-flex align-items-center justify-content-center" dir="rtl">حذف</button>
                                        <Link to={"edit-property/"+property.documentId} className="btn btn-sm btn-outline-primary fw-bold px-4 py-2 d-flex align-items-center justify-content-center" dir="rtl">ویرایش</Link>
                                    </React.Fragment>)}
                                    <Link to={"property/"+property.documentId} className="btn btn-sm btn-outline-primary fw-bold px-4 py-2 d-flex align-items-center justify-content-center" dir="rtl">مشاهده اطلاعات</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
}
 
export default PropertyTimeLine;