import React from "react";
// import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  ButtonToolbar,
  ButtonGroup,
  Button,
  FormCheckbox
  // Badge
  // Alert
} from "shards-react";
import { OrderInvoicesContext } from "../../views/ordersAndInvoices/OrderProvider";

const Fileds = p => (
  <FormGroup>
    <label htmlFor={p.id}>{p.placeholder}</label>
    <FormInput {...p} />
  </FormGroup>
);

class OrderEditor extends React.PureComponent {
  // get static context
  static contextType = OrderInvoicesContext;
  // constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSelected: "",
      craftCantaBooleanAccept: false,
      craftCantaBooleanNotAccpet: false,
      inhouseShareProduct: false,
      inhouseShareNotProduct: false
    };
    this.resetContext = this.resetContext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  resetContext() {
    // const restContext = useContext(OrderInvoicesContext);
    // console.log(restContext);
    console.log(this.context);
    this.context.resetStates(); // reset all states
  }

  onFormSelect = formSelected => {
    this.setState({
      formSelected: formSelected
    });
  };

  handleChange(e) {
    if (e.target.name === "craftCantaBooleanAccept") {
      return this.setState({
        craftCantaBooleanAccept: true,
        craftCantaBooleanNotAccpet: false
      });
    } else if (e.target.name === "craftCantaBooleanNotAccpet") {
      return this.setState({
        craftCantaBooleanAccept: false,
        craftCantaBooleanNotAccpet: true
      });
    } else if (e.target.name === "craftCantaBooleanNotAccpet") {
      return this.setState({
        craftCantaBooleanAccept: false,
        craftCantaBooleanNotAccpet: true
      });
    } else if (e.target.name === "craftCantaBooleanNotAccpet") {
      return this.setState({
        craftCantaBooleanAccept: false,
        craftCantaBooleanNotAccpet: true
      });
    } else this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { formSelected } = this.state;
    return (
      <Card className="mb-3">
        <CardHeader className="pb-0">
          {" "}
          <h4>Form Türünü Seçin</h4>
          <ButtonToolbar>
            <ButtonGroup size="lg" className="w-100">
              <Button
                theme={formSelected === "inshop" ? "info" : "dark"}
                className="w-100"
                disabled={formSelected === "inshop"}
                onClick={() => this.onFormSelect("inshop")}
              >
                Dükkanda
              </Button>
              <Button
                theme={formSelected === "online" ? "warning" : "dark"}
                className="w-100"
                disabled={formSelected === "online"}
                onClick={() => this.onFormSelect("online")}
              >
                İnternet üzerinden
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          {/* <span>{`->${formSelected}`}</span> */}
        </CardHeader>
        <CardBody className="pt-3">
          <OrderInvoicesContext.Consumer>
            {context => (
              <Form className="add-new-post">
                <Row>
                  <Col>
                    <Fileds
                      id="OrderDateTime"
                      name="OrderDateTime"
                      placeholder="Sipariş Tarihi ve Saati"
                      value={context.states.OrderDateTime}
                      onChange={context.handleChange}
                      disabled={true}
                    />
                  </Col>
                </Row>
                {formSelected === "inshop" && (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <Fileds
                          id="inhouseName"
                          name="inhouseName"
                          placeholder="Ad Soyad"
                          value={context.states.inhouseName}
                          onChange={context.handleChange}
                        />
                      </Col>
                      <Col>
                        <Fileds
                          id="inhouseTelephoneNo"
                          name="inhouseTelephoneNo"
                          placeholder="Telefon No"
                          value={context.states.inhouseTelephoneNo}
                          onChange={context.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="mb-2">
                          Craft Çanta ve Hediye Paketi Ek Ücreti <u>5 TL</u>:
                        </p>
                        <FormCheckbox
                          name="craftCantaBooleanAccept"
                          checked={this.state.craftCantaBooleanAccept}
                          onChange={this.handleChange}
                        >
                          Talep Ediyorum
                        </FormCheckbox>
                        <FormCheckbox
                          name="craftCantaBooleanNotAccpet"
                          checked={this.state.craftCantaBooleanNotAccpet}
                          onChange={this.handleChange}
                        >
                          Talep Etmiyorum
                        </FormCheckbox>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <p className="mb-2">Ürününüz Sosyal Ağda (Instagram, Facebook):</p>
                        <FormCheckbox
                          name="inhouseShareProduct"
                          checked={this.state.inhouseShareProduct}
                          onChange={this.handleChange}
                        >
                          Paylaşılsın
                        </FormCheckbox>
                        <FormCheckbox
                          name="inhouseShareNotProduct"
                          checked={this.state.inhouseShareNotProduct}
                          onChange={this.handleChange}
                        >
                          Paylaşılmasın
                        </FormCheckbox>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg="12">
                        <Fileds
                          id="inHouseProduct"
                          name="inHouseProduct"
                          placeholder="Product"
                          value={context.states.inHouseProduct}
                          onChange={context.handleChange}
                        />
                      </Col>
                      <Col lg="12">
                        <Fileds
                          id="inhousePayment"
                          name="inhousePayment"
                          placeholder="Ödeme"
                          value={context.states.inhousePayment}
                          onChange={context.handleChange}
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
                {formSelected === "online" && (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <Fileds
                          id="inhouseName"
                          name="inhouseName"
                          placeholder="Ad Soyad"
                          value={context.states.inhouseName}
                          onChange={context.handleChange}
                        />
                      </Col>
                      <Col>
                        <Fileds
                          id="inhouseTelephoneNo"
                          name="inhouseTelephoneNo"
                          placeholder="Telefon No"
                          value={context.states.inhouseTelephoneNo}
                          onChange={context.handleChange}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        <p className="mb-2">Ürününüz Sosyal Ağda (Instagram, Facebook):</p>
                        <FormCheckbox
                          name="inhouseShareProduct"
                          checked={this.state.inhouseShareProduct}
                          onChange={this.handleChange}
                        >
                          Paylaşılsın
                        </FormCheckbox>
                        <FormCheckbox
                          name="inhouseShareNotProduct"
                          checked={this.state.inhouseShareNotProduct}
                          onChange={this.handleChange}
                        >
                          Paylaşılmasın
                        </FormCheckbox>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <p className="mb-2">Hedooye Kapıya Teslim:</p>
                        <FormCheckbox
                          name="inhouseShareProduct"
                          checked={this.state.inhouseShareProduct}
                          onChange={this.handleChange}
                        >
                          Evet, Gönderilsin
                        </FormCheckbox>
                        <FormCheckbox
                          name="inhouseShareNotProduct"
                          checked={this.state.inhouseShareNotProduct}
                          onChange={this.handleChange}
                        >
                          Haayır, Ofisten Teslim
                        </FormCheckbox>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <h5>Ödeme Bilgileri</h5>
                      <Col lg="12">
                        <Fileds
                          id="inhousePayment"
                          name="inhousePayment"
                          placeholder="Ödenecek Tutar"
                          value={context.states.inhousePayment}
                          onChange={context.handleChange}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg="6">
                        <Fileds
                          id="inHouseProduct"
                          name="inHouseProduct"
                          placeholder="Siparişi Alan"
                          value={context.states.inHouseProduct}
                          onChange={context.handleChange}
                        />
                      </Col>
                      <Col lg="6">
                        <Fileds
                          id="inhousePayment"
                          name="inhousePayment"
                          placeholder="Baskı Operatörü"
                          value={context.states.inhousePayment}
                          onChange={context.handleChange}
                        />
                      </Col>
                      <Col lg="12">
                        <Fileds
                          id="inhousePayment"
                          name="inhousePayment"
                          placeholder="Ürün Bilgisi"
                          value={context.states.inhousePayment}
                          onChange={context.handleChange}
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
              </Form>
            )}
          </OrderInvoicesContext.Consumer>
        </CardBody>
      </Card>
    );
  }
}

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function componen
// export default forwardRef((props, ref) => <OrderEditor innerRef={ref} {...props} />);
// OrderEditor.contextType = OrderInvoicesContext;
export default OrderEditor;
