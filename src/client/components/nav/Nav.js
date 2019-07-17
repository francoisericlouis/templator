import React, { Component } from "react";
import "./Nav.css";
import { domainToASCII } from "url";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: null, openedMenu: [] };
  }
  componentDidMount() {
    this.getMenu();
  }
  getMenu = () => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(m => this.setState({ menu: m }));
  };

  getComponent = key => {
    this.props.ClickEv(key);
  };

  buildMenu(menu, rootPath = "", direction = "") {
    return menu.map((elem, index) => {
      if (elem.type == "d" && elem.children.length > 0) {
        return (
          <li className="dropdown-menu" key={index}>
            <span className="dropdown-label">{elem.name}</span>
            <ul className={"dropdown-menu-content " + direction}>
              {this.buildMenu(
                elem.children,
                rootPath + "/" + elem.name + "/",
                "right"
              )}
            </ul>
          </li>
        );
      } else if (elem.type == "f") {
        return (
          <li
            key={index}
            onClick={() => this.getComponent(rootPath + elem.name)}
          >
            <span>{elem.name}</span>
          </li>
        );
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.menu ? (
          <ul className="navbar">{this.buildMenu(this.state.menu)}</ul>
        ) : (
          <h1>Loading.. please wait...</h1>
        )}
      </div>
    );
  }
}
