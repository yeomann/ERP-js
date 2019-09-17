import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import { Container, Row, Col, Card, CardBody, Button, Badge } from "shards-react";
// components
import PageTitle from "../../components/common/PageTitle";
// Action
// import { getRestaurants, deleteRestaurant, getCategories } from "../../actions/GeneralAction";
import { toast } from "react-toastify";

const TOAST_OPTION = {
  autoClose: 5500
};

export class HRSystemList extends PureComponent {
  componentDidMount() {
    // if (this.props.location.state === void 0) this.props.getRestaurants(true);
    // this.props.getRestaurants(true);
    // this.props.getCategories(false);
  }

  delete = id => {
    console.log(id);
    this.props.deleteRestaurant(id);
  };

  showOutOfOrderFunc = (status, restaurantcredentialIdFk, telegramBotStatus, telegramBotIdFk) => {
    console.log(`status => ${status}`);
    const FLAG = {
      openCloseStatus: false,
      restaurantcredentialId: false,
      telegramBotCheck: false
    };
    // check for open close status
    if (status === "true" || status === true) {
      FLAG.openCloseStatus = true;
    } else {
      FLAG.openCloseStatus = false;
    }
    // restaurantcredentialIdFk
    if (restaurantcredentialIdFk) {
      FLAG.restaurantcredentialId = true;
    } else {
      FLAG.restaurantcredentialId = false;
    }
    // telegramBotCheck
    if (telegramBotIdFk && telegramBotStatus.toLowerCase() === "yes") {
      FLAG.telegramBotCheck = true;
    } else {
      FLAG.telegramBotCheck = false;
    }

    if (FLAG.openCloseStatus && FLAG.restaurantcredentialId && FLAG.telegramBotCheck) {
      return <Badge theme="success">Restaurant is live!</Badge>;
    }
    return (
      <Badge
        theme="danger"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (
            FLAG.openCloseStatus === false &&
            FLAG.restaurantcredentialId === false &&
            FLAG.telegramBotCheck === false
          ) {
            toast.error(
              "Open Close Status is false, Restaurant credentials are not created and Telegram Bot Setup is not completed!",
              TOAST_OPTION
            );
          } else if (FLAG.openCloseStatus === false && FLAG.restaurantcredentialId === false) {
            toast.error(
              "Open Close Status is false, Restaurant credentials are not created!",
              TOAST_OPTION
            );
          } else if (FLAG.openCloseStatus === false && FLAG.telegramBotCheck === false) {
            toast.error(
              "Open Close Status is false, Telegram Bot Setup is not completed!",
              TOAST_OPTION
            );
          } else if (FLAG.restaurantcredentialId === false && FLAG.telegramBotCheck === false) {
            toast.error(
              "Telegram Bot Setup is not completed and Restaurant credentials are not created!",
              TOAST_OPTION
            );
          } else if (FLAG.openCloseStatus === false) {
            toast.error("Open Close Status is false", TOAST_OPTION);
          } else if (FLAG.restaurantcredentialId === false) {
            toast.error("Restaurant credentials are not created", TOAST_OPTION);
          } else if (FLAG.telegramBotCheck === false) {
            toast.error("Telegram Bot Setup is not completed", TOAST_OPTION);
          }
        }}
      >
        <u>Out of order Restaurant</u>
      </Badge>
    );
  };

  showCategoryName = id => {
    // Object.keys(categories).length !== 0
    const { catLoader, categories } = this.props;
    if (!catLoader && Object.keys(categories).length !== 0) {
      const catObject = categories.filter(obj => {
        return obj.catId === id;
      });
      return catObject[0].name;
      // .map(item => item.catId);
    }
    return <div>loading ...</div>;
  };

  renderStocksList(loader, restaurants) {
    if (!loader && Object.keys(restaurants).length !== 0) {
      return restaurants.map((item, indx) => (
        <tr key={item.restId}>
          <td>{++indx}</td>
          <td>
            <Link
              style={{ margin: 0 }}
              to={`/edit-restaurant/${item.restId}/true`}
              className="cat-edit-link m0"
            >
              {item.name}
            </Link>
          </td>
          <td>
            {item.restaurantcredentialIdFk ? (
              <span className="green">Exsits</span>
            ) : (
              <Link
                style={{ margin: 0 }}
                to={`/restaurant-credentials`}
                className="cat-edit-link m0"
              >
                <Badge outline theme="danger">
                  Setup now!
                </Badge>
              </Link>
            )}
          </td>
          <td>
            {item.telegramBotStatus.toLowerCase() === "yes" ? (
              <Badge theme="success">Yes</Badge>
            ) : (
              <Badge outline theme="danger">
                No
              </Badge>
            )}
          </td>
          <td>
            <Badge theme="dark">{this.showCategoryName(item.categoryIdFK)}</Badge>
          </td>
          <td>
            <strong className="bold">{item.mainCityObject.label}</strong>
          </td>
          <td>
            {this.showOutOfOrderFunc(
              item.openCloseStatus,
              item.restaurantcredentialIdFk,
              item.telegramBotStatus,
              item.telegramBotIdFk
            )}
          </td>
          <td width="200">
            <Link to={`/edit-restaurant/${item.restId}/true`} className="cat-edit-link">
              Edit
            </Link>
          </td>
          <td width="200">
            <Button onClick={() => this.delete(item.restId)} squared outline theme="danger">
              Delete
            </Button>
          </td>
        </tr>
      ));
    } else if (!loader && Object.keys(restaurants).length === 0) {
      return (
        <tr>
          <td className="p-3">No entery found in HR module of ERP system.</td>
        </tr>
      );
    }
    return (
      <tr>
        <td className="p-3">loading ... </td>
      </tr>
    );
  }

  render() {
    const {
      restaurants: allStocks,
      restLoader: loader,
      deleteRestLoader: deleteLoader,
      history
    } = this.props;
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4 d-flex justify-between">
            <PageTitle
              sm="4"
              title="HR System List"
              subtitle={process.env.REACT_APP_SECRET_APP_NAME}
              className="text-sm-left"
            />
            <Button squared theme="info" size="lg" onClick={() => history.push("/add-HR-entery")}>
              Add new entery
            </Button>
          </Row>
          {/* Default Light Table */}
          <Row>
            <Col>
              <Loader loaded={!deleteLoader}>
                <Card small className="mb-4">
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0 restaurant-table">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0 bold">
                            #
                          </th>
                          <th scope="col" className="border-0 bold">
                            Stock Name
                          </th>
                          <th scope="col" className="border-0">
                            Date & Time
                          </th>
                          <th scope="col" className="border-0">
                            <u>View Products Information</u>
                          </th>
                          <th scope="col" className="border-0">
                            <u>Edit Blelow</u>
                          </th>
                          <th scope="col" className="border-0 bold">
                            1-Click Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.renderStocksList(loader, allStocks)}</tbody>
                    </table>
                  </CardBody>
                </Card>
              </Loader>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // get all restaurants
    restLoader: state.general.restLoader,
    restaurants: state.general.restaurants,
    // delete restaurants
    deleteRestLoader: state.general.deleteRestLoader,
    deleteRestegoryStatus: state.general.deleteRestegoryStatus,
    // categories
    catLoader: state.general.catLoader,
    categories: state.general.categories
  };
};

export default connect(
  mapStateToProps,
  {
    // getRestaurants,
    // deleteRestaurant,
    // getCategories
  }
)(HRSystemList);
