import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface ILobbyProps {
  username: string;
  roomName: string;
  handleUsernameChange: (e: any) => void;
  handleRoomNameChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

export const LobbySignup: React.FC<ILobbyProps> = (props: ILobbyProps) => {
  const [roomsToSelcectFrom, setRoomsToSelcectFrom] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/rooms").then(response => {
      setRoomsToSelcectFrom(response.data);
    });
  }, []);

  const rooms =
    roomsToSelcectFrom == null
      ? null
      : roomsToSelcectFrom.map(room => {
          return <option value={room}>{room}</option>;
        });

  return (
    <div id="lobbySignup">
      <form className="lobby" onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="field"
            value={props.username}
            onChange={props.handleUsernameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="room">Room name:</label>
          <select required onChange={props.handleRoomNameChange}>
            <option selected disabled>
              Please select a room
            </option>
            {rooms}
          </select>
        </div>
        <button disabled={!(props.roomName && props.username)} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
