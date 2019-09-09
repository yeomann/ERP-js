import React, { Component } from "react";
import styled from "styled-components";
import { CardBody, Card, Row, Col } from "shards-react";
import { StockContext } from "../../../views/stock/stockProvider";

import CreateStockColumnUI from "./columns/stockColumnUI";
import AddStockModal from "./columns/AddStockModal";
// import initialData from "./columns/inital-data";

const ColumnsContainerDiv = styled.div`
  display: flex;
  margin: 1.5rem auto;
`;

export class Menu extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      /* // numberOfMenuCategories: 0,
      // numberOfMenuCategoriesArray: [],
      menuColumns: [
        // { id: 0, name: "Breakfast", menuItems: {}, menuItemsOrder: [] }
        // { id: 1, name: "Lunch", menuItems: {}, menuItemsOrder: [] }
      ], */
      menuColumns: [],
      nextId: 1
    };
    // console.log(this.context.states.menusData);

    this.addNewStockItemColumn = this.addNewStockItemColumn.bind(this);
    this.removeMenuColumn = this.removeMenuColumn.bind(this);
  }

  remoteMenuDataUpdate = (state, total) => {
    console.log(`Total column ${total}, remoteMenuDataUpdate:func`);
    this.setState({ menuColumns: state, nextId: total + 1 }, () => {
      console.log("%c Local State of Menu.js State", "background: black; color: #FFF");
      console.log(this.state);
    });
  };

  // Remote function, Triggered by Child
  // Set menu items to there respective categories
  setMenuItems = (menuObject, context) => {
    const menuCategory = menuObject.columns["column-1"];
    const menuCategoryId = menuCategory.parentColumnId;
    const menuCategoryName = menuCategory.title;
    const menuItems = menuObject.tasks; // assing all menu items
    const menuItemsOrder = menuCategory.menuItemIds; // get menu items order
    console.log(`Incoming menu items of ${menuCategoryName} of id ${menuCategoryId}`);
    const newState = this.state.menuColumns.map(item =>
      item.id === menuCategoryId ? { ...item, ...{ menuItems }, ...{ menuItemsOrder } } : item
    );
    // console.log(newState);
    // this.props.menusData(newState);
    // console.log(this);
    // console.log(this.context.states);
    // console.log(context);
    context.setMenuData(newState);
    return this.setState({
      menuColumns: newState
    });
  };
  // Get all Catrogies of Menu
  getAllMenuColumns = () => {
    console.log(this.state.menuColumns);
    return this.state.menuColumns;
  };
  // Add a new Product in the stock column
  /*
   * NOTE: encodeURIComponent column name comes here as Argument "catName"
   */
  addNewStockItemColumn(catName) {
    let menuColumns = this.state.menuColumns.slice();
    // add for TESTing
    // NOTE: stockItemDetails DEFAULT can be added here
    // productName productCode productColor productHowManySold approxCostPrice buyCostPrice
    menuColumns.push({
      id: this.state.nextId,
      name: catName,
      stockItemDetails: {
        productName: "",
        productCode: "",
        productColor: "",
        productHowManySold: "",
        approxCostPrice: "",
        buyCostPrice: ""
      }
    });
    this.setState({
      menuColumns: menuColumns,
      nextId: ++this.state.nextId // eslint-disable-line react/no-direct-mutation-state
    });
    console.log("AFTERencodeURIComponent=>" + catName);
  }
  // Remove a Category from Menu
  removeMenuColumn(id, context) {
    console.log("removeMenuColumn");
    console.log(id);
    this.setState(
      {
        menuColumns: this.state.menuColumns.filter((item, index) => item.id !== id)
      },
      () => {
        // set context after removing
        context.setMenuData(this.state.menuColumns);
      }
    );
  }
  // menusData={(data) => context.setMenuData(data)}
  render() {
    // const { numberOfMenuCategories } = this.state;
    // removeMenuColumn={id => this.removeMenuColumn(id, context)}

    return (
      <StockContext.Consumer>
        {context => (
          <Card small className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <h5>{context.states.menuHeading}</h5>
                  <AddStockModal handler={this.addNewStockItemColumn} />
                  <hr />
                  {/* {JSON.stringify(this.state.menuColumns)} */}
                  {/* [{"id":1,"name":"Test%20Product%201"}] */}

                  <ColumnsContainerDiv style={{ overflowX: "auto" }}>
                    {this.state.menuColumns.map((item, index) => {
                      return (
                        <CreateStockColumnUI
                          column={{
                            title: item.name,
                            columnId: item.id
                          }}
                          name={item.name}
                          key={item.id}
                          columnId={item.id}
                          namespace={`column-${item.id}`}
                          removeMenuColumn={id => this.removeMenuColumn(id, context)}
                          childStates={menuObj => this.setMenuItems(menuObj, context)}
                          stockItemDetails={
                            typeof item.stockItemDetails !== "undefined"
                              ? item.stockItemDetails
                              : {}
                          }
                        />
                      );
                    })}
                  </ColumnsContainerDiv>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
      </StockContext.Consumer>
    );
  }
}

export default Menu;
