import React, { Component } from "react";
import Table from "../common/table/table";
// import auth from "../../services/authService";

class NotificationsTable extends Component {
    columns = [
        { path: "id", label: "کد" },
        { path: "shortTitle", label: "تیتر" },
        { path: "shortDescription", label: "متن اعلان" },
        {
            label: "مدیریت",
            key: "manage",
            content: (
                notifs // fix it
            ) => (
                <React.Fragment>
                    <button
                        onClick={() => this.props.onView(notifs)}
                        className="btn btn-outline-info btn-sm mx-2"
                        style={{ height: "35px", width: "35px" }}
                    >
                        <i className="fas fa-eye d-flex align-self-center justify-content-center py-1"></i>
                    </button>
                    <button
                        onClick={() => this.props.onClick(notifs.documentId)}
                        className="btn btn-outline-danger btn-sm"
                        style={{ height: "35px", width: "35px" }}
                    >
                        <i className="fas fa-trash-alt d-flex align-self-center justify-content-center py-1"></i>
                    </button>
                </React.Fragment>
            ),
        },
    ];

    shortendTitle(notifs) {
        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].title.length > 50) {
                notifs[i].shortTitle = notifs[i].title.slice(0, 47) + "...";
            } else {
                notifs[i].shortTitle = notifs[i].title;
            }

            if (notifs[i].description.length > 50) {
                notifs[i].shortDescription = notifs[i].description.slice(0, 47) + "...";
            } else {
                notifs[i].shortDescription = notifs[i].description;
            }
        }

        return notifs;
    }

    render() {
        const { onSort, sortColumn } = this.props;
        let { notifs } = this.props;
        notifs = this.shortendTitle(notifs);

        return (
            <Table
                columns={this.columns}
                data={notifs}
                sortColumn={sortColumn}
                onSort={onSort}
        />
        );
    }
}
 
export default NotificationsTable;