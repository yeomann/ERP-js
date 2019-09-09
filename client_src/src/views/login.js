import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  // FormTextarea,
  Button
} from "shards-react";
import { LoginUserCall } from "../actions/AuthAction";
// import { loginValidator } from "../utils/loginValidator";

class UserLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "erp@magicerp.com",
      password: "1q2w3e4r5t#P@$$w0RD"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // await loginValidator();
  }

  handleChange(e) {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleSubmit() {
    // console.log(this.state);
    const { history } = this.props;
    this.props.LoginUserCall(this.state.email, this.state.password, history);
  }

  render() {
    const { email, password } = this.state;
    const { title } = this.props;
    return (
      <Card small className="mb-4 loginCard">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        value={email}
                        onChange={this.handleChange}
                        autoComplete="email"
                      />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        type="password"
                        id="fePassword"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange}
                        autoComplete="current-password"
                      />
                    </Col>
                  </Row>
                  <Button onClick={this.handleSubmit} theme="accent">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

UserLogin.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserLogin.defaultProps = {
  title: "Enter Login Details"
};

// eslint-disable-next-line
const mapsStateToProps = props => {};

export default compose(
  withRouter,
  connect(
    null,
    {
      LoginUserCall
    }
  )
)(UserLogin);
