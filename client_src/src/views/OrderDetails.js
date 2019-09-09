import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { getOrderDetails } from "../actions/OrderAction";

class OrderDetails extends PureComponent {
  componentDidMount() {
    // id is coming from the url {this.props.match.params.id}
    this.props.getOrderDetails(this.props.match.params.id);
  }

  renderOrderedItems = orderedItems => {
    return orderedItems.map((item, indx) => (
      <tr key={item.id}>
        <td>{++indx}</td>
        <td>{item.restaurantName}</td>
        <td>{item.restaurantMinPrice}</td>
        <td>{item.title}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
      </tr>
    ));
  };

  render() {
    const { title, orderDetailsLoader: editLoaded, orderDetails } = this.props;
    if (orderDetails[0])
      return (
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4" style={{ justifyContent: "space-between" }}>
            <PageTitle
              sm="4"
              title="Order Details"
              subtitle={process.env.REACT_APP_SECRET_APP_NAME}
              className="text-sm-left"
            />
            <Button
              theme="white"
              className="px-2"
              onClick={() =>
                this.props.history.replace("/getAllOrders", {
                  isComingBack: true
                })
              }
            >
              <i className="material-icons">arrow_back_ios</i> Back
            </Button>
          </Row>

          <Row>
            {/* Sidebar Widgets */}
            <Col lg="12" md="12">
              <div small className="mb-3">
                <Loader loaded={!editLoaded}>
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                  </CardHeader>
                  {/* Details Comes here */}
                  {/* {JSON.stringify(orderDetails[0].orderInfo)} */}
                  <Card className="mt-1">
                    <CardBody className="p-2">
                      <ListGroup className="mt-1">
                        <ListGroupItem>
                          <div className="d-flex justify-between">
                            <span>
                              {" "}
                              <strong className="bold">OrderId:</strong> {orderDetails[0].orderId}
                            </span>
                            <span>
                              <strong className="bold">OrderDetailsId:</strong> {orderDetails[0].id}
                            </span>
                          </div>
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong className="bold">Selected Payment Info:</strong>{" "}
                          {orderDetails[0].paymentInfo}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong className="bold">Additional Notes:</strong>{" "}
                          {orderDetails[0].additionalNotes}
                        </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Card>

                  <Card className="mt-2 mb-2">
                    <CardHeader>
                      <h4>Ordered Items</h4>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <table className="table mb-0 restaurant-table">
                        <thead className="bg-light">
                          <tr>
                            <th scope="col" className="border-0 bold">
                              #
                            </th>
                            <th scope="col" className="border-0">
                              Restaurant Name
                            </th>
                            <th scope="col" className="border-0">
                              Restaurant Accepted Min Price
                            </th>
                            <th scope="col" className="border-0">
                              Product Title
                            </th>
                            <th scope="col" className="border-0">
                              Quantity
                            </th>
                            <th scope="col" className="border-0">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.renderOrderedItems(orderDetails[0].orderInfo[0])}</tbody>
                      </table>
                    </CardBody>
                  </Card>
                  <div className="mt-1">
                    <Card>
                      <CardHeader>
                        <h4>Customer Address</h4>
                        <strong className="bold">Saved Title by Customer:</strong>&nbsp;
                        {orderDetails[0].addressInfo.ITEM.addressTitle}
                        <span className="d-flex mb-2">
                          {" "}
                          <strong className="bold">Address Type:&nbsp;</strong>
                          <Badge>{orderDetails[0].addressInfo.ITEM.addressType}</Badge>
                        </span>
                      </CardHeader>
                      <CardBody className="pt-0 pb-0">
                        <span className="d-flex mb-2">
                          <strong className="bold">Address Description:&nbsp;</strong>
                          <h5>{orderDetails[0].addressInfo.ITEM.addressDescription}</h5>
                        </span>
                        <InputGroup className="mb-2">
                          <InputGroupAddon type="prepend">
                            <InputGroupText>Mobile No</InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            placeholder={orderDetails[0].addressInfo.ITEM.mobileNo}
                            readOnly
                          />
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon type="prepend">
                            <InputGroupText>Phone No</InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            placeholder={orderDetails[0].addressInfo.ITEM.phoneNo}
                            readOnly
                          />
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon type="prepend">
                            <InputGroupText>Company</InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            placeholder={orderDetails[0].addressInfo.ITEM.company}
                            readOnly
                          />
                        </InputGroup>
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex">
                          <span>
                            <strong className="bold">City:&nbsp;</strong>
                            <Badge outline theme="info">
                              {orderDetails[0].addressInfo.CITY.name}
                            </Badge>
                          </span>
                          <span className="ml-3">
                            <strong className="bold">Region:&nbsp;</strong>
                            <Badge outline theme="warning">
                              {orderDetails[0].addressInfo.REGION.name}
                            </Badge>
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* <p>{JSON.stringify(orderDetails[0], null, 4)}</p> */}
                </Loader>
              </div>
            </Col>
          </Row>
        </Container>
      );
    else {
      return <p>loading...</p>;
    }
  }
}

OrderDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

OrderDetails.defaultProps = {
  title: "See Order Details"
};

const mapStateToProps = state => {
  return {
    orderDetailsLoader: state.order.orderDetailsLoader,
    orderDetails: state.order.orderDetails
  };
};

export default connect(
  mapStateToProps,
  {
    getOrderDetails
  }
)(OrderDetails);
