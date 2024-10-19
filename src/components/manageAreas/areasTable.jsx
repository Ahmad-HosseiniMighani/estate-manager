import React, { Component } from "react";
import Table from "../common/table/table";
// import auth from "../../services/authService";

class AreasTable extends Component {
    columns = [
        { path: "id", label: "کد" },
        { path: "area_name", label: "منطقه" },
        {
            label: "مدیریت",
            key: "manage",
            content: (
                areas // fix it
            ) => (
                <React.Fragment>
                {/* <button
                    onClick={() => this.props.onView(areas)}
                    className="btn btn-outline-primary btn-sm"
                    style={{ height: "35px", width: "35px" }}
                >
                    <i className="fas fa-eye d-flex align-self-center justify-content-center py-1"></i>
                </button> */}
                <button
                    onClick={() => this.props.onEdit(areas)}
                    className="btn btn-outline-info btn-sm mx-2"
                    style={{ height: "35px", width: "35px" }}
                >
                    <i className="fas fa-edit d-flex align-self-center justify-content-center py-1"></i>
                </button>
                <button
                    onClick={() => this.props.onClick(areas.documentId)}
                    className="btn btn-outline-danger btn-sm"
                    style={{ height: "35px", width: "35px" }}
                >
                    <i className="fas fa-trash-alt d-flex align-self-center justify-content-center py-1"></i>
                </button>
                </React.Fragment>
            ),
        },
    ];
    shortendTitle(areas) {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i].area_name.length > 50) {
                areas[i].area_name = areas[i].area_name.slice(0, 47) + "...";
            }
        }
        return areas;
    }
    render() {
        const { onSort, sortColumn } = this.props;
        let { areas } = this.props;
        areas = this.shortendTitle(areas);
        return (
            <Table
                columns={this.columns}
                data={areas}
                sortColumn={sortColumn}
                onSort={onSort}
        />
        );
    }
}
 
export default AreasTable;