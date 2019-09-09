import React, { PureComponent } from "react";
import AsyncSelect from "react-select/lib/Async";
// import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader";
import { Alert, Card, CardHeader, CardBody } from "shards-react";
import {
  //   getRegions,
  //   postRegion,
  getSingleRegion
  //   deleteRegion,
  //   editRegion
} from "../../../actions/GeneralAction";
import { RestaurantContext } from "../../../views/restaurant/restaurantProvider";

class AddEditRegions extends PureComponent {
  static contextType = RestaurantContext;

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
    // this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    // create a ref to store the textInput DOM element
    this.regionInput = React.createRef();
    // this.regionEditInput = React.createRef();
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
      return this.renderRegions(regions);
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

  // before getting regions reset the local state
  resetState = () => {
    return this.setState({
      editRegion: {},
      open: false,
      openType: null,
      passSelectedCity: "",
      defualtRegions: [],
      regionsObjLocal: []
    });
  };

  // after selecting City from parent update here in child(region)
  remoteCitySelectForRegions = async (item, initLoad = false) => {
    let cityID = null;
    if (initLoad) {
      cityID = item;
    } else {
      cityID = item.value;
    }
    // console.log(`%c cityID ${cityID}`, "background:white;color:red");
    const selectedRegion = await this.props.getSingleRegion(cityID);
    // console.log(`%c Restaurant Leve: Regions of Selected City`, "background:red;color:white");
    return this.setState(
      {
        passSelectedCity: item,
        defualtRegions: selectedRegion,
        regionsObjLocal: selectedRegion.map(item => ({ label: item.name, value: item.id }))
        // defualtRegions: selectedRegion.map(item=>({ label: item.name, value: item.id}))
      },
      () => {
        // setting the context as well - Very important
        this.context.setRegions(this.props.remoteRegionsArray);
      }
    );
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

  // on change/select of dropdown
  onChange(region) {
    // if there are default then don't remove
    // console.log(JSON.stringify(region));
    // const currentRegionID = region.value;
    // const defaultRegionIds = this.state.defualtRegions.map(item => item.value);

    this.context.setRegions(region);

    // this.props.selectedRegions(region);
  }

  renderRegions = regions => {
    if (Object.keys(regions).length !== 0) {
      return (
        <AsyncSelect
          defaultValue={this.props.remoteRegionsArray}
          closeMenuOnSelect={false}
          isClearable={false}
          backspaceRemovesValue={false}
          isSearchable
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={this.regionAllOptions}
          onChange={opt => this.onChange(opt)}
        />
      );
    }
    return <span>loading ...</span>;
  };

  // regionDefaultOptions = async id => {
  //   return await this.props.getSingleRegion(id);
  // };

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
        <Card small className="mb-4" style={{ boxShadow: "none" }}>
          <CardHeader className="p-0">
            <h6>
              Choose Regions for City: <strong className="bold">{passSelectedCity.label}</strong>{" "}
            </h6>
          </CardHeader>
          <CardBody className="p-1">{this.CitiesRegions(this.getRegionDefaultOptions())}</CardBody>
        </Card>
      </Loader>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     // get
//     regionsLoader: state.general.regionsLoader,
//     regions: state.general.regions
//   };
// };

export default connect(
  null,
  {
    getSingleRegion
  },
  null,
  { forwardRef: true }
)(AddEditRegions);
// null,
// {
//   // getRegions,
//   // postRegion,
//   getSingleRegion
//   // deleteRegion,
//   // editRegion
// },
// null,
// { forwardRef: true }
