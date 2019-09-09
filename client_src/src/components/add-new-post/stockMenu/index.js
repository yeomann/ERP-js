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
    this.removeStockItemColumn = this.removeStockItemColumn.bind(this);
  }

  remoteMenuDataUpdate = (state, total) => {
    console.log(`Total column ${total}, remoteMenuDataUpdate:func`);
    this.setState({ menuColumns: state, nextId: total + 1 }, () => {
      console.log("%c Local State of Menu.js State", "background: black; color: #FFF");
      console.log(this.state);
    });
  };

  // NOTE: update columns stockItemDetails etc
  // Remote function, Triggered by Child
  // Set menu items to there respective categories
  updateStockMenuItems = (stockColumnId, stockColumnObject, context) => {
    console.log(stockColumnId, stockColumnObject);
    // return;
    const updateColumnName = stockColumnObject.updatedStockItemDetails.name;
    const updatedItems = stockColumnObject.updatedStockItemDetails; // assing all stock items
    console.log(`Incoming column name: ${updateColumnName} of id ${stockColumnId}`);

    const newState = this.state.menuColumns.map(item =>
      item.id === stockColumnId
        ? { ...item, ...{ name: updateColumnName, stockItemDetails: updatedItems } }
        : item
    );
    console.log("udpated newState will be...");
    console.log(newState);
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
  removeStockItemColumn(id, context) {
    console.log("removeStockItemColumn");
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
    // removeStockItemColumn={id => this.removeStockItemColumn(id, context)}

    return (
      <StockContext.Consumer>
        {context => (
          <Card small className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <h4>{context.states.menuHeading}</h4>
                  <AddStockModal handler={this.addNewStockItemColumn} />
                  <hr />
                  {JSON.stringify(this.state.menuColumns)}
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
                          removeStockItemColumn={id => this.removeStockItemColumn(id, context)}
                          updateStockItemColumn={(id, obj) =>
                            this.updateStockMenuItems(id, obj, context)
                          }
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
