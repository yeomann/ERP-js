import React, { Component } from "react";
import { CardBody, Card, Row, Col, Badge } from "shards-react";
import Dropzone from "react-dropzone";

import { API_BASE_URL } from "../../api";

const INITAL_STATE = {
  isEdit: false,
  files: []
};
export class Logo extends Component {
  constructor() {
    super();
    this.state = INITAL_STATE;
    this.renderThumb = this.renderThumb.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    Array.isArray(this.state.files) &&
      this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
    this.resetFileState(); // we want to reset logo of component
  }

  resetFileState() {
    // before reseting check if we have file,
    // if file exsits then no need to touch anything
    if (this.state.files.length < 1) this.setState({ files: [] });
  }

  setLocalFileState = inComingFiles => {
    return this.setState(
      {
        files: inComingFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      },
      () => {
        // Save and render again - force save bcz of edit logo might be present
        this.onSave();
      }
    );
  };
  onDrop(inComingFiles) {
    const { isEdit } = this.state;

    console.log("onDrop =>  DROPED FILE");
    console.log(this.state);

    // console.log(inComingFiles);

    // file is loaded using EDIT
    // first reset everything Context and Local State
    if (isEdit) {
      // context logo state reset
      this.props.resetLogoContext();
      // local state reset for files only
      this.setState(
        {
          isEdit: false,
          files: []
        },
        () => {
          console.log(this.state);
          // finally showing the new logo and setting in context
          this.setLocalFileState(inComingFiles);
        }
      );
    } else {
      // its a fresh start
      this.setLocalFileState(inComingFiles);
    }
  }

  onSave = () => {
    // console.log(this.state.files[0]);
    // After drop, set provider context with logo
    this.props.onSaveLogoEvent(this.state.files[0]);
  };
  // called by parent
  remoteSetLogo = state => {
    // NOT SAVING IN CONTEXT
    return this.setState(
      {
        files: state,
        isEdit: true
      },
      () => this.renderThumb(true, this.state.files)
    );
  };

  renderThumb(isEdit, filesState) {
    // console.log("Render Thumb => " + isEdit);
    // console.log(filesState);
    // const { isEdit } = this.state;
    // edit restraunt logo preview
    if (isEdit) {
      // console.log(filesState);
      return (
        <div style={thumb} key={filesState.name}>
          <div style={thumbInner}>
            <img src={`${API_BASE_URL}${filesState.url}`} style={img} alt="restaurant logo" />
          </div>
        </div>
      );
    }
    // preview at the time of New Restrauant creation
    return filesState.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="restaurant logo" />
        </div>
      </div>
    ));
  }

  render() {
    const { isEdit, files } = this.state;

    return (
      <Card small className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <section>
                <Dropzone
                  accept="image/*"
                  onDrop={this.onDrop.bind(this)}
                  multiple={false}
                  // onFileDialogCancel={this.resetFileState.bind(this)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Badge className="restaurant__uploadInput" outline>
                        Resim yüklemek / düzenlemek için buraya tıklayın
                      </Badge>
                    </div>
                  )}
                </Dropzone>
                <aside style={thumbsContainer}>
                  <React.Fragment>{this.renderThumb(isEdit, files)}</React.Fragment>
                  {/* <React.Fragment>
                    <pre>{JSON.stringify(this.state)}</pre>
                  </React.Fragment> */}
                </aside>
              </section>
            </Col>
          </Row>
        </CardBody>
      </Card>
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
  width: 100,
  height: 100,
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

export default Logo;
