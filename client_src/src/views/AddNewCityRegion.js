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
  // CardFooter,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormInput,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import ChooseRegions from "./cityAndRegion/chooseRegions";
import ChooseCity from "./cityAndRegion/chooseCities";
import PageTitle from "../components/common/PageTitle";
import { postCity } from "../actions/GeneralAction";
import { CitiesAndRegionsContext } from "./cityAndRegion/citiesRegionProvider";

class AddNewCityRegion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valid: null,
      invalid: null,
      selectedCity: {},
      selectedRegions: [],
      didweAddedCategory: false,
      didweAddedRegion: false,
      open: false
    };
    // bind
    this.onSaveRegions = this.onSaveRegions.bind(this);
    this.toggle = this.toggle.bind(this);
    // create a ref to store the textInput DOM element
    this.cityInput = React.createRef();
    this.cityComponents = React.createRef();
    this.regionsComponents = React.createRef();
  }

  componentWillUnmount() {
    this.setValid();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (nextProps.addNewCategoryStatus !== prevState.didweAddedCategory) {
      // category is added
      return { didweAddedCategory: nextProps.addNewCategoryStatus };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  componentDidUpdate(prevProps, prevState) {
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    if (prevState.didweAddedCategory !== this.state.didweAddedCategory) {
      // New Category was added successfully, we can update Component here to notify.
      this.resetFileState(); // we want to reset logo of component
    }
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }
  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });
  resetCityInput() {
    return (this.cityInput.current.value = "");
  }

  // on submit call for adding new city
  // first verification, if it's given input is valid or not
  addNewCity = () => {
    const inputNodeVal = this.cityInput.current.value;
    // not valid
    if (inputNodeVal.length === 0) return this.setInValid();
    // everything looks good, we can go ahead and do changes
    this.setValid();
    this.resetCityInput();
    this.toggle(); // to hide the model
    // calling Server now
    return this.props.postCity(inputNodeVal);
  };

  saveSelectedRegions = state =>
    this.setState({
      ...this.state.selectedRegions,
      selectedRegions: state
    });

  onSaveRegions(context) {
    console.log("%c get context city and regions", "background:red;color:white");
    console.log(context);
  }

  render() {
    const { open } = this.state;
    const { title, addNewCatLoaded: NewCategoryAdded } = this.props;
    // const { files } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New City and Select Region"
            subtitle={process.env.REACT_APP_SECRET_APP_NAME}
            className="text-sm-left"
          />
        </Row>

        <Row>
          {/* Sidebar Widgets */}
          <Col lg="12" md="12">
            <Card small className="mb-3">
              <Loader loaded={!NewCategoryAdded}>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">{title}</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="px-3 mt-3">
                    <Button theme="dark" outline squared onClick={this.toggle}>
                      Create City!
                    </Button>
                  </div>
                  {/* Model */}
                  <Modal open={open} toggle={this.toggle}>
                    <ModalHeader>Add City</ModalHeader>
                    <ModalBody>
                      <p>New City will automatically appear below in "Choose City" dropdown.</p>
                      <ListGroup flush>
                        <ListGroupItem className="d-flex px-3">
                          <InputGroup className="ml-auto">
                            <FormInput
                              placeholder="Write city name here"
                              size="lg"
                              innerRef={this.cityInput}
                              valid={this.state.valid}
                              invalid={this.state.invalid}
                            />
                            <InputGroupAddon type="append">
                              <Button className="px-2" onClick={this.addNewCity}>
                                Add New City <i className="material-icons">add</i>
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </ListGroupItem>
                      </ListGroup>
                    </ModalBody>
                  </Modal>
                </CardBody>
                <section className="text-left">
                  <Card className="m-3">
                    <CitiesAndRegionsContext.Consumer>
                      {context => (
                        <React.Fragment>
                          <CardHeader>
                            <h5>Select City</h5>
                          </CardHeader>
                          <CardBody className="pb-0">
                            <ChooseCity
                              ref={this.cityComponents}
                              passSelectedCity={city =>
                                this.regionsComponents.current.remoteCitySelect(city)
                              }
                            />
                            <ChooseRegions ref={this.regionsComponents} />
                          </CardBody>
                          {/* <CardFooter className="p-0">
                            <Button
                              theme="dark"
                              block
                              squared
                              onClick={this.onSaveRegions.bind(this, context.getCityRegions())}
                            >
                              Save!
                            </Button>
                          </CardFooter> */}
                        </React.Fragment>
                      )}
                    </CitiesAndRegionsContext.Consumer>
                  </Card>
                </section>
              </Loader>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

AddNewCityRegion.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

AddNewCityRegion.defaultProps = {
  title: "Write entry below"
};

export default connect(
  null,
  {
    postCity
  }
)(AddNewCityRegion);
