import React from "react";
import { MDBDataTable } from "mdbreact";


const DatatablePage = (dat) => {
  
 const data = dat.data
  return <MDBDataTable striped hover dark data={data} />;
};

export default DatatablePage;
