import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, FormCheckbox } from "shards-react";
import { getCategories } from "../../../actions/GeneralAction";

class SidebarSelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      selectedCatId: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getCategories(false);
  }

  // After loading saving the Category data for local use
  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (nextProps.categories !== prevState.categories) {
      // lets save category remote info into local state but we can't use setstate here
      return { categories: nextProps.categories };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  // setting state with remote info of category
  componentDidUpdate(prevProps, prevState) {
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    if (prevState.categories !== this.state.categories) {
      // save categories locally
      this.setState({
        categories: prevState.categories
      });
    }
  }

  remoteCategorySelect = inComingCatId => {
    this.setState({ selectedCatId: inComingCatId });
    // we must update the context as the remote function is called from EDIT
    // the problem is in context we are storing object with name and Id
    // therefore we need to extract somehow the name and call this.props.onSelect()
    // in order to save the selected category object in context
    const selectedCategory = this.state.categories.filter(item => item.catId === inComingCatId);
    if (selectedCategory[0]) {
      const selectedCategoryObject = {
        name: selectedCategory[0].name,
        catId: selectedCategory[0].catId
      };
      // console.log(selectedCategoryObject);
      // now we can call the parent function to store this in context
      // console.log("calling parent to store category - edit restraurant");
      // console.log(selectedCategoryObject);
      this.storeInContext(selectedCategoryObject);
    }
  };

  storeInContext = selectedCategory => this.props.onSelect(selectedCategory);

  handleChange(cat) {
    // console.log(`Selected cat ${JSON.stringify(cat)}`); // {"catId":"5c6937a83637d53f546eeb0a","name":"Chicken","image":{"name":"000f67cc-f92c-4954-824f-b511e80f9be7.jpg","type":"image/jpeg","container":"categories","url":"containers/categories/download/000f67cc-f92c-4954-824f-b511e80f9be7.jpg"}}
    this.setState(
      {
        selectedCatId: cat.catId
      },
      () => {
        // After selection send it to provider
        const selectedCategory = {
          catId: this.state.selectedCatId,
          name: cat.name
        };
        console.log(selectedCategory);
        this.storeInContext(selectedCategory);
      }
    );
  }

  renderCategories = categories => {
    if (Object.keys(categories).length !== 0) {
      return categories.map((item, index) => {
        return (
          <FormCheckbox
            key={item.catId}
            className="mb-1"
            value={item.name.toLowerCase()}
            checked={item.catId === this.state.selectedCatId ? true : false}
            onChange={this.handleChange.bind(this, item)}
          >
            {item.name}
          </FormCheckbox>
        );
      });
    } else if (Object.keys(categories).length === 0) {
      return (
        <div>
          No Categories Found. You must have catgory to Save <br />
          <Link to="/add-category">Click here to add New Category</Link>
        </div>
      );
    }
    return <div>loading ...</div>;
  };

  render() {
    const { title } = this.props;
    const { categories } = this.state;
    // const { categories } = this.state;
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="px-3 pb-2">{this.renderCategories(categories)}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

SidebarSelectCategory.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarSelectCategory.defaultProps = {
  title: "Categories"
};

const mapStateToProps = state => {
  return {
    // get
    catLoader: state.general.catLoader,
    categories: state.general.categories
  };
};

export default connect(
  mapStateToProps,
  {
    getCategories
  },
  null,
  {
    forwardRef: true
  }
)(SidebarSelectCategory);
