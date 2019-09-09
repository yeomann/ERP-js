import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Modal,
  ModalHeader,
  ModalBody
} from "shards-react";
import { connect } from "react-redux";
import { getCustomers, deleteCustomer } from "../actions/GeneralAction";
import PageTitle from "../components/common/PageTitle";

export class CustomerContactList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { customerId: "", open: false };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    // this.props.getCustomers(true);
  }
  toggle(id: "") {
    this.setState({
      open: !this.state.open,
      customerId: id
    });
  }
  delete = () => {
    console.log(this.state.customerId);
    this.toggle(); // reset the id and close the shit confirmation
    this.props.deleteCustomer(this.state.customerId);
  };

  renderCustomerContactList(loader, customerContactList) {
    if (!loader && Object.keys(customerContactList).length !== 0) {
      return customerContactList.map((item, indx) => (
        <tr key={item.id}>
          <td>{++indx}</td>
          <td>{item.name}</td>
          <td>
            <u>{item.phoneNo}</u>
          </td>
          <td>{item.whichCompany}</td>
          <td>{item.OfficeNo}</td>
          <td>
            <Badge>{item.emailAddress}</Badge>
          </td>
          <td width="200">
            <Link to={`/edit-customer-contact-list/${item.id}`} className="cat-edit-link">
              Edit
            </Link>
          </td>
          <td width="200">
            <Button
              onClick={() => alert("Disable for security purposes, use API to delete customer.")}
              // onClick={() => this.delete(item.id)}
              squared
              outline
              theme="danger"
            >
              Delete
            </Button>
          </td>
        </tr>
      ));
    } else if (!loader && Object.keys(customerContactList).length === 0) {
      return null;
    }
    return <div>loading ...</div>;
  }

  render() {
    const { open } = this.state;
    const {
      customerContactList: allCustomerContactList,
      customerContactLoader: loader,
      deleteCustomerContactListLoader: deleteLoader
    } = this.props;
    const customerNotFound =
      !this.props.customerContactLoader && Object.keys(this.props.customerContactList).length === 0;
    return (
      <Container fluid className="main-content-container px-4">
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>Delete Action</ModalHeader>
          <ModalBody>
            <p>
              Are you sure that you want to delete your customer? All the related Order data will be
              lost for forever
            </p>
            <Button onClick={this.delete}>Ok, Delete it!</Button>
          </ModalBody>
        </Modal>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Customer Contact List"
            subtitle={process.env.REACT_APP_SECRET_APP_NAME}
            className="text-sm-left"
          />
        </Row>
        {/* Categories */}
        <Row>
          <Col>
            <Loader loaded={!deleteLoader}>
              <Card small className="mb-4">
                <CardHeader>
                  <span className="m-0">
                    {customerNotFound ? "No Customer has been registered yet." : ""}
                  </span>
                </CardHeader>
                <CardBody className="p-1">
                  {/* <Col>{this.renderCustomerContactList(loader, allCustomerContactList)}</Col> */}
                  <table className="table mb-0 restaurant-table">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0 bold">
                          #
                        </th>
                        <th scope="col" className="border-0 bold">
                          Name
                        </th>
                        <th scope="col" className="border-0 bold">
                          Phone No
                        </th>
                        <th scope="col" className="border-0 bold">
                          Which Company
                        </th>
                        <th scope="col" className="border-0 bold">
                          Office No
                        </th>
                        <th scope="col" className="border-0 bold">
                          Email
                        </th>
                        <th scope="col" className="border-0 bold">
                          Edit
                        </th>
                        <th scope="col" className="border-0 bold">
                          1-Click Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.renderCustomerContactList(loader, allCustomerContactList)}</tbody>
                  </table>
                </CardBody>
              </Card>
            </Loader>
          </Col>
        </Row>
      </Container>
    );
  }
}

CustomerContactList.defaultProps = {
  customerContactLoader: false,
  customerContactList: [
    {
      id: 0,
      name: "Person 1",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    },
    {
      id: 1,
      name: "Person 2",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    },
    {
      id: 2,
      name: "Person 3",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    },
    {
      id: 3,
      name: "Person 4",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    },
    {
      id: 4,
      name: "Person 5",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    },
    {
      id: 5,
      name: "Person 6",
      phoneNo: "05338564166",
      whichCompany: "Test Company",
      OfficeNo: "05438564122",
      emailAddress: "test@company.xyz"
    }
  ]
};

const mapStateToProps = state => {
  return {
    // get
    customerContactLoader: state.general.customerContactLoader,
    customerContactList: state.general.customerContactList,
    // delete
    deleteCustomerContactListLoader: state.general.deleteCustomerContactListLoader,
    deleteCustomerContactListStatus: state.general.deleteCustomerContactListStatus
  };
};

export default connect(
  mapStateToProps,
  {
    getCustomers,
    deleteCustomer
  }
)(CustomerContactList);
