import React, { Component } from 'react';
import SearchBoxHome from './searchBoxHome';
import auth from "../services/authService";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import Lds from './common/lds';
import "react-toastify/dist/ReactToastify.css";
import PropertyTimeLine from './propertyTimeLine';
import $ from "jquery";
import Modal from "./common/modal";
import NotifModal from './common/notifModal';

class Home extends Component {
    state = {
        IsRequestDone:false,
        properties:[],
        notifs:[],
        offset: 0,
        perPage: 15,
        currentPage: 0,
        modalData: "",
    }

    getFilteredData() {
        const {properties,offset,perPage} = this.state;
        return properties.slice(offset, offset+perPage)
    }

    handleModal = (modalData) => {
        this.setState({ modalData });
        $("#delete_property").show();
    }

    handleDelete = async (propertyId,modalId) => {
        $("#delete_property").hide()

        const originalProperties = this.state.properties;
        const properties = this.state.properties.filter(({ documentId }) => documentId !== propertyId);

        this.setState({ properties });

        try {
          await auth.deleteProperty(propertyId);
          toast.success("ملک با موفقیت حذف شد.");
        } catch (e) {
          toast.error("حذف ملک با شکست مواجه شد..");
          this.setState({ properties: originalProperties });
        }
    }

    async componentDidMount() {
        try {
            const res = await auth.getAllNotifs();
            const notifs = res.message;
    
            this.setState({
                notifs,
             });
             $("#notif_modal").show()
        } catch (error) {}

        try {
            const { data: { data: properties = [] } ={} } = await auth.getAllProperty();

            this.setState({
                properties,
                IsRequestDone: true,
                pageCount: Math.ceil(properties.length / this.state.perPage),
             });
        } catch (error) {
            toast.error("مشکلی در ارتباط با سرور پیش آمد :(");
            this.setState({ IsRequestDone: true });
        }
    }
    handlePageClick  = (data) => {
        const {perPage} = this.state;
        const selected = data.selected;
        const offset = Math.ceil(selected * perPage);
        this.setState({offset});
      };
    handleSearchClick  = async (data) => {
    window.location.replace("/#houses");

    try {
        let tempArea=[];
        let tempPropertyState=[];
        let tempPaymentType=[];
        let tempPropertyType=[];
        let tempRoomCount=[];

        data.area.forEach(element => tempArea.push(element.documentId));
        data.propertyState.forEach(element => tempPropertyState.push(element.name));
        data.paymentType.forEach(element => tempPaymentType.push(element.name));
        data.propertyType.forEach(element => tempPropertyType.push(element.name));
        data.roomCount.forEach(element => tempRoomCount.push(element.id));

        const { data: { data: properties = [] } ={} } = await auth.getfilteredProperties(
            data,
            tempArea,
            tempPropertyState,
            tempPaymentType,
            tempPropertyType,
            tempRoomCount
        );

        this.setState({
            properties,
            IsRequestDone: true,
            pageCount: Math.ceil(properties.length / this.state.perPage),
        });
    } catch (error) {
        toast.error("مشکلی در ارتباط با سرور پیش آمد :(");
        this.setState({ IsRequestDone: true });
    }
    };
    render() { 
        const {pageCount, IsRequestDone} = this.state;
        const { length: count } = this.state.properties;
        const properties = this.getFilteredData();

        return ( 
            <React.Fragment>
                <Modal
                    modalId="delete_property"
                    dataId={this.state.modalData}
                    handleDelete={this.handleDelete}
                />
                <NotifModal
                    modalId="notif_modal"
                    modalData={this.state.notifs}
                />
                <SearchBoxHome
                    submitHandler={this.handleSearchClick}
                />
                <section id="houses" className="py-5" dir="rtl">
                    <div className="container">
                        {
                        (!IsRequestDone) &&
                        (<div className="row">
                            <div className="col-12">
                                <Lds/>
                            </div>
                        </div>)
                        }
                        {
                        (IsRequestDone) && (count === 0) &&
                        (<div className="row my-auto">
                            <div className="col-lg-8 col-10 col-md-9 mx-auto home-notfound shadow py-5 px-5 text-center text-white my-auto" dir="rtl">
                                ملکی پیدا نشد :(
                            </div>
                        </div>)
                        }
                        {(IsRequestDone) && (count !== 0) &&
                            (
                                <React.Fragment>
                            <PropertyTimeLine
                                properties={properties}
                                handleGetImageUrl={auth.getImageUrl}
                                isLoggedIn={this.props.isLoggedIn}
                                onClick={this.handleModal}
                            />
                            <div className="pagination d-flex justify-content-center align-items-center my-5">
                                <nav aria-label="pagination">
                                    <ReactPaginate
                                        previousLabel={<React.Fragment><i className="fas fa-angle-right"></i> قبلی</React.Fragment>}
                                        nextLabel={<React.Fragment>بعدی <i className="fas fa-angle-left"></i></React.Fragment>}
                                        breakLabel={<i className="fas fa-ellipsis-h"></i>}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={3}
                                        onPageChange={this.handlePageClick}
                                        activeClassName={'active'}
                                        containerClassName={"pagination p-0"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        nextClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                    />
                                </nav>
                            </div>
                        </React.Fragment>
                            )
                        }
                    </div>
                </section>
            </React.Fragment>
         );
    }
}
 
export default Home;