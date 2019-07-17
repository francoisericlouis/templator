import React, { Component } from "react";
import "./FileViewer.css";

export default class FileViewer extends Component {
  state = {};
  handleChoice = rep => {
    this.props.manageFile(rep);
  };
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <input
            type="button"
            value="save"
            onClick={() => this.handleChoice("y")}
          />
          <input
            type="button"
            value="discard"
            onClick={() => this.handleChoice("n")}
          />
          <p className="text-content">{this.props.fileContent}</p>
        </div>
      </div>
    );
  }
}
