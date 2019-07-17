import React, { Component } from "react";
import "./App.css";
import Nav from "./nav/Nav";
import Form from "./form/Form";
import FileViewer from "./fileViewer/FileViewer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { varList: null, generatedFile: null };
  }
  componentDidMount() {
    this.setBodyBackground(8);
  }
  setBodyBackground = max => {
    let rand = Math.floor(Math.random() * Math.floor(max));
    document.body.classList.add("bckgrnd_" + rand);
  };
  fetchVariable = filePath => {
    fetch("/api/templates/var/" + filePath)
      .then(res => res.json())
      .then(variables => {
        this.setState({ varList: variables, filePath: filePath });
      });
  };
  buildFile = (varList = {}) => {
    console.log("varList : " + varList);
    let reqUrl = "/api/templates/var/" + this.state.filePath;
    let reqBody = JSON.stringify(varList);
    console.log("reqBody" + reqBody);
    fetch(reqUrl, {
      method: "POST",
      body: reqBody,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.text())
      .then(fileContent => {
        this.setState({ generatedFile: fileContent });
      });
  };
  saveFile = rep => {
    if (rep === "y") {
      let reqUrl = "/api/templates/save/" + this.state.filePath;
      fetch(reqUrl)
        .then(res => res.text())
        .then(text => alert(text));
    }
    this.setState({ generatedFile: null });
  };
  manageFormDisplay = () => {
    if (this.state.varList === null) {
      return <h1 className="placeholder">Select a template</h1>;
    } else if (this.state.varList.length === 0) {
      return <h1 className="placeholder">No variables on selected template</h1>;
    } else {
      return (
        <Form
          fileBuilder={this.buildFile}
          filePath={this.state.filePath}
          varList={this.state.varList}
        />
      );
    }
  };
  render() {
    return (
      <div className="App">
        <Nav ClickEv={this.fetchVariable} />
        {this.manageFormDisplay()}
        {this.state.generatedFile ? (
          <FileViewer
            manageFile={this.saveFile}
            fileContent={this.state.generatedFile}
          />
        ) : null}
      </div>
    );
  }
}
