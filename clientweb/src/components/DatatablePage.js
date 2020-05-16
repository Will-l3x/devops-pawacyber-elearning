import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePage = (dat) => {
 const data = dat.data
  return <MDBDataTable striped hover data={data} />;
};

export default DatatablePage;
