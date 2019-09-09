import React, { PureComponent } from "react";
// import AsyncSelect from 'react-select/lib/Async';
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader";
import {
  Alert,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
  FormInput
} from "shards-react";
import {
  getRegions,
  postRegion,
  getSingleRegion,
  deleteRegion,
  editRegion
} from "../../actions/GeneralAction";
import { CitiesAndRegionsContext } from "../cityAndRegion/citiesRegionProvider";
// import { RestaurantContext } from "../../views/restaurant/restaurantProvider";

class AddEditRegions extends PureComponent {
  static contextType = CitiesAndRegionsContext;
  // static contextType = this.props.isFromRestraunt ? CitiesAndRegionsContext : RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      editRegion: {},
      open: false,
      openType: null,
      passSelectedCity: "",
      defualtRegions: [],
      regionsObjLocal: []
    };
    // bind
    this.timeout = this.timeout.bind(this);
    this.CitiesRegions = this.CitiesRegions.bind(this);
    this.addNewRegion = this.addNewRegion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    // create a ref to store the textInput DOM element
    this.regionInput = React.createRef();
    // this.regionEditInput = React.createRef();
  }

  componentDidMount() {
    this.props.getRegions(false);
  }

  // After loading saving the Category data for local use
  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (Object.keys(nextProps.regions) !== Object.keys(prevState.regionsObjLocal)) {
      // lets save category remote info into local state but we can't use setstate here
      return {
        regionsObjLocal: nextProps.regions.map(opt => ({ label: opt.name, value: opt.id }))
      };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  toggle(type) {
    this.setState({ open: !this.state.open, openType: type });
  }
  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });
  resetCityInput() {
    return (this.regionInput.current.value = "");
  }
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  CitiesRegions(regions) {
    if (typeof regions !== "undefined" && regions.length !== 0) {
      return regions.map(item => (
        <Badge key={item.id} className="ml-1" theme="dark">
          <span
            style={{ padding: "0.3rem", cursor: "pointer" }}
            onClick={() => this.editRegionById(item)}
          >
            {item.name}
          </span>
          <Button className="p-0 ml-2" onClick={() => this.deleteRegionByID(item.id)}>
            <i className="material-icons">close</i>
          </Button>
        </Badge>
      ));
    }
    return <h5 className="ml-2 d-inline-block">No regions found</h5>;
  }

  editRegionById = item => {
    this.setState(
      {
        editRegion: item
      },
      () => this.toggle("edit")
    );
  };

  addNewRegion = async () => {
    const inputNodeVal = this.regionInput.current.value;
    // not valid
    if (inputNodeVal.length === 0) return this.setInValid();
    // everything looks good, we can go ahead and do changes
    this.setValid();
    this.resetCityInput();
    this.toggle("null"); // to hide the model
    // calling Server now
    const cityId = this.state.passSelectedCity.value;
    // call to server 1
    this.props.postRegion(cityId, inputNodeVal);
    // TODO: // fix in redux
    await this.timeout(1500);
    // call to server 2
    const selectedRegion = await this.props.getSingleRegion(cityId);
    return this.setState({
      defualtRegions: selectedRegion
      // defualtRegions: selectedRegion.map(item=>({ label: item.name, value: item.id}))
    });
  };
  editRegionRemotely = async regionId => {
    const inputNodeVal = this.regionInput.current.value;
    // not valid
    if (inputNodeVal.length === 0) return this.setInValid();
    // everything looks good, we can go ahead and do changes
    this.setValid();
    this.resetCityInput();
    this.toggle("null"); // to hide the model
    // calling Server now
    const cityId = this.state.passSelectedCity.value;
    // call to server 1
    this.props.editRegion(cityId, regionId, inputNodeVal);
    // TODO: // fix in redux
    await this.timeout(1500);
    // call to server 2
    const selectedRegion = await this.props.getSingleRegion(cityId);
    return this.setState({
      defualtRegions: selectedRegion
      // defualtRegions: selectedRegion.map(item=>({ label: item.name, value: item.id}))
    });
  };
  deleteRegionByID = async regionId => {
    const cityId = this.state.passSelectedCity.value;
    console.log(regionId);
    this.props.deleteRegion(regionId);
    // TODO: // fix in redux
    await this.timeout(1500);
    // call to server 2
    const selectedRegion = await this.props.getSingleRegion(cityId);
    return this.setState({
      defualtRegions: selectedRegion
      // defualtRegions: selectedRegion.map(item=>({ label: item.name, value: item.id}))
    });
  };

  // after selecting City from parent update here in child(region)
  remoteCitySelect = async item => {
    const selectedRegion = await this.regionDefaultOptions(item.value);
    console.log(`%c regionDefaultOptions`, "background:red;color:white");
    return this.setState({
      passSelectedCity: item,
      defualtRegions: selectedRegion
      // defualtRegions: selectedRegion.map(item=>({ label: item.name, value: item.id}))
    });
  };

  filterRegions = (inputValue: string) => {
    // console.log(this.state.regionsObjLocal, this.state.testObj);
    return this.state.regionsObjLocal.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // preparedRegions = (regions) => regions.map(opt => ({ label: opt.name, value: opt.id }));
  // console.log(`%c Prepared Regions`, "background:red;color:white");
  //  console.log(`%c ${inputValue}`, "background:red;color:white");
  regionAllOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterRegions(inputValue));
      }, 1000);
    });

  // get default options, saved in state as promise
  getRegionDefaultOptions = () => this.state.defualtRegions;

  handleCreate = (inputValue: any) => {
    const cityId = this.state.passSelectedCity.value;
    this.setState({ isLoading: true });
    console.group("Option created");
    console.log("Wait a moment...", cityId, inputValue);
    // this.props.postRegion(this.props.passSelectedCity, inputValue);
  };

  // on change/select of dropdown
  onChange(region) {
    // if there are default then don't remove
    // console.log(JSON.stringify(region));
    // const currentRegionID = region.value;
    // const defaultRegionIds = this.state.defualtRegions.map(item => item.value);
    if (
      this.props.isFromRestraunt !== undefined &&
      typeof this.props.isFromRestraunt !== "undefined"
    ) {
      this.props.restaurantContext.setRegions(region);
    } else {
      this.context.setRegions(region);
    }
    // this.props.selectedRegions(region);
  }

  renderRegions = (loader, regions) => {
    const { isLoading } = this.state;
    if (!loader && Object.keys(regions).length !== 0) {
      console.log("rendering");
      return (
        <AsyncCreatableSelect
          closeMenuOnSelect={false}
          isDisabled={isLoading}
          isLoading={isLoading}
          allowCreateWhileLoading={false}
          isClearable={false}
          backspaceRemovesValue={false}
          isSearchable
          isMulti
          cacheOptions
          defaultOptions
          onCreateOption={this.handleCreate}
          loadOptions={this.regionAllOptions}
          onChange={opt => this.onChange(opt)}
          defaultValue={this.state.defualtRegions}
          // autoload
          // defaultValue={[{label: "Hamitköy", value: "5c72b773c463c407bc0d53f0"}]}
          // defaultValue
          // loadOptions={this.regionAllOptions}
        />
      );
    }
    return <span>loading ...</span>;
  };

  regionDefaultOptions = async id => {
    return await this.props.getSingleRegion(id);
  };

  render() {
    const {
      // regions: allRegions,
      regionsLoader: loader
    } = this.props;
    const { regionsObjLocal, passSelectedCity, open, type } = this.state; // eslint-disable-line no-unused-vars
    if (passSelectedCity.length === 0)
      return (
        <Alert theme="warning">
          Regions will be show after selecting <span className="bold">city</span>
        </Alert>
      );
    return (
      <Loader loaded={!loader}>
        <Card small className="mb-4">
          <CardBody className="p-1">
            <React.Fragment>
              <h5 className="ml-3 d-inline-block">
                Choose Regions for City: {passSelectedCity.label}
              </h5>
            </React.Fragment>
            <div style={{ display: "block" }} className="mb-2">
              <h5 style={{ fontSize: 16, marginRight: "2rem", display: "inline" }}>
                Exsiting regions for selected city:
              </h5>
              {this.CitiesRegions(this.getRegionDefaultOptions())}
            </div>
            <InputGroup className="mt-3">
              <InputGroupAddon type="prepend">
                <InputGroupText>Regions</InputGroupText>
              </InputGroupAddon>
              <div style={{ flex: 1 }}>
                {/* Model */}
                <Modal open={open} toggle={this.toggle}>
                  <ModalHeader>
                    {this.state.openType === "add" ? "Add Region" : "Edit Region"}
                  </ModalHeader>
                  <ModalBody>
                    {this.state.openType === "add" &&
                      "New Region will automatically appear below.."}
                    <ListGroup flush>
                      <ListGroupItem className="d-flex px-3">
                        <InputGroup className="ml-auto">
                          <FormInput
                            placeholder={
                              this.state.openType === "add"
                                ? "Write region name here"
                                : this.state.editRegion.name
                            }
                            size="lg"
                            innerRef={this.regionInput}
                            valid={this.state.valid}
                            invalid={this.state.invalid}
                          />
                          <InputGroupAddon type="append">
                            {this.state.openType === "add" ? (
                              <Button className="px-2" onClick={this.addNewRegion}>
                                Add New Region <i className="material-icons">add</i>
                              </Button>
                            ) : (
                              <Button
                                className="px-2"
                                onClick={() => this.editRegionRemotely(this.state.editRegion.id)}
                              >
                                Save Edit <i className="material-icons">edit</i>
                              </Button>
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </ListGroupItem>
                    </ListGroup>
                  </ModalBody>
                </Modal>
                <Button className="px-2" block outline onClick={() => this.toggle("add")}>
                  Add New Regions <i className="material-icons">add</i>
                </Button>
              </div>
            </InputGroup>
          </CardBody>
        </Card>
      </Loader>
    );
  }
}

const mapStateToProps = state => {
  return {
    // get
    regionsLoader: state.general.regionsLoader,
    regions: state.general.regions
  };
};

export default connect(
  mapStateToProps,
  {
    getRegions,
    postRegion,
    getSingleRegion,
    deleteRegion,
    editRegion
  },
  null,
  { forwardRef: true }
)(AddEditRegions);
