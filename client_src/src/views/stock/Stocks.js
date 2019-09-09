import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from "shards-react";
import { connect } from "react-redux";
import { getCategories, deleteCategory } from "../../actions/GeneralAction";
import PageTitle from "../../components/common/PageTitle";

export class Stocks extends PureComponent {
  componentDidMount() {
    // if (this.props.location.state === void 0) checking if this is coming from EDIT page
    // In other worder we are checking if someone click back button from edit category page
    // whole idea is that we don't need send another request to server
    if (this.props.location.state === void 0) this.props.getCategories(true);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    // console.log(this.props);
    // if (prevProps.deleteCategoryStatus === this.props.deleteCategoryStatus) {
    // this.props.getCategories();
    // }
  }

  delete = id => {
    console.log(id);
    this.props.deleteCategory(id);
  };

  renderCategories(loader, categories) {
    if (!loader && Object.keys(categories).length !== 0) {
      return categories.map((item, indx) => (
        <Row key={item.catId} className="border mb-1">
          <Col className="align-center d-flex">
            <Link to={`/edit-category/${item.catId}`} className="cat-title">
              <span className="countStyle">{indx + 1}</span> - {item.name}
            </Link>
          </Col>
          <Col className="d-flex justify-right align-center">
            <Link to={`/edit-category/${item.catId}`} className="cat-edit-link">
              Edit
            </Link>
            <Button onClick={() => this.delete(item.catId)} squared outline theme="danger">
              Delete
            </Button>
          </Col>
        </Row>
      ));
    } else if (!loader && Object.keys(categories).length === 0) {
      return (
        <div>
          No Categories Found. <Link to="/add-category">Click here to add New Category</Link>
        </div>
      );
    }
    return <div>loading ...</div>;
  }

  render() {
    const {
      categories: allCategories,
      catLoader: loader,
      deleteCatLoader: deleteLoader
    } = this.props;
    const catNotFound = !this.props.catLoader && Object.keys(this.props.categories).length === 0;
    // console.log(!this.props.catLoader && Object.keys(this.props.categories).length === 0);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="All Categories"
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
                    {catNotFound ? (
                      <Link to="/add-category">Add Category</Link>
                    ) : (
                      "Qucik edit by Click on any Category"
                    )}
                  </span>
                </CardHeader>
                <CardBody className="p-1">
                  <Col>{this.renderCategories(loader, allCategories)}</Col>
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
    catLoader: state.general.catLoader,
    categories: state.general.categories,
    // delete
    deleteCatLoader: state.general.deleteCatLoader,
    deleteCategoryStatus: state.general.deleteCategoryStatus
  };
};

export default connect(
  mapStateToProps,
  {
    getCategories,
    deleteCategory
  }
)(Stocks);
