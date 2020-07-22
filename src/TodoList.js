import React from "react";
import "./styles.css";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      edit: ""
    };
  }

  handleToggle = () => {
    if (this.props.stateList.editMode === false) {
      this.setState({
        toggle: false
      });
      this.props.setDefault(this.props.todo);
    } else {
      this.props.errorToggle();
    }
  };

  handleKeyDown = event => {
    if (event.key === "Enter" && this.props.stateList.editValue.length > 0) {
      this.props.arraySplicer(event);
      this.setState({ toggle: true });
    }
  };

  render() {
    return (
      <div className="todoShell" id={this.props.id}>
        {this.state.toggle ? (
          <span className="todo">
            <input
              name="nonedit"
              readOnly
              type="text"
              defaultValue={this.props.todo}
            />
          </span>
        ) : (
          <span className="todo">
            <input
              name="edit"
              type="text"
              defaultValue={this.props.todo}
              onChange={this.props.onChange}
              onKeyDown={this.handleKeyDown}
            />
          </span>
        )}
        <button id="edit" onClick={this.handleToggle}>
          EDIT
        </button>
           
        <button id="delete" onClick={this.props.deleteMe}>
          DEL
        </button>
        {/* {!this.state.toggle && this.props.stateList.errorEdit ? (
          <span>{` <<< finish editing first!`}</span>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

export default TodoList;
