import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router";

import { Room } from "./room/room";
import axios from "axios";
import { Link } from "react-router-dom";
import { LobbySignup } from "../lobby/lobbysignup";

export interface IVideoChatProps {}

export const VideoChat: React.FC<IVideoChatProps> = (
  props: IVideoChatProps
) => {
  const [twilioToken, setTwilioToken] = useState();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState<string>();

  const [lobbyStart, setLobbyStart] = useState<boolean>(false);

  const handleUsernameChange = useCallback((event: any) => {
    setUsername(event.target.value.toUpperCase());
  }, []);

  const handleRoomNameChange = useCallback((event: any) => {
    setRoomName(event.target.value);
  }, []);

  const handleLogout = useCallback(event => {
    setTwilioToken(null);
  }, []);

  const setToken = useCallback(event => {
    setTwilioToken(event);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      axios
        .post("/api/get-room-access-token", {
          username,
          roomName
        })
        .then(response => {
          setToken(response.data);
        })
        .catch(error => {
          console.log("ERROR");
        });
    },
    [username, roomName]
  );

  const getElement = (): JSX.Element | null => {
    if (twilioToken && lobbyStart)
      return (
        <Room
          roomName={"lobbyName"}
          token={twilioToken}
          handleLogout={handleLogout}
        />
      );
    else if (twilioToken)
      return (
        <div id="startLobby">
          <h2>Game ready to join</h2>
          <button onClick={e => setLobbyStart(true)}>Join Lobby</button>
        </div>
      );
    else
      return (
        <LobbySignup
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      );
  };

  return <div id="video-chat">{getElement()}</div>;
};
