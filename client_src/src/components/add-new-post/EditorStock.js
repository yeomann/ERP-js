import React from "react";
// import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput
  // FormCheckbox,
  // Badge
  // Alert
} from "shards-react";
import { StockContext } from "../../views/stock/stockProvider";

const Fileds = p => (
  <FormGroup>
    <label htmlFor={p.id}>{p.placeholder}</label>
    <FormInput {...p} />
  </FormGroup>
);

class StockEditor extends React.PureComponent {
  // get static context
  static contextType = StockContext;
  // constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      minPrice: ""
    };
    this.resetContext = this.resetContext.bind(this);
  }

  resetContext() {
    // const restContext = useContext(StockContext);
    // console.log(restContext);
    console.log(this.context);
    this.context.resetStates(); // reset all states
  }
  // https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
  handleChange = (e, openCloseStatus, context) => {
    const val = e.target.value;
    // If the current value passes the validity test then apply that to state
    if (e.target.validity.valid) this.setState({ minPrice: e.target.value });
    // If the current val is just the negation sign, or it's been provided an empty string,
    // then apply that value to state - we still have to validate this input before processing
    // it to some other component or data structure, but it frees up our input the way a user
    // would expect to interact with this component
    else if (val === "" || val === "-") this.setState({ minPrice: val });
    // update context
    context.handleCustomRestarauntFields("minPrice", val);
  };

  render() {
    return (
      <Card className="mb-3">
        <CardBody>
          <StockContext.Consumer>
            {context => (
              <Form className="add-new-post">
                <Row>
                  <Col>
                    <Fileds
                      id="name"
                      name="name"
                      placeholder="Stock Item Name"
                      value={context.states.name}
                      onChange={context.handleRestaurantChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Fileds
                      id="stockDateTime"
                      name="stockDateTime"
                      placeholder="Stock DateTime"
                      value={context.states.stockDateTime}
                      onChange={context.handleRestaurantChange}
                      disabled={true}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </StockContext.Consumer>
        </CardBody>
      </Card>
    );
  }
}

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function componen
// export default forwardRef((props, ref) => <StockEditor innerRef={ref} {...props} />);
// StockEditor.contextType = StockContext;
export default StockEditor;
