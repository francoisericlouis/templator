import React, { Component } from "react";
import "./Form.css";
const formLoading = <div>LOADING...</div>;
export default class Form extends Component {
  state = {
    varList: null
  };
  componentDidMount() {
    this.buildVarList();
  }
  /* adjust display of textarea depending on char count */
  handleInputStyle = field => {
    let fieldValue = field.value;
    let fieldWidth = field.getBoundingClientRect().width;
    let fieldRows = field.rows;
    field.rows = (fieldValue.length * 8.3) / fieldWidth + 1;
  };
  buildVarList = () => {
    let varList = [];
    this.props.varList.map(varName => {
      varList.push({ key: varName, value: null });
    });
    return varList;
  };
  submitForm = () => {
    let varList = {};
    let inputs = document
      .getElementById("templater-form")
      .getElementsByTagName("textarea");
    for (let i = 0; i < inputs.length; i++) {      
        varList[inputs[i].name] = inputs[i].value;
    }
    this.props.fileBuilder(varList); //call parent function
  };
  renderForm = () => {
    return (
      <form
        id="templater-form"
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <h1>{this.props.filePath}</h1>
        <div className="border-bottom-white" />
        <div className="form-fields-container">
          {this.buildVarList().map((field, index) => {
            return (
              <p key={index}>
                <label htmlFor={field.key}>
                  {field.key.charAt(0).toUpperCase() + field.key.slice(1)}
                </label>
                <textarea
                  onChange={e => this.handleInputStyle(e.target)}
                  name={field.key}
                  rows="1"
                />
              </p>
            );
          })}
        </div>
        <div className="border-top-white" />
        <button id="submit-button" type="submit">
          Build File
        </button>
      </form>
    );
  };
  render() {
    return <div className="generated-form">{this.renderForm()}</div>;
  }
}
