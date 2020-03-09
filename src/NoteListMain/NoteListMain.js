import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import NoteContext from "../NoteContext";
import {getNotesForFolder} from "../notes-helpers";
import PropTypes from "prop-types";

export default class NoteListMain extends Component {
  static contextType = NoteContext;
  render() {
    const {folder_id} = this.props.match.params;
    return (
      <section className='NoteListMain'>
        <ul>
          {getNotesForFolder(this.context.notes, folder_id).map(note => (
            <li key={note.note_id}>
              <Note
                handleDelete={this.context.handleDelete}
                note_id={note.note_id}
                note_name={note.note_name}
                date_modified={note.date_modified}
              />
            </li>
          ))}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: [],
};
NoteListMain.propTypes = {
  folder_id: PropTypes.number,
};
