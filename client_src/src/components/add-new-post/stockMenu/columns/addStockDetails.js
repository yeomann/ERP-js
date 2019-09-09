import React, { Component } from "react";
// import styled from "styled-components";
import {
  Row,
  Col,
  FormGroup,
  FormInput
  // FormCheckbox
} from "shards-react";

const Fileds = p => (
  <FormGroup>
    <label htmlFor={p.id}>{p.placeholder}</label>
    <FormInput {...p} />
  </FormGroup>
);

export class StockDetails extends Component {
  /*
   * NOTE: loading also as encodeURIComponent
   */
  constructor(props) {
    super(props);
    this.state = {
      productName:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.productName
          : "",
      productCode:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.productCode
          : "",
      productColor:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.productColor
          : "",
      productHowManySold:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.productHowManySold
          : "",
      approxCostPrice:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.approxCostPrice
          : "",
      buyCostPrice:
        props.stockItemDetails && Object.keys(props.stockItemDetails).length !== 0
          ? props.stockItemDetails.buyCostPrice
          : ""
    };
    // create a ref to store the textInput DOM element
    this.nameRef = React.createRef();
    this.codeRef = React.createRef();
    this.colorRef = React.createRef();
    this.howManySoldRef = React.createRef();
    this.approxCostRef = React.createRef();
    this.buyCostRef = React.createRef();
    // func binding
    this.handleRemoveList = this.handleRemoveList.bind(this);
  }

  handleRemoveList(id) {
    return this.props.removeList(id);
  }
  /*
   * Common SetState handler for local menu content
   */
  handleChange = (e, outOfOrderStatus) => {
    // name change
    if (e.target.name === "productName") {
      this.setState({ productName: encodeURIComponent(e.target.value) });
    }
    // product code
    if (e.target.name === "productCode") {
      this.setState({ productCode: encodeURIComponent(e.target.value) });
    }
    // product Color
    if (e.target.name === "productColor") {
      this.setState({ productColor: encodeURIComponent(e.target.value) });
    }
    // set menu Tags
    if (e.target.name === "approxCostPrice") {
      this.setState({ approxCostPrice: encodeURIComponent(e.target.value) });
    }
    // productHowManySold
    if (e.target.name === "productHowManySold") {
      this.setState({ productHowManySold: encodeURIComponent(e.target.value) });
    }
    // Price change
    if (e.target.name === "buyCostPrice") {
      const priceValue = e.target.value;
      // If the current value passes the validity test then apply that to state
      if (e.target.validity.valid)
        this.setState({ buyCostPrice: encodeURIComponent(e.target.value) });
      // If the current val is just the negation sign, or it's been provided an empty string,
      // then apply that value to state - we still have to validate this input before processing
      // it to some other component or data structure, but it frees up our input the way a user
      // would expect to interact with this component
      else if (priceValue === "" || priceValue === "-") this.setState({ buyCostPrice: priceValue });
    }
    // can we send now?
    const listId = this.props.columnId;
    const contentState = {
      content: {
        name: encodeURIComponent(this.nameRef.current.value),
        code: encodeURIComponent(this.codeRef.current.value),
        color: encodeURIComponent(this.colorRef.current.value),
        howManySold: encodeURIComponent(this.howManySoldRef.current.value),
        buyCostPrice: encodeURIComponent(this.buyCostRef.current.value),
        approxCostPrice: encodeURIComponent(this.approxCostRef.current.value)
      }
    };
    // console.log(typeof this.outOfOrderRef.current.value, this.outOfOrderRef.current.value);
    console.log("can we send now List id ", this.props.stockItemDetails.id);
    // Time to send back with new updated values of Particular list
    return this.props.updateListItem(listId, contentState);
  };

  render() {
    /*
     * NOTE: productName is encodeURIComponent so decodeURIComponent to before showing
     * Decode and Display menu Name
     */
    const {
      productName,
      productCode,
      productColor,
      productHowManySold,
      approxCostPrice,
      buyCostPrice
    } = this.state;
    return (
      <div className="p-3 border w-100">
        <Row>
          <Col sm={{ size: 12 }}>
            <Fileds
              id="productName"
              name="productName"
              innerRef={this.nameRef}
              placeholder="Product Name"
              value={decodeURIComponent(productName)}
              onChange={e => this.handleChange(e)}
            />
          </Col>
          <Col sm={{ size: 6 }}>
            <Fileds
              id="productCode"
              name="productCode"
              innerRef={this.codeRef}
              placeholder="Product Code"
              value={decodeURIComponent(productCode)}
              onChange={e => this.handleChange(e)}
            />
          </Col>
          <Col sm={{ size: 6 }}>
            <Fileds
              id="productColor"
              name="productColor"
              innerRef={this.colorRef}
              placeholder="Product Color"
              value={decodeURIComponent(productColor)}
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 12 }}>
            {/* How many are sold */}
            <Fileds
              id="productHowManySold"
              name="productHowManySold"
              innerRef={this.howManySoldRef}
              placeholder="How many are sold"
              value={decodeURIComponent(productHowManySold)}
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6 }}>
            <Fileds
              id="approxCostPrice"
              name="approxCostPrice"
              innerRef={this.approxCostRef}
              placeholder="Yaklaşık Maliyet Fiyatlar"
              onChange={e => this.handleChange(e)}
              value={decodeURIComponent(approxCostPrice)}
            />
          </Col>
          <Col sm={{ size: 6 }}>
            <Fileds
              id="buyCostPrice"
              name="buyCostPrice"
              innerRef={this.buyCostRef}
              placeholder="Aliş Fiyatlar"
              type="tel"
              pattern="^-?[0-9]\d*\.?\d*$"
              onChange={this.handleChange}
              value={buyCostPrice}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StockDetails;
