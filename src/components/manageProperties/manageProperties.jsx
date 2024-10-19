import { Link } from "react-router-dom";
function handleRedirect(isLoggedIn){
    window.location = process.env.PUBLIC_URL+"/";
}
const ManageProperties = ({isLoggedIn}) => {
    return ( 
        <section id="manage-properties" dir="rtl">
            {!isLoggedIn && handleRedirect(handleRedirect)}
            {isLoggedIn && (<div className="container">
                <div className="row">
                    <Link to="/add-property" className="col-10 col-md-5 mx-auto text-center fw-bold p-5 my-3 shadow">
                        <i className="fas fa-plus ps-2"></i>
                        افزودن ملک جدید
                    </Link>
                    <Link to="/" className="col-10 col-md-5 mx-auto text-center fw-bold p-5 my-3 shadow">
                        <i className="fas fa-search ps-2"></i>
                        جستجو ملک
                    </Link>
                    <Link to="/" className="col-10 col-md-5 mx-auto text-center fw-bold p-5 my-3 shadow">
                        <i className="far fa-trash-alt ps-2"></i>
                        حذف ملک
                    </Link>
                    <Link to="/" className="col-10 col-md-5 mx-auto text-center fw-bold p-5 my-3 shadow">
                        <i className="far fa-edit ps-2"></i>
                        تغییر ملک
                    </Link>
                </div>
            </div>)}
        </section>
     );
}
 
export default ManageProperties;