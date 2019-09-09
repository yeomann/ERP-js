import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormInput
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { API_BASE_URL } from "../../api";
import {
  getSingleCategory,
  editSingleCategoryWithoutImage,
  postCategory
} from "../../actions/GeneralAction";

class EditStock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedSuccessfully: false,
      valid: null,
      invalid: null,
      categoryRemoteObj: {},
      files: []
    };
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.props.getSingleCategory(this.props.match.params.id);
  }
  // After loading saving the Category data for local use
  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (nextProps.categorySingle !== prevState.categoryRemoteObj) {
      // lets save category remote info into local state but we can't use setstate here
      return { categoryRemoteObj: nextProps.categorySingle };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  // setting state with remote info of category
  componentDidUpdate(prevProps, prevState) {
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    if (prevState.categorySingle !== this.state.categoryRemoteObj) {
      // set state with category remote info
      this.setState({
        categoryRemoteObj: prevState.categorySingle
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.goToCateogoryPage);
    this.setValid();
  }

  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });

  defaultImage = categorySingle => {
    if (typeof categorySingle !== "undefined" && categorySingle.image !== void 0) {
      return (
        <div style={thumb} key={categorySingle.image.name}>
          <div style={thumbInner}>
            <img
              src={`${API_BASE_URL}${categorySingle.image.url}`}
              style={img}
              alt="restaurant logo"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  editCategorySubmit = () => {
    const CatID = this.props.categorySingle.catId;
    const newCatName = this.textInput.current.value;
    // console.log(newCatName.length, newCatName);
    if (newCatName.length === 0) {
      return this.setInValid();
    }
    this.setValid();

    // console.log(this.state.categoryRemoteObj, this.state.files[0]);
    /*
     * Before updating we will make sure 1 filed is updated,
     * Case 1:  image and title can be same, we will not do remote request.
     * Case 2: if title is entered same again, then we treat as new value & do remote request.
     * Case 3:  if title and image both changed, then do remote req as usual.
     * we will check Atleast name is updated or not.
     */
    // check if image is still the same, unedited
    if (this.state.files[0] === void 0) {
      this.props.editSingleCategoryWithoutImage(CatID, newCatName); // only title changed
    } else {
      this.props.postCategory(CatID, newCatName, this.state.files[0]); // full req on POST as usual
    }
    // this.props.editSingleCategory(CatID, newCatName, this.state.files[0]);
    this.setState(
      {
        editedSuccessfully: true
      },
      () => {
        this.goToCateogoryPage = setInterval(() => this.props.history.push("/categories"), 2000);
      }
    );
  };

  onDrop(files) {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  }
  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const { title, catSingleLoader: editLoaded, categorySingle } = this.props;
    const { files } = this.state;
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="restaurant logo" />
        </div>
      </div>
    ));
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4" style={{ justifyContent: "space-between" }}>
          <PageTitle
            sm="4"
            title="Edit Category"
            subtitle={process.env.REACT_APP_SECRET_APP_NAME}
            className="text-sm-left"
          />
          <Button
            theme="white"
            className="px-2"
            onClick={() =>
              this.props.history.replace("/categories", {
                isComingBack: true
              })
            }
          >
            <i className="material-icons">arrow_back_ios</i> Back
          </Button>
        </Row>
        {this.state.editedSuccessfully && (
          <Container>
            <Alert theme="warning">UI will auto redirect in 3 seconds!</Alert>
          </Container>
        )}
        <Row>
          {/* Sidebar Widgets */}
          <Col lg="12" md="12">
            <Card small className="mb-3">
              <Loader loaded={!editLoaded}>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">{title}</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <ListGroup flush>
                    <ListGroupItem className="d-flex px-3">
                      <InputGroup className="ml-auto">
                        <FormInput
                          placeholder={categorySingle.name}
                          size="lg"
                          innerRef={this.textInput}
                          valid={this.state.valid}
                          invalid={this.state.invalid}
                        />
                        <InputGroupAddon type="append">
                          <Button className="px-2" onClick={this.editCategorySubmit}>
                            Save <i className="material-icons">add</i>
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
                <section className="text-center">
                  <Dropzone
                    accept="image/*"
                    onDrop={this.onDrop.bind(this)}
                    multiple={false}
                    onFileDialogCancel={this.onCancel.bind(this)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop to Change Category Logo</p>
                      </div>
                    )}
                  </Dropzone>
                  <aside style={thumbsContainer}>
                    {this.state.files.length > 0 ? (
                      <React.Fragment>{thumbs}</React.Fragment>
                    ) : (
                      <React.Fragment>{this.defaultImage(categorySingle)}</React.Fragment>
                    )}
                  </aside>
                </section>
              </Loader>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 250,
  height: 250,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

EditStock.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

EditStock.defaultProps = {
  title: "Edit below"
};

const mapStateToProps = state => {
  return {
    catSingleLoader: state.general.catSingleLoader,
    categorySingle: state.general.categorySingle
    // editCatLoader: state.general.editCatLoader,
    // editCategoryStatus: state.general.editCategoryStatus
  };
};

export default connect(
  mapStateToProps,
  {
    getSingleCategory,
    postCategory,
    editSingleCategoryWithoutImage
  }
)(EditStock);
