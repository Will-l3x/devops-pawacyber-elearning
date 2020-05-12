import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: "Class",

        field: "class",
        sort: "asc",
        width: "20%",
      },
      {
        label: "Course",

        field: "course",
        sort: "asc",
        width: "20%",
      },
      {
        label: "Title",

        field: "title",
        sort: "asc",
        width: "20%",
      },

      {
        label: "Due Date",

        field: "due_date",
        sort: "asc",
        width: "20%",
      },
      {
        label: "Total",

        field: "total",
        sort: "asc",
        width: "20%",
      },
    ],
    rows: [
      {
        class: "Mathematics 4a",
        course: "coursename",
        title: "Tiger Nixon",
        due_date: "18 May",
        total: "100",
      },
      {
        course: "coursename",
        title: "Garrett Winters",
        due_date: "18 May",
        total: "100",
        class: "Mathematics 4a",
      },
    ],
  };

  return <MDBDataTable striped hover data={data} />;
};

export default DatatablePage;
