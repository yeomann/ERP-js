import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Alert, Button } from "shards-react";
import Loader from "react-loader";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// restaurant provider
import { OrderInvoicesContext } from "./OrderProvider";
// redux action
import {
  getSingleRestaurant,
  postRestaurant,
  resetReduxRestaurantSingleState,
  editRestaurantWithoutLogo,
  editRestaurantLogoOnly
} from "../../actions/GeneralAction";
// components
import PageTitle from "../../components/common/PageTitle";
import OrdernInvoicesEditor from "../../components/add-new-post/EditorOrdernInvoices";
import SidebarActions from "../../components/add-new-post/OrderNinvoicesSidebarActions";
// import SidebarSelectCategory from "../../components/add-new-post/restaurant/SidebarSelectCategory";
// import Logo from "../../components/add-new-post/stockLogo";
// import StockMenu from "../../components/add-new-post/stockMenu";

const InitialState = {
  localStateErr: false,
  didweAddedRestaurant: false,
  restaurantData: {},
  menusData: {},
  singleRestaurantData: {},
  isThisEditingFlag: false
};

class AddNewStock extends React.PureComponent {
  // get static context
  static contextType = OrderInvoicesContext;
  // constructor
  constructor(props, context) {
    super(props, context);
    this.state = InitialState;
    // refs
    this.editorRef = React.createRef();
    this.restauarantMenuRef = React.createRef();
    this.categoriesRef = React.createRef();
    this.cityRegionRef = React.createRef();
    this.logoRef = React.createRef();
    // binding functions
    this.onSaveEvent = this.onSaveEvent.bind(this);
    this.resetWholeState = this.resetWholeState.bind(this);
    // this.setWholeContextStates = this.setWholeContextStates.bind(this);
    this.validate = this.validate.bind(this);
    this.restErrorState = this.restErrorState.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.routeParams);
    const { id: restId, isEditRestaurant } = this.props.routeParams;
    if (isEditRestaurant && typeof isEditRestaurant !== "undefined") {
      this.props.getSingleRestaurant(restId);
    } else {
      this.context.resetStates();
      this.setState({
        InitialState
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.restErrorState.bind(this), false);
    // restting as it shows previous conetxt
    // this.resetWholeState(); // we want to reset logo of component
    this.context.resetStates();
    // redux main state needs to be resetted as well
    this.props.resetReduxRestaurantSingleState();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Posting Restaurant

    // compare incoming new Props from reducer to local state
    if (nextProps.addNewRestaurantStatus !== prevState.didweAddedRestaurant) {
      // category is added
      return { didweAddedRestaurant: nextProps.addNewRestaurantStatus };
    }
    //else return null; // no need localstate is FALSE already for didweAddedRestaurant

    // Getting Single Restaurant

    // compare incoming new Props from reducer to local state
    if (
      Object.keys(nextProps.restaurantSingle).length !==
      Object.keys(prevState.singleRestaurantData).length
    ) {
      // category is added
      return { singleRestaurantData: nextProps.restaurantSingle };
    } else return null; // no need localstate is FALSE already for singleRestaurantData
  }

  componentDidUpdate(prevProps, prevState) {
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    if (prevState.didweAddedRestaurant !== this.state.didweAddedRestaurant) {
      // New Category was added successfully, we can update Component here to notify.
      return this.resetWholeState(); // we want to reset logo of component
    }

    // Getting Single Restaurant
    const { isEditRestaurant } = this.props.routeParams;
    if (isEditRestaurant && typeof isEditRestaurant !== "undefined") {
      // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
      if (
        Object.keys(prevState.singleRestaurantData).length !==
        Object.keys(this.state.singleRestaurantData).length
      ) {
        console.log(
          "%c Setting this.pops.restaurantSingle to => Context ",
          "background:green; color:#FFF",
          this.props.restaurantSingle
        );
        // New Category was added successfully, we can update Component here to notify.
        return this.setWholeContextStates(); // we want to reset logo of component
      }
    }
  }

  setWholeContextStates = () => {
    this.setState({
      isThisEditingFlag: true
    });
    // console.log("%c Setter for restaurant ", "background:red; color:#FFF");
    const singleRestaurantData = this.props.restaurantSingle;

    // setting context
    this.context.setRestaurantData(this.props.restaurantSingle); //  update context
    this.context.setRestaurantCredentialsID(this.props.restaurantSingle.restaurantcredentialIdFk);
    // Create UI for menus
    /*
     * THIS PRODCUE CRITICAL BUG
     *  suppose if the incoming menu item has already id: 2 and when we pass total using
     *  Object.keys(singleRestaurantData.menu[0]).length we will get 1
     *  WHILE we'll increament in local state in remoteMenuDataUpdate():func as `nextId: total + 1`
     *  therefore we will endupdate having the 2 in local state while we already have menu item id as 2
     *
     * menu: Array(1)
     * 0: Array(1)
     *  0:
     *    id: 2
     *    menuItems: {menu-2: {…}}
     *    menuItemsOrder: ["menu-2"]
     *    name: "Desserts"
     *  1:
     *   id: .....
     *   menuItems: .....
     *   name.....
     *
     *  SOLUTION: foreach all menu items to check largest possible number or add Append String "edit" for edits
     *             Menu item ID depends upon column ID or idk COLUMN ID is acutally the problem
     *
     */
    let currentColumnId = null;
    if (Object.keys(singleRestaurantData.menu[0]).length === 1) {
      currentColumnId = singleRestaurantData.menu[0][0].id;
    } else {
      // FIND LARGEST INTEGER
      currentColumnId = singleRestaurantData.menu[0]
        .map(item => item.id)
        .reduce((previousLargestNumber, currentLargestNumber) => {
          return currentLargestNumber > previousLargestNumber
            ? currentLargestNumber
            : previousLargestNumber;
        });
    }

    console.log(`%c columnId passed is ${currentColumnId}`, "background:black; color:#FFF");

    this.restauarantMenuRef.current.remoteMenuDataUpdate(
      singleRestaurantData.menu[0],
      currentColumnId
      // Object.keys(singleRestaurantData.menu[0]).length
      // Object.keys(singleRestaurantData.menu[0]).length + "-edit"
    ); // update state of menu

    // Create UI of selected category
    this.categoriesRef.current.remoteCategorySelect(singleRestaurantData.categoryIdFK);

    // Update logo UI
    // just a check if logo (Object) is not empty - normally it can't be empty
    if (Object.keys(singleRestaurantData.logo).length > 1)
      this.logoRef.current.remoteSetLogo(singleRestaurantData.logo);
  };

  resetWholeState() {
    // console.log("server 200");
    // console.log(this.editorRef);
    this.editorRef.current.resetContext();
  }
  restErrorState() {
    this.setState({ localStateErr: false });
  }
  // validate before
  validate(states) {
    const { restaurantData, logo, menuData } = states;
    console.log("validating => ", restaurantData);
    // if (this.props.templateType !== "edit") {
    return restaurantData.name.length !== 0 &&
    restaurantData.openingClosingTime.length !== 0 &&
    restaurantData.minPrice.length !== 0 &&
    restaurantData.minPrice >= 5 &&
    restaurantData.averageDeliveryTime.length !== 0 &&
    restaurantData.categoryId.length > 5 /*normally it's long string*/ &&
      Object.keys(logo).length !== 0 &&
      Object.keys(restaurantData.cityAndRegion.city).length > 1 &&
      restaurantData.cityAndRegion.regions.length >= 1 &&
      menuData.length !== 0
      ? true
      : false;
  }

  onSaveEvent(states) {
    // this.setState({ localStateErr: true })
    // console.log("get context states", states);
    // return;
    // ###################
    //  for editing seperate save
    // ###################
    if (this.state.isThisEditingFlag) {
      const { id: restaurantID, isEditRestaurant } = this.props.routeParams;
      if (this.validate(states) && restaurantID && isEditRestaurant) {
        // console.log(restaurantID, isEditRestaurant);
        // sending Edit Request to API

        console.log("%c states.restaurantData", "background: black; color: #FFF");
        console.log(JSON.stringify(states.restaurantData));
        console.log("%c states.menuData", "background: black; color: #FFF");
        console.log(states.menuData);
        // NOTE: API CALL
        // this.props.editRestaurantWithoutLogo(restaurantID, states.restaurantData, states.menuData);
      }
      return;
    }
    // ###################
    // for new restaurant save
    // ###################
    if (this.validate(states)) {
      // Validation is passed, we can submit to server now.
      alert("Everything looks good 👌, Saving ...");
      // eslint-disable-next-line no-unused-vars
      const restID = 0; // new restaurant
      // NOTE: API CALL - trying to send to server
      // this.props.postRestaurant(
      //   restID,
      //   states.logo,
      //   states.restaurantData,
      //   states.menuData
      //   // states.cityAndRegion
      // );
      // USING TO SHOW LOCALLY
      this.setState({
        localWholeContext: states,
        localStateErr: false
      });
    } else {
      // Validation is failed; Showing Error
      this.setState(
        {
          localWholeContext: states,
          localStateErr: true
        },
        () => {
          // console.log(`localStateErr ${this.state.localStateErr}`);
          window.addEventListener(
            "scroll",
            e => {
              this.state.localStateErr && this.restErrorState();
            },
            false
          );
        }
      );
    }
  }

  render() {
    const { addNewRestLoaded: newRestaurantAdded } = this.props;
    const { localStateErr } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4" style={{ justifyContent: "space-between" }}>
          <PageTitle
            sm="4"
            title="Create Order"
            subtitle={process.env.REACT_APP_SECRET_APP_NAME}
            className="text-sm-left"
          />
          <Button
            theme="white"
            className="px-2"
            onClick={() =>
              this.props.history.replace("/stocks", {
                isComingBack: true
              })
            }
          >
            <i className="material-icons">arrow_back_ios</i> Back
          </Button>
          {/* )} */}
        </Row>
        {this.props.updatingRestaurantLoader && (
          <div className="fullscreenLoader">
            <Spinner type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {localStateErr && (
          <Container>
            <Alert theme="danger">
              <h4 className="w-clr">There were some error's</h4>
              <p>Please check all fields again before submiting again.</p>
              <p>Note: Minimum price should be 5 TL or more</p>
            </Alert>
          </Container>
        )}
        <Loader loaded={!newRestaurantAdded || this.state.iseditDataSaved}>
          <OrderInvoicesContext.Consumer>
            {context => (
              <Row>
                {/* Editor */}
                <Col lg="9" md="12">
                  {/* Restauarant Info */}
                  <OrdernInvoicesEditor
                    ref={this.editorRef}
                    templateType={this.props.templateType}
                  />
                  {/* TEST */}
                  <pre style={{ maxHeight: "300px" }}>
                    {JSON.stringify(this.state.localWholeContext, null, 2)}
                  </pre>
                </Col>
                {/* Sidebar Widgets */}
                <Col lg="3" md="12">
                  <React.Fragment>
                    {/* Save / Update Action Box */}
                    <SidebarActions
                      onSaveEvent={this.onSaveEvent.bind(this, context.getRestaurantData())}
                      isThisEditing={this.state.isThisEditingFlag}
                    />
                  </React.Fragment>
                </Col>
              </Row>
            )}
          </OrderInvoicesContext.Consumer>
        </Loader>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    // upon adding new Restaurant
    addNewRestLoaded: state.general.addNewRestLoaded,
    addNewRestaurantStatus: state.general.addNewRestaurantStatus,
    // Get Single Restaurant
    restSingleLoader: state.general.restSingleLoader,
    restaurantSingle: state.general.restaurantSingle,
    // edit single restaurant
    updatingRestaurantLoader: state.general.updatingRestaurantLoader
  };
};

export default connect(
  mapStateToProps,
  {
    getSingleRestaurant,
    postRestaurant,
    resetReduxRestaurantSingleState,
    editRestaurantWithoutLogo,
    editRestaurantLogoOnly
  }
)(AddNewStock);
