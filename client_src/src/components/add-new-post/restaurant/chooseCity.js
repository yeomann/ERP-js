import React, { PureComponent } from "react";
import AsyncSelect from "react-select/lib/Async";
import { connect } from "react-redux";
import Loader from "react-loader";
import { Card, CardBody, InputGroup, InputGroupAddon, InputGroupText } from "shards-react";
import { getCities } from "../../../actions/GeneralAction";
// import { CitiesAndRegionsContext } from "./citiesRegionProvider";
import { RestaurantContext } from "../../../views/restaurant/restaurantProvider";
// import { RestaurantContext } from "../../views/restaurant/restaurantProvider";

class AddEditRegions extends PureComponent {
  static contextType = RestaurantContext;
  // static contextType = this.props.isFromRestraunt ? CitiesAndRegionsContext : RestaurantContext;
  constructor(props) {
    super(props);
    this.state = {
      CityObjLocal: [],
      // remote City ID
      remoteCityId: "",
      remoteCityLocalObject: null
    };
  }

  componentDidMount() {
    this.props.getCities(false);
  }

  // After loading saving the Category data for local use
  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (Object.keys(nextProps.cities) !== Object.keys(prevState.CityObjLocal)) {
      // lets save category remote info into local state but we can't use setstate here
      return { CityObjLocal: nextProps.cities.map(opt => ({ label: opt.name, value: opt.id })) };
    } else if (
      Object.keys(nextProps.remoteCityObject) !== Object.keys(prevState.remoteCityObject)
    ) {
      return { remoteCityObject: nextProps.remoteCityObject };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevProps.CityObjLocal);
    // console.log(this.state, this.state.CityObjLocal);
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    // if (prevState.CityObjLocal !== this.state.CityObjLocal) {}
  }

  filterCities = (inputValue: string) => {
    // console.log(this.state.CityObjLocal, this.state.testObj);
    return this.state.CityObjLocal.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // preparedRegions = (regions) => regions.map(opt => ({ label: opt.name, value: opt.id }));
  // console.log(`%c Prepared Regions`, "background:red;color:white");
  //  console.log(`%c ${inputValue}`, "background:red;color:white");
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        // console.log(`%c resolving ${inputValue}`, "background:white;color:red");
        resolve(this.filterCities(inputValue));
      }, 1000);
    });

  onSelectCity = city => {
    // console.log(city);
    if (
      this.props.isFromRestraunt !== undefined &&
      typeof this.props.isFromRestraunt !== "undefined"
    ) {
      this.context.setCity(city);
      this.props.passSelectedCity(city);
    }
  };

  renderCity = (loader, cities) => {
    if (!loader && Object.keys(cities).length !== 0) {
      // it neeeds fucking key to reload itsself
      // fucking wasted day on it https://github.com/JedWatson/react-select/issues/1581
      return (
        <AsyncSelect
          key={JSON.stringify(this.state.remoteCityLocalObject)}
          defaultValue={this.state.remoteCityLocalObject}
          // defaultInputValue={this.state.remoteCityObject}
          // defaultValue={{ label: "Girne", value: "5c8103762b5cd814ad395265" }}
          defaultOptions
          isSearchable
          cacheOptions
          loadOptions={this.promiseOptions}
          onChange={this.onSelectCity}
          isDisabled={this.props.isDisabled}
        />
      );
    }
    return <span>loading ...</span>;
  };

  remoteSetCity = () => {
    // console.log("cityId", this.props.remoteCityObject);
    // without creating it doesn't work
    const cityobject = {
      label: this.props.remoteCityObject.label,
      value: this.props.remoteCityObject.value
    };
    this.setState(
      {
        remoteCityLocalObject: cityobject
        // remoteCityId: cityId
      },
      () => {
        // this.promiseOptions(remoteCityObject.label.toLowerCase()); // NOT WORKING
        // this.filterCities(remoteCityObject.label.toLowerCase()); // NOT WORKING
        // this.context.setCity(remoteCityObject); // NOT WORKING
        this.context.setCity(this.state.remoteCityLocalObject);
        // this.props.passSelectedCity(remoteCityObject); // NOT WORKING
      }
    );
  };

  render() {
    const {
      // cities: allRegions,
      citiesLoader: loader
    } = this.props;
    const { CityObjLocal } = this.state;

    return (
      <Loader loaded={!loader}>
        <Card small className="mb-4" style={{ boxShadow: "none" }}>
          <CardBody className="p-1">
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>Choose City</InputGroupText>
              </InputGroupAddon>
              <div style={{ flex: 1 }}>{this.renderCity(loader, CityObjLocal)}</div>
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
    citiesLoader: state.general.citiesLoader,
    cities: state.general.cities
  };
};

export default connect(
  mapStateToProps,
  {
    getCities
  },
  null,
  { forwardRef: true }
)(AddEditRegions);
