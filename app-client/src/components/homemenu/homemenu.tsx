import React, { useState, useCallback } from "react";
import { LobbySignup } from "../lobby/lobbysignup";
import axios from "axios";
import { Link } from "react-router-dom";

export interface IHomeMenuProps {}

export const HomeMenu: React.FC<IHomeMenuProps> = (props: IHomeMenuProps) => {
  const [twilioToken, setTwilioToken] = useState();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState<string>("Test-lobby235");

  const handleUsernameChange = useCallback((event: any) => {
    setUsername(event.target.value);
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

  const getLobbyLink = (): JSX.Element | null => {
    if (twilioToken)
      return <Link to={"/lobby/" + twilioToken}>Start Session</Link>;
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

  return <div> {getLobbyLink()} </div>;
};
