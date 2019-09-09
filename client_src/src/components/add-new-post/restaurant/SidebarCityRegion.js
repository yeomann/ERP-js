import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { Card, CardHeader, CardBody } from "shards-react";
// import ChooseRegions from "../../../views/cityAndRegion/chooseRegions";
import ChooseRegions from "./chooseRegion";
import ChooseCity from "./chooseCity";

class ChooseCityRegion extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valid: null,
      invalid: null,
      selectedCity: {},
      selectedRegions: [],
      // remote states
      remoteCityId: "",
      remoteCityObject: {},
      remoteRegionsArray: [],
      doesRemoteCityExsits: false
    };
    // bind
    // this.onSaveRegions = this.onSaveRegions.bind(this);
    this.remoteSelectCityRegion = this.remoteSelectCityRegion.bind(this);
    // create a ref to store the textInput DOM element
    this.cityInput = React.createRef();
    this.cityComponents = React.createRef();
    this.regionsComponents = React.createRef();
  }

  componentDidMount() {
    // console.log("%c Context! ", "background: #222; color: #bada55");
    // console.log(this.props.restaurantContext);
  }

  componentWillUnmount() {
    this.setValid();
  }

  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });
  resetCityInput() {
    return (this.cityInput.current.value = "");
  }

  saveSelectedRegions = state =>
    this.setState({
      ...this.state.selectedRegions,
      selectedRegions: state
    });

  // onSaveRegions(context) {
  //   console.log("%c get context city and regions", "background:red;color:white");
  //   console.log(context);
  // }

  // called by parent
  remoteSelectCityRegion(cityId, remoteCityObject, regionsArray) {
    // remote set city and regions
    // console.log("%c remoteSelectCityRegion", "background:white;color:red");
    // console.log(cityId, regionsArray);
    // this.cityComponents.current.remoteSetCity(cityId);
    // updating local state
    this.time = setTimeout(() => {
      this.setState(
        {
          remoteCityId: cityId,
          remoteCityObject: remoteCityObject,
          remoteRegionsArray: regionsArray,
          doesRemoteCityExsits: true
        },
        () => {
          // this.cityComponents.current.remoteSetCity(remoteCityObject);
          // this.cityComponents.current.remoteSetCity(remoteCityObject); // NOT WORKING
          this.regionsComponents.current.remoteCitySelectForRegions(cityId, true);
          this.cityComponents.current.remoteSetCity();
        }
      );
    }, 500);
  }

  render() {
    const { title, addNewCatLoaded: NewCategoryAdded } = this.props;
    // const { files } = this.state;

    return (
      <Card small className="mb-3">
        <Loader loaded={!NewCategoryAdded}>
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <section className="text-left">
            <Card className="m-3" style={{ boxShadow: "none" }}>
              <React.Fragment>
                <CardHeader className="p-0">
                  <h6>First Select City</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <ChooseCity
                    ref={this.cityComponents}
                    // Props: passSelectedCity
                    // it is being called from the City Component for Regions
                    passSelectedCity={city => {
                      // console.log(city);
                      // console.log(this.regionsComponents.current);
                      this.regionsComponents.current.resetState();
                      this.regionsComponents.current.remoteCitySelectForRegions(city);
                    }}
                    isFromRestraunt
                    remoteCityObject={this.state.remoteCityObject}
                    isDisabled={this.state.doesRemoteCityExsits}
                  />
                  <ChooseRegions
                    ref={this.regionsComponents}
                    isFromRestraunt
                    remoteRegionsArray={this.state.remoteRegionsArray}
                  />
                </CardBody>
              </React.Fragment>
            </Card>
          </section>
        </Loader>
      </Card>
    );
  }
}

ChooseCityRegion.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

ChooseCityRegion.defaultProps = {
  title: "Choose City and Regions"
};

export default connect(
  null,
  {},
  null,
  {
    forwardRef: true
  }
)(ChooseCityRegion);
