import React, {Component} from "react";
import {Route, Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NoteContext from "../NoteContext";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import NotefulError from "../NotefulError/NotefulError";
import {findNote, findFolder} from "../notes-helpers";
import "./App.css";

class App extends Component {
    state = {
        notes: [],
        folders: [],
        err: null
    };
    FolderUrl = "https://immense-inlet-72450.herokuapp.com/api/folders";
    NoteUrl = "https://immense-inlet-72450.herokuapp.com/api/notes";

    componentDidMount() {
        fetch(this.FolderUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(
                        "Something went wrong, please try again later."
                    );
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    folders: data,
                    error: null
                });
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
                console.log(err);
            });

        fetch(this.NoteUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(
                        "Something went wrong, please try again later."
                    );
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    notes: data,
                    error: null
                });
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
    }

    handleDeleteNote = note_id => {
        const newNotes = this.state.notes.filter(
            note => note.note_id !== note_id
        );
        const options = {
            method: "DELETE"
        };
        fetch(`${this.NoteUrl}/${note_id}`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong");
                }
                this.setState(
                    {
                        notes: newNotes,
                        error: null
                    },
                    () => {
                        console.log(this.state);
                        this.props.history.replace("/");
                    }
                );
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
    };

    handleAddFolder = folder => {
        this.setState(
            {
                folders: [...this.state.folders, folder]
            },
            () => this.props.history.replace("/")
        );
    };

    handleAddNote = note => {
        this.setState({ notes: [...this.state.notes, note] }, () =>
            this.props.history.replace("/")
        );
    };

    renderNavRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {["/", "/folder/:folder_id"].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:note_id"
                    render={routeProps => {
                        const { note_id } = routeProps.match.params;
                        const note = findNote(notes, note_id) || {};
                        const folder = findFolder(folders, note.folder_id);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {["/", "/folder/:folder_id"].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            return <NoteListMain {...routeProps} />;
                        }}
                    />
                ))}
                <Route
                    path="/note/:note_id"
                    render={routeProps => {
                        console.log(
                            `This is route NoteMainPaige ${routeProps}`
                        );
                        return <NotePageMain {...routeProps} />;
                    }}
                />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }
    render() {
        return (
            <NoteContext.Provider
                value={{
                    folders: this.state.folders,
                    notes: this.state.notes,
                    handleDelete: this.handleDeleteNote,
                    handleAddNote: this.handleAddNote,
                    handleAddFolder: this.handleAddFolder
                }}
            >
                <div className="App">
                    <NotefulError>
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    </NotefulError>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{" "}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <NotefulError>
                        <main className="App__main">
                            {this.renderMainRoutes()}
                        </main>
                    </NotefulError>
                </div>
            </NoteContext.Provider>
        );
    }
}

export default withRouter(App);
