import * as ReactDOM from "react-dom";
import * as React from "react";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { AlertList } from "react-bs-notifier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorBoundary from "../ErrorBoundary";
import Card from "../components/Card";

export type UserPlaylistsProps = {
  user: ListenBrainzUser;
  apiUrl: string;
  playlists?: Playlist[];
};

export type UserPlaylistsState = {
  playlists: Playlist[];
};

export default class UserPlaylists extends React.Component<
  UserPlaylistsProps,
  UserPlaylistsState
> {
  constructor(props: UserPlaylistsProps) {
    super(props);

    this.state = {
      playlists: props.playlists || [],
    };
  }

  deletePlaylist = (event: React.SyntheticEvent) => {
    // Delete playlist by id
    // event.target.id ?
  };

  createPlaylist = (event: React.SyntheticEvent) => {
    // Delete playlist by id
    // event.target.id ?
    // Show modal or section with playlist attributes
    // name, description, private/public
    // Then call API endpoint POST  /1/playlist/create
  };

  render() {
    const { playlists } = this.state;
    const { apiUrl, user } = this.props;

    return (
      <div>
        <button
          title="Create new playlist"
          type="button"
          className="btn btn-info pull-right"
          onClick={this.createPlaylist}
        >
          <h1>Playlists</h1>
          <FontAwesomeIcon icon={faPlusCircle as IconProp} />
          &nbsp;&nbsp;New playlist
        </button>
        <div
          id="playlists-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {playlists.map((playlist: Playlist) => {
            return (
              <Card className="playlist" key={playlist.id}>
                <div className="image" />
                <div className="info">
                  {playlist.title}
                  <br />
                  {playlist.description}
                  <br />
                  Last Modified: {playlist.last_modified}
                  <br />
                  Created at:{playlist.created_at}
                </div>
              </Card>
            );
          })}
          <Card className="new-playlist" onClick={this.createPlaylist}>
            <div>
              <FontAwesomeIcon icon={faPlusCircle as IconProp} size="2x" />
              <span>Create new playlist</span>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const domContainer = document.querySelector("#react-container");
  const propsElement = document.getElementById("react-props");
  let reactProps;
  try {
    reactProps = JSON.parse(propsElement!.innerHTML);
  } catch (err) {
    // Show error to the user and ask to reload page
  }
  const { user, api_url: apiUrl } = reactProps;
  ReactDOM.render(
    <ErrorBoundary>
      <UserPlaylists apiUrl={apiUrl} user={user} />
    </ErrorBoundary>,
    domContainer
  );
});
