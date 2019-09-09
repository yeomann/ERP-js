import React, { Component } from "react";
import styled from "styled-components";
import { CardBody, Card, Row, Col } from "shards-react";
import { StockContext } from "../../../views/stock/stockProvider";

import CreateColumn from "./columns/index";
import AddColumn from "./columns/AddColumn";
// import initialData from "./columns/inital-data";

const ColumnsContainer = styled.div`
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

    this.addNewMenuColumn = this.addNewMenuColumn.bind(this);
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
  // Add a new Category of Menu
  /*
   * NOTE: encodeURIComponent column name comes here as Argument "catName"
   */
  addNewMenuColumn(catName) {
    let menuColumns = this.state.menuColumns.slice();
    menuColumns.push({
      id: this.state.nextId,
      name: catName
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
    return (
      <StockContext.Consumer>
        {context => (
          <Card small className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <h5>{context.states.menuHeading}</h5>
                  <AddColumn handler={this.addNewMenuColumn} />
                  <hr />
                  <ColumnsContainer style={{ overflowX: "auto" }}>
                    {this.state.menuColumns.map((item, index) => {
                      return (
                        <CreateColumn
                          name={item.name}
                          key={item.id}
                          columnId={item.id}
                          namespace={`column-${item.id}`}
                          removeMenuColumn={id => this.removeMenuColumn(id, context)}
                          childStates={menuObj => this.setMenuItems(menuObj, context)}
                          menus={typeof item.menuItems !== "undefined" ? item.menuItems : {}}
                          menuOrdersId={
                            typeof item.menuItemsOrder !== "undefined" ? item.menuItemsOrder : []
                          }
                        />
                      );
                    })}
                  </ColumnsContainer>
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  <strong>Final JSON of Menus in Menu.js</strong>
                  <pre style={{height: "250px"}}>{JSON.stringify(this.state.menuColumns, null, 2)}</pre>
                </Col>
              </Row> */}
            </CardBody>
          </Card>
        )}
      </StockContext.Consumer>
    );
  }
}

export default Menu;
