import React, { useState, useEffect, useCallback } from "react";
import { Lobby } from "../lobby/lobby";
import { Room } from "../room/room";
import axios from "axios";

export interface IVideoChatProps {}

export const VideoChat: React.FC<IVideoChatProps> = (
  props: IVideoChatProps
) => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState<string>("");
  const [token, setToken] = useState<string>();

  const handleUsernameChange = useCallback((event: any) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event: any) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      axios
        .post("/api/get-room-access-token", { username })
        .then(response => {
          setToken(response.data);
        })
        .catch(error => {
          console.log("ERROR");
        });
    },
    [username, roomName]
  );

  const handleLogout = useCallback((event: any) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};
