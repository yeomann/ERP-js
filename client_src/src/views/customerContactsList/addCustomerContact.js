import React from "react";
// import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
  // Badge
  // Alert
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

const Fileds = p => (
  <FormGroup>
    <label htmlFor={p.id}>{p.placeholder}</label>
    <FormInput {...p} />
  </FormGroup>
);

class AddEditCustomerContact extends React.PureComponent {
  // get static context
  // constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      phoneNo: "",
      whichCompany: "",
      officeNo: "",
      email: "",

      craftCantaBooleanAccept: false,
      craftCantaBooleanNotAccpet: false,
      inhouseShareProduct: false,
      inhouseShareNotProduct: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  resetContext() {
    // const restContext = useContext(OrderInvoicesContext);
    // console.log(restContext);
    console.log(this.context);
    this.this.resetStates(); // reset all states
  }

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

  submitHandler = () => {};

  render() {
    // NOTE: for editing
    const { isThisEditing } = this.props;
    const { name, phoneNo, whichCompany, officeNo, email } = this.state;
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4" style={{ justifyContent: "space-between" }}>
          <PageTitle
            sm="4"
            title="Save Customer Contact"
            subtitle={process.env.REACT_APP_SECRET_APP_NAME}
            className="text-sm-left"
          />
          <Button
            theme="white"
            className="px-2"
            onClick={() =>
              this.props.history.replace("/customer-with-debits-veresiye", {
                isComingBack: true
              })
            }
          >
            <i className="material-icons">arrow_back_ios</i> Back
          </Button>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader className="pb-0">
                <h4>Lütfen aşağıdaki formu doldurunuz</h4>
              </CardHeader>
              <CardBody className="pt-3">
                <Form className="add-new-post">
                  <React.Fragment>
                    <Row>
                      <Col lg="6">
                        <Fileds
                          id="name"
                          name="name"
                          placeholder="Ad Soyad"
                          value={name}
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col lg="6">
                        <Fileds
                          id="phoneNo"
                          name="phoneNo"
                          placeholder="Telefon Numarası"
                          value={phoneNo}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Fileds
                          id="phoneNo"
                          name="phoneNo"
                          placeholder="İlitişim numarası"
                          value={phoneNo}
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col lg="6">
                        <Fileds
                          id="whichCompany"
                          name="whichCompany"
                          placeholder="Hangi Firma"
                          value={whichCompany}
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col lg="6">
                        <Fileds
                          id="officeNo"
                          name="officeNo"
                          placeholder="Ofis telefonu"
                          value={officeNo}
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col lg="6">
                        <Fileds
                          id="email"
                          name="email"
                          placeholder="E-posta"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button
                          theme={isThisEditing ? "accent" : "success"}
                          size="lg"
                          block
                          className="ml-auto textWrap saveBtn mt-2"
                          onClick={this.submitHandler}
                        >
                          <i className="material-icons">file_copy</i>{" "}
                          {isThisEditing ? "Update" : "Create"}
                        </Button>
                      </Col>
                    </Row>
                  </React.Fragment>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function componen
// export default forwardRef((props, ref) => <OrderEditor innerRef={ref} {...props} />);
// OrderEditor.contextType = OrderInvoicesContext;
export default AddEditCustomerContact;
