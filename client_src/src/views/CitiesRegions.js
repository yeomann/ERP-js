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
  ModalBody,
  ListGroup,
  ListGroupItem,
  FormInput,
  InputGroup,
  InputGroupAddon
} from "shards-react";
import { connect } from "react-redux";
import { deleteCities, getCitiesRegions, editCity } from "../actions/GeneralAction";
import PageTitle from "../components/common/PageTitle";

export class CitiesRegions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editCityState: {}
    };
    this.refInput = React.createRef();
  }
  componentDidMount() {
    this.props.getCitiesRegions(true);
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });
  resetCityInput() {
    return (this.refInput.current.value = "");
  }

  editCityCall = item => {
    this.setState({
      editCityState: item
    });
    this.toggle();
  };

  editCityRemotely = () => {
    const { editCityState } = this.state;
    const inputNodeVal = this.refInput.current.value;
    // not valid
    if (inputNodeVal.length === 0) return this.setInValid();
    // everything looks good, we can go ahead and do changes
    this.setValid();
    this.resetCityInput();
    this.toggle("null"); // to hide the model
    // calling Server now
    // call to server 1
    this.props.editCity(editCityState.id, inputNodeVal);
  };

  delete = id => {
    console.log(id);
    this.props.deleteCities(id);
  };

  CitiesRegions = regions => {
    // console.log(regions, regions.length);
    if (regions.length !== 0) {
      return regions.map(item => (
        <Badge key={item.id} theme="dark">
          {item.name}
        </Badge>
      ));
    }
    return <span>No regions found</span>;
  };

  renderCities = (loader, ciites) => {
    if (!loader && Object.keys(ciites).length !== 0) {
      return ciites.map((item, indx) => (
        <Row key={item.id} className="border mb-1 p-2 mt-2">
          <Col className="align-center d-flex">
            <span className="countStyle">{indx + 1}</span> - {item.name}
          </Col>
          <Col className="align-center d-flex">
            <div className="cityRegions-badges-container">{this.CitiesRegions(item.regions)}</div>
          </Col>
          <Col className="d-flex justify-right align-center">
            <Button
              onClick={() => this.editCityCall(item)}
              squared
              outline
              className="cat-edit-link"
            >
              Edit
            </Button>
            <Button onClick={() => this.delete(item.id)} squared outline theme="danger">
              Delete
            </Button>
          </Col>
        </Row>
      ));
    } else if (!loader && Object.keys(ciites).length === 0) {
      return (
        <div>
          No Cities Found. <Link to="/add-city-region">Click here to add New City</Link>
        </div>
      );
    }
    return <div>loading ...</div>;
  };

  render() {
    const {
      citiesNRegions: allCities,
      citiesNRegionsLoader: loader,
      deleteCityLoader: deleteLoader
    } = this.props;
    const { open, editCityState } = this.state;
    const CitiesNotFound =
      !this.props.citiesNRegionsLoader && Object.keys(this.props.citiesNRegions).length === 0;

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
                    {CitiesNotFound ? (
                      <Link to="/add-city-region">Add Cities</Link>
                    ) : (
                      "Quick edit by Click on any City"
                    )}
                  </span>
                </CardHeader>
                <CardBody className="p-1">
                  <Col>{this.renderCities(loader, allCities)}</Col>
                  {/* Model */}
                  <Modal open={open} toggle={this.toggle}>
                    <ModalHeader>Edit City</ModalHeader>
                    <ModalBody>
                      <ListGroup flush>
                        <ListGroupItem className="d-flex px-3">
                          <InputGroup className="ml-auto">
                            <FormInput
                              placeholder={editCityState.name}
                              size="lg"
                              innerRef={this.refInput}
                              valid={this.state.valid}
                              invalid={this.state.invalid}
                            />
                            <InputGroupAddon type="append">
                              <Button className="px-2" onClick={this.editCityRemotely}>
                                Save Edit <i className="material-icons">edit</i>
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </ListGroupItem>
                      </ListGroup>
                      <p style={{ marginTop: "1rem" }}>
                        Note: You can edit <Badge>Regions</Badge> after selected City in "Add New
                        City & Region"
                      </p>
                    </ModalBody>
                  </Modal>
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
    citiesNRegionsLoader: state.general.citiesNRegionsLoader,
    citiesNRegions: state.general.citiesNRegions,
    // delete
    deleteCityLoader: state.general.deleteCityLoader,
    deleteCityStatus: state.general.deleteCityStatus
  };
};

export default connect(
  mapStateToProps,
  {
    deleteCities,
    getCitiesRegions,
    editCity
  }
)(CitiesRegions);
