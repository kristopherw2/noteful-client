import React, { Component } from 'react';
import Note from '../Note/Note';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

export default class NotePageMain extends Component {
  static contextType = NoteContext;
  
  
  render() {
    
    const { note_id } = this.props.match.params;
    const note = findNote(this.context.notes, note_id);
    
    return (
      <section className='NotePageMain'>
        <Note
          note_id={note.note_id}
          note_name={note.note_name}
          date_modified={note.date_modified}
          handleDelete={this.context.handleDelete}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
    
  }
}


NotePageMain.defaultProps = {
  note: {
    content: ''
  }
};

NotePageMain.propTypes = {
  note_id: PropTypes.number
};