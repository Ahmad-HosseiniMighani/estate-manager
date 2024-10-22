import React from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import $ from "jquery";
import Modal from "../common/modal";
import Lds from "../common/lds";
import Pagination from "../common/pagination";
import auth from "../../services/authService";
import { paginate } from "../../js/paginate";
import NotificationsTable from './notificationsTable';
import Joi from "joi-browser";
import Form from "../common/form";
import NotifModal from './../common/notifModal';

class NotificationManagement extends Form {
    state = {
        data:{
            title:"",
            description:"",
        },
        errors: {},
        notifs: [],
        IsRequestDone: false,
        modalData: [],
        currentPage: 1,
        pageSize: 10,
        sortColumn: { path: "id", order: "asc" },
    };
    schema={
        title: Joi.string()
            .required()
            .label("تیتر")
            .error((errors) => this.ErrorsLang(errors)),
        description: Joi.string()
            .required()
            .label("توضحیات")
            .error((errors) => this.ErrorsLang(errors)),
    }

    async componentDidMount() {
        try {
            const { data: { data: notifs = [] } = {} } = await auth.getAllNotifs();

            // console.log(result)
            this.setState({ notifs, IsRequestDone: true });
        } catch (error) {
            // console.log(error)
            toast.error("مشکلی در ارتباط با سرور پیش آمد :(");
            this.setState({ IsRequestDone: true });
        }
    }

    handleDelete = async (notifId) => {
        $("#delete_notif").hide()
        const originalAreas = this.state.notifs;
        const notifs = this.state.notifs.filter((n) => n.id !== notifId);
        this.setState({ notifs });
        try {
            await auth.deleteNotif(notifId);
            toast.success("اعلان با موفقیت حذف شد.");
        } catch (e) {
            toast.error("حذف اعلان با شکست مواجه شد.");
            this.setState({ notifs: originalAreas });
        }
    };

    handleModal = (modalData) => {
        this.setState({ modalData });
        $("#delete_notif").show()
    };
    handleModal2 = (data) => {
        this.setState({ modalData:[data] });
        $("#notif_modal").show()
    };
    // handleEdit = (notif) => {
    //     window.location = process.env.PUBLIC_URL + "/edit-notif/" + notif.id+"/"+notif.notif_name;
    // };
    handleView = (notif) => {
        // window.location = process.env.PUBLIC_URL + "/notifs/" + notif.id;
    };
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, notifs: allnotifs } = this.state;

        const sorted = _.orderBy(allnotifs, [sortColumn.path], [sortColumn.order]);

        const notifs = paginate(sorted, currentPage, pageSize);

        return { totalCount: allnotifs.length, data: notifs };
    };
    doSubmit = async () => {
        const {data} = this.state;
        // console.log(data);
        // console.log(tempAreas)
        try{
            const res = await auth.addNotif(data);
            if(res.status_code !== 200) throw res.message;
            data.title="";
            data.description="";
            toast.success("اعلان مورد نظر ثبت شد.");
            window.location.reload()
        }catch(error){
            // console.log(error)
            toast.error("اعلان مورد نظر ثبت نشد. لطفا ورودی های خود را چک کنید.");
        }
    }
    render() {
        // console.log("im render");
        const { length: count } = this.state.notifs;
        const { pageSize, currentPage, sortColumn, IsRequestDone } = this.state;
        const { totalCount, data: notifs } = this.getPagedData();
        const {isLoggedIn} = this.props;
        if (!isLoggedIn) window.location = process.env.PUBLIC_URL+"/";
        return (
            <React.Fragment>
                <Modal
                    modalId="delete_notif"
                    dataId={this.state.modalData}
                    handleDelete={this.handleDelete}
                />
                <NotifModal
                    modalId="notif_modal"
                    modalData={this.state.modalData}
                />
                {isLoggedIn && (<section id="notif-management" dir="rtl">
                <div className="card col-lg-11 col-10 col-md-10 mx-auto property-photo-container shadow pt-5 pb-4 px-5">
                    <div className="card-body">
                        <form className="row  mb-4" onSubmit={this.handleSubmit}>
                            {this.renderInput(
                                "title",
                                "تیتر اعلان",
                                "col-12 col-md-6 my-2",
                                "تیتر اعلان را وارد کنید..."
                            )}
                            {this.renderInput(
                                "description",
                                "متن اعلان",
                                "col-12 my-2",
                                "متن اعلان را وارد کنید..."
                            )}
                            <div className="d-flex justify-content-center mt-4">
                                    {this.renderButton("ثبت اعلان","py-2 btn btn-success")}
                            </div>
                        </form>
                        {
                        (!IsRequestDone) &&
                        (<div className="col">
                            <Lds/>
                        </div>)
                        }
                        {
                        (IsRequestDone) && (count === 0) &&
                        (<div className="col" dir="rtl">
                            اعلانی پیدا نشد :(
                        </div>)
                        }
                    {(IsRequestDone) && (count !== 0) &&(<div className="col">
                        <p className="small">نتیجه: {totalCount} اعلان</p>
                        <NotificationsTable
                            notifs={notifs}
                            sortColumn={sortColumn}
                            onEdit={this.handleEdit}
                            onClick={this.handleModal}
                            onView={this.handleModal2}
                            onSort={this.handleSort}
                        />
                        <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                        />
                    </div>)}
                    </div>
                </div>
                </section>)}
            </React.Fragment>
        );
    }
}
 
export default NotificationManagement;