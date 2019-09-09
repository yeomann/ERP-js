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
  Modal,
  ModalHeader,
  Badge,
  ModalBody
} from "shards-react";
import { connect } from "react-redux";
import { getOrders, deleteOrder } from "../actions/OrderAction";
import PageTitle from "../components/common/PageTitle";

export class Orders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { OrderId: "", open: false };
    this.toggle = this.toggle.bind(this);
    this.showBadge = this.showBadge.bind(this);
  }
  componentDidMount() {
    // if (this.props.location.state === void 0) checking if this is coming from Order Details page
    // In other wordes we are checking if someone click back button from Order Details page
    // whole idea is that we don't need send another request to server
    if (this.props.location.state === void 0) this.props.getOrders(true);
  }
  toggle(id: "") {
    this.setState({
      open: !this.state.open,
      OrderId: id
    });
  }
  delete = () => {
    console.log(this.state.OrderId);
    this.toggle(); // reset the id and close the shit confirmation
    // this.props.deleteOrder(this.state.OrderId);
  };

  showBadge(badgeText) {
    if (badgeText === "pending") {
      return <Badge theme="danger">{badgeText}</Badge>;
    } else if (badgeText === "recieved") {
      return <Badge theme="warning">{badgeText}</Badge>;
    } else {
      return <Badge theme="success">{badgeText}</Badge>;
    }
  }

  renderOrders(loader, orders) {
    if (!loader && Object.keys(orders).length !== 0) {
      return orders.map((item, indx) => (
        <Row key={item.id} className="border mb-1">
          <Col lg="5" className="d-flex align-center">
            <Link to={`/order-details/${item.id}`} className="cat-title">
              <div className="orderTitle">
                <div>
                  <span className="orderIDcount countStyle">
                    {indx + 1}
                    &nbsp;{"-"}&nbsp;
                  </span>
                  <span>{item.id}</span>
                </div>
                <div className="orderIDlabel countStyle">OrderID</div>
              </div>
            </Link>
          </Col>
          <Col lg="2" className="d-flex justify-center align-center">
            {item.restaurants.name}
          </Col>
          <Col lg="2" className="d-flex justify-center align-center">
            <div>
              <div className="orderTitle">
                <span>{this.showBadge(item.orderStatus)}</span>
              </div>
              <div className="orderIDlabel countStyle ml-0">Order Status</div>
            </div>
          </Col>
          <Col lg="3" className="d-flex justify-center">
            <div>
              <div className="orderTitle">
                <span>{item.customer.id}</span>
              </div>
              <div className="orderIDlabel countStyle ml-0">CustomerID</div>
            </div>
          </Col>
          {/* <Col lg="2" className="d-flex justify-right align-center">
            <Button onClick={() => this.toggle(item.id)} squared outline theme="danger">
              Delete
            </Button>
          </Col> */}
        </Row>
      ));
    } else if (!loader && Object.keys(orders).length === 0) {
      return null;
    }
    return <div>loading ...</div>;
  }

  render() {
    const { open } = this.state;
    const { orders: allOrders, ordersLoader: loader, deleteOrderLoader: deleteLoader } = this.props;
    const ordersNotFound = !this.props.ordersLoader && Object.keys(this.props.orders).length === 0;
    return (
      <Container fluid className="main-content-container px-4">
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>Delete Action</ModalHeader>
          <ModalBody>
            <p>
              Are you sure that you want to delete customer Order? All the related Order data will
              be lost for forever
            </p>
            <Button onClick={this.delete}>Ok, Delete it!</Button>
          </ModalBody>
        </Modal>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="All Orders"
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
                  <span className="m-0">{ordersNotFound ? "No Order found." : ""}</span>
                </CardHeader>
                <CardBody className="p-1">
                  <Col>{this.renderOrders(loader, allOrders)}</Col>
                  {/* {JSON.stringify(allOrders, null, 4)} */}
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
    ordersLoader: state.order.ordersLoader,
    orders: state.order.orders,
    // delete
    deleteOrderLoader: state.order.deleteOrderLoader,
    deleteOrderStatus: state.order.deleteOrderStatus
  };
};

export default connect(
  mapStateToProps,
  {
    getOrders,
    deleteOrder
  }
)(Orders);
