import React from "react";
import "./styles.css";
import TodoList from "./TodoList";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      editValue: "",
      temp: "",
      grocery: [],
      editMode: false,
      errorEdit: false
    };
  }

  errorToggle = () => {
    this.setState({ errorEdit: true });
  };

  setDefault = e => {
    this.setState({ editValue: e, editMode: true });
  };

  handleChange = event => {
    const newState = {
      temp: event.target.value,
      toggle: false
    };
    this.setState(newState);
    if (newState.temp.length === 30) {
      this.setState({ toggle: true });
      alert("char length reached");
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.editMode === false) {
      this.setState({
        temp: "",
        grocery: [...this.state.grocery, this.state.temp]
      });
      event.target.reset();
    } else {
      this.setState({ errorEdit: true });
    }
  };

  handleRemove = event => {
    const filteredArray = this.state.grocery.filter(
      (_, i) => i !== Number(event.target.parentElement.id)
    );
    this.setState({
      grocery: filteredArray
    });
  };

  handleFieldChange = event => {
    this.setState({ editValue: event.target.value });
  };

  arraySplicer = event => {
    let newArray = [...this.state.grocery];
    newArray.splice(
      Number(event.target.parentElement.parentElement.id),
      1,
      this.state.editValue
    );

    this.setState({
      grocery: newArray,
      editMode: false,
      errorEdit: false
    });
  };

  render() {
    return (
      <div className="todocontainer">
        <form className="formtop" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="What do you wanna do?"
            maxLength={30}
          />
          <br />
          &nbsp;
          <br />
          <input type="submit" value="Lets do it!" />
        </form>
        <br />
        {this.state.grocery.map((item, ind) => (
          <TodoList
            deleteMe={this.handleRemove}
            entireList={this.state.grocery}
            onChange={this.handleFieldChange}
            onKeyDown={this.handleKeyDown}
            handleToggle={this.handleToggle}
            stateList={this.state}
            arraySplicer={this.arraySplicer}
            id={ind}
            todo={this.state.grocery[ind]}
            key={item + ind}
            setDefault={this.setDefault}
            errorToggle={this.errorToggle}
          />
        ))}{" "}
        {this.state.errorEdit ? (
          <p>
            <span className="error">{`* Finish Editing Item First! * `}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Form;
