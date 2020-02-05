import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {format} from "date-fns";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Note.css";

class Note extends Component {
  render() {
    console.log(this.props.modified);
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.noteId}`}>{this.props.name}</Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={() => {
            this.props.handleDelete(this.props.noteId);
            this.props.history.push("/");
          }}
        >
          <FontAwesomeIcon icon='trash-alt' /> remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified{" "}
            <span className='Date'>
              {format(new Date(this.props.modified), "MM DD yyyy")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Note);

Note.propTypes = {
  modified: PropTypes.string,
  noteId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
};
