import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {format} from "date-fns";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Note.css";

class Note extends Component {
  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.note_id}`}>{this.props.note_name}</Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={() => {
            this.props.handleDelete(this.props.note_id);
            this.props.history.push("/");
          }}
        >
          <FontAwesomeIcon icon='trash-alt' /> remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Date_modified{" "}
            <span className='Date'>
              {format(new Date(this.props.date_modified),  "Do MMM yyyy"
)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Note);

Note.propTypes = {
  date_modified: PropTypes.string,
  note_id: PropTypes.number.isRequired,
  note_name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
};
