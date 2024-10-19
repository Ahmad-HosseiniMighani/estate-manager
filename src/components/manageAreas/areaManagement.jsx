import React from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import $ from "jquery";
import Modal from "../common/modal";
import Lds from "../common/lds";
import Pagination from "../common/pagination";
import auth from "../../services/authService";
import { paginate } from "../../js/paginate";
import AreasTable from "./areasTable";
import Joi from "joi-browser";
import Form from "../common/form";

class AreaManagement extends Form {
  state = {
    data: {
      area_name: "",
    },
    errors: {},
    areas: [],
    IsRequestDone: false,
    modalData: "",
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "id", order: "asc" },
  };

  schema = {
    area_name: Joi.string()
      .required()
      .label("منطقه")
      .error((errors) => this.ErrorsLang(errors)),
  };

  async componentDidMount() {
    // $("#delete_area").on("show.bs.modal", function (e) {
    //     var bookId = $(e.relatedTarget).data("book-id");
    //     $(e.currentTarget).find('input[name="bookId"]').val(bookId);
    // });
    try {
      const { data: { data = [] } = {} } = await auth.getAllAreas();
      const areas = data.map((area) => area);

      this.setState({ areas, IsRequestDone: true });
    } catch (error) {
      toast.error("مشکلی در ارتباط با سرور پیش آمد :(");
      this.setState({ IsRequestDone: true });
    }
  }

  handleDelete = async (areaId) => {
    $("#delete_area").hide();
    const originalAreas = this.state.areas;
    const areas = this.state.areas.filter((n) => n.id !== areaId);
    this.setState({ areas });
    try {
      await auth.deleteArea(areaId);
      toast.success("منطقه با موفقیت حذف شد.");
    } catch (e) {
      toast.error("حذف منطقه با شکست مواجه شد..");
      this.setState({ areas: originalAreas });
    }
  };

  handleModal = (modalData) => {
    this.setState({ modalData });
    $("#delete_area").show();
  };
  handleEdit = (area) => {
    window.location =
      process.env.PUBLIC_URL + "/edit-area/" + area.documentId + "/" + area.area_name;
  };
  // handleView = (area) => {
  //     window.location = process.env.PUBLIC_URL + "/areas/" + area.id;
  // };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, areas: allareas } = this.state;

    const sorted = _.orderBy(allareas, [sortColumn.path], [sortColumn.order]);

    const areas = paginate(sorted, currentPage, pageSize);

    return { totalCount: allareas.length, data: areas };
  };

  doSubmit = async () => {
    const { data } = this.state;

    try {
      const res = await auth.addArea(data);

      if (!(res.status == 200 || res.status == 201)) {
        throw res.message;
      }

      data.area_name = "";

      toast.success("منطقه مورد نظر ثبت شد.");
      window.location.reload();
    } catch (error) {
      toast.error("منطقه مورد نظر ثبت نشد. لطفا ورودی های خود را چک کنید.");
    }
  };

  render() {
    // console.log("im render");
    const { length: count } = this.state.areas;
    const { pageSize, currentPage, sortColumn, IsRequestDone } = this.state;
    const { totalCount, data: areas } = this.getPagedData();
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) window.location = process.env.PUBLIC_URL + "/";
    return (
      <React.Fragment>
        <Modal
          modalId="delete_area"
          dataId={this.state.modalData}
          handleDelete={this.handleDelete}
        />
        {isLoggedIn && (
          <section id="area-management" dir="rtl">
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
                {!IsRequestDone && (
                  <div className="col">
                    <Lds />
                  </div>
                )}
                {IsRequestDone && count === 0 && (
                  <div className="col" dir="rtl">
                    منطقه ای پیدا نشد :(
                  </div>
                )}
                {IsRequestDone && count !== 0 && (
                  <div className="col">
                    <p className="small">نتیجه: {totalCount} منطقه</p>
                    <AreasTable
                      areas={areas}
                      sortColumn={sortColumn}
                      onEdit={this.handleEdit}
                      onClick={this.handleModal}
                      onView={this.handleView}
                      onSort={this.handleSort}
                    />
                    <Pagination
                      itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default AreaManagement;
