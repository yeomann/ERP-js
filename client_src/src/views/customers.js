import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
import Loader from "react-loader";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody
} from "shards-react";
import { connect } from "react-redux";
import { getCustomers, deleteCustomer } from "../actions/GeneralAction";
import PageTitle from "../components/common/PageTitle";

export class Customers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { customerId: "", open: false };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.props.getCustomers(true);
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

  renderCustomer(loader, categories) {
    if (!loader && Object.keys(categories).length !== 0) {
      return categories.map((item, indx) => (
        <Row key={item.id} className="border mb-1">
          <Col className="align-center d-flex">
            {/* <Link to={`/edit-category/${item.id}`} className="cat-title"> */}
            <span className="countStyle">{indx + 1}</span> - {item.email}
            {/* </Link> */}
          </Col>
          <Col className="align-center d-flex">
            <span>{item.id}</span>
          </Col>
          <Col className="d-flex justify-right align-center">
            {/* <Link to={`/edit-category/${item.id}`} className="cat-edit-link">
              Edit
            </Link> */}
            <Button
              onClick={
                // () => this.toggle(item.id)
                () => alert("Disable for security purposes, use API to delete customer.")
              }
              squared
              outline
              theme="danger"
            >
              Delete
            </Button>
          </Col>
        </Row>
      ));
    } else if (!loader && Object.keys(categories).length === 0) {
      return null;
    }
    return <div>loading ...</div>;
  }

  render() {
    const { open } = this.state;
    const {
      customers: allCustomers,
      customerLoader: loader,
      deleteCustomerLoader: deleteLoader
    } = this.props;
    const customerNotFound =
      !this.props.customerLoader && Object.keys(this.props.customers).length === 0;
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
            title="Registered Customers"
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
                  <Col>{this.renderCustomer(loader, allCustomers)}</Col>
                </CardBody>
              </Card>
            </Loader>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    // get
    customerLoader: state.general.customerLoader,
    customers: state.general.customers,
    // delete
    deleteCustomerLoader: state.general.deleteCustomerLoader,
    deleteCustomerStatus: state.general.deleteCustomerStatus
  };
};

export default connect(
  mapStateToProps,
  {
    getCustomers,
    deleteCustomer
  }
)(Customers);
