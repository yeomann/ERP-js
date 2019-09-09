import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
// import UsersByDevice from "./../components/blog/UsersByDevice";
// import NewDraft from "./../components/blog/NewDraft";
// import Discussions from "./../components/blog/Discussions";
// import TopReferrals from "./../components/common/TopReferrals";
// redux action
import { getRestaurants, getCustomers } from "./../actions/GeneralAction";
import { getOrders } from "../actions/OrderAction";

export class DashboardOverview extends React.PureComponent {
  componentDidMount() {
    // this.props.getRestaurants(false);
    // this.props.getCustomers(false);
    // this.props.getOrders(false);
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Statistics Overview"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>

        <Row>
          <Col lg="12" style={{ marginBottom: "2rem" }}>
            <SmallStats
              variation="1"
              chartData={[
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(0, 184, 216, 0.1)",
                  borderColor: "rgb(0, 184, 216)",
                  data: [1, 2, 1, 3, 5, 4, 7]
                }
              ]}
              chartLabels={[null, null, null, null, null, null, null]}
              label="No of Registered Restaurants in the System"
              value={this.props.restaurantsCount}
            />
          </Col>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>
          <Col lg="4" md="6" sm="12" className="mb-4">
            <div style={{ marginTop: "0rem" }}>
              <SmallStats
                variation="1"
                chartData={[
                  {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(0, 184, 216, 0.1)",
                    borderColor: "rgb(23,198,113)",
                    data: [2, 3, 3, 3, 4, 3, 3]
                  }
                ]}
                chartLabels={[null, null, null, null, null, null, null]}
                label="Total Orders"
                value={this.props.ordersCount}
              />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <SmallStats
                variation="1"
                chartData={[
                  {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgb(255,180,0)",
                    data: [5, 7, 1, 3, 1, 4, 8]
                  }
                ]}
                chartLabels={[null, null, null, null, null, null, null]}
                label="Customer Count"
                value={this.props.customersCount}
              />
            </div>
          </Col>
          {/* Users by Device */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col> */}

          {/* New Draft */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col> */}

          {/* Discussions */}
          {/* <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col> */}

          {/* Top Referrals */}
          {/* <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col> */}
        </Row>
      </Container>
    );
  }
}

DashboardOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

DashboardOverview.defaultProps = {
  smallStats: [
    {
      label: "Posts",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Pages",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Comments",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "New Customers",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Subscribers",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ]
};

const mapStateToProps = state => {
  return {
    // get all restaurants
    restLoader: state.general.restLoader,
    restaurantsCount: state.general.restaurantsCount,
    // get customers
    customerLoader: state.general.customerLoader,
    customersCount: state.general.customersCount,
    // get orders
    ordersLoader: state.order.ordersLoader,
    ordersCount: state.order.ordersCount
  };
};

export default connect(
  mapStateToProps,
  {
    getRestaurants,
    getCustomers,
    getOrders
  }
)(DashboardOverview);
