import React from "react";
// import { Form, InputGroup, InputGroupAddon, InputGroupText, FormInput } from "shards-react";
let date = new Date();
const hour = date.getHours();

function greetMessg() {
  if (hour < 12) {
    return "Hello Admin, Good Morning!";
  } else if (hour < 18) {
    return "Hello Admin, Good Afternoon!";
  } else {
    return "Hello Admin, Good Evening!";
  }
}

export default () => (
  <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex align-center">
    <p className="mb-0 pl-3">{greetMessg()}</p>
  </div>
  // <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
  //   <InputGroup seamless className="ml-3">
  //     <InputGroupAddon type="prepend">
  //       <InputGroupText>
  //         <i className="material-icons">search</i>
  //       </InputGroupText>
  //     </InputGroupAddon>
  //     <FormInput className="navbar-search" placeholder="Search for something..." />
  //   </InputGroup>
  // </Form>
);
