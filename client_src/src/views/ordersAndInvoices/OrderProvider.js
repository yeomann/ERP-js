import React from "react";
// import he from "he";

// Stock Conext
export const OrderInvoicesContext = React.createContext();
// states
// https://stackoverflow.com/questions/34845650/clearing-state-es6-react
const initialState = {
  // city and religion
  city: {},
  regions: [],
  // restraunt related
  name: "",
  OrderDateTime: new Date(),
  selectedCategory: {}, // Object { catId: "5c6937b03637d53f546eeb0b", name: "Beaf" }
  menusData: [],
  // inhouse
  inhouseName: "",
  inhouseTelephoneNo: "",
  inHouseProduct: "",
  inhousePayment: ""
};
export default class RestaurantProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState }; // use spread operator to avoid mutation
  }
  render() {
    return (
      <OrderInvoicesContext.Provider
        value={{
          states: this.state,
          handleChange: e => this.setState({ [e.target.name]: e.target.value }),
          handleCustomRestarauntFields: (type, value) => this.setState({ [type]: value }),
          setCategory: category => this.setState({ selectedCategory: category }),
          setMenuData: data => {
            window.menuDataBefore = this.state.menusData;
            this.setState({ menusData: data }, () => {
              console.log(
                "%c STOCK MENU DATA Updated => window.menuDataAfter",
                "background:red; color:#FFF"
              );
              console.log(this.state.menusData);
              window.menuDataAfter = this.state.menusData;
            });
          },
          // Getter getRestaurantData // for addEdit normal one
          getRestaurantData: () => {
            // UPDATEinG LOCAL WINDOW STATE;
            /*
             * ENCODE all necessary fileds of this.state.menusData
             */
            // let encodedMenuData = null;
            // console.log(this.state.menusData, this.state.menusData.length);
            // if (this.state.menusData[0] && this.state.menusData[0].length === 1) {
            //   let menuColumn = this.state.menusData[0];
            //   menuColumn = {
            //     id: menuColumn.id,
            //     name: encodeURIComponent(menuColumn.name),
            //     menuItems: menuColumn.menuItems,
            //     menuItemsOrder: menuColumn.menuItemsOrder
            //   };
            //   encodedMenuData = menuColumn;
            // } else {
            //   encodedMenuData = this.state.menusData;
            // }
            // window.encodedMenuData = encodedMenuData;

            window.restaurantContextUpdated = this.state;

            return {
              restaurantData: {
                categoryId: this.state.selectedCategory.catId,
                // name: he.encode(this.state.name, {
                //   useNamedReferences: true
                // }),
                name: encodeURIComponent(this.state.name),
                OrderDateTime: encodeURIComponent(this.state.OrderDateTime)
              },
              menuData: this.state.menusData
            };
          },
          // Setter getRestaurantData
          setRestaurantData: state => {
            this.setState(
              {
                name: state.name,
                OrderDateTime: state.OrderDateTime,
                menusData: state.menu[0]
              },
              () => {
                console.log("%c Success: Setter for restaurant!", "background:red; color:#FFF");
                // console.log(this.state);
                window.restaurantContext = this.state;
              }
            );
          },
          // set Restaurant Credentials ID only
          setRestaurantCredentialsID: restaurantcredentialIdFk => {
            this.setState({
              restaurantcredentialIdFk
            });
          },
          resetStates: () => {
            console.log("%c Reseting! ", "background: red; color: #bada55");
            this.setState(initialState, () => {
              // console.log(this.state);
            });
          }
        }}
      >
        {this.props.children}
      </OrderInvoicesContext.Provider>
    );
  }
}
