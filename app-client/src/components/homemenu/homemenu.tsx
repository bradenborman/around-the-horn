import React, { useState, useCallback } from "react";
import { LobbySignup } from "../lobby/lobbysignup";
import axios from "axios";
import { Link } from "react-router-dom";

export interface IHomeMenuProps {}

export const HomeMenu: React.FC<IHomeMenuProps> = (props: IHomeMenuProps) => {
  return (
    <div id="HomeMenu">
      <img src="/img/loadingscreen.png" />
      <div className="options-wrapper">
        <div className="option">
          <Link to="/lobby">Join Lobby</Link>
        </div>
        <div className="option">
          <Link to="/create-game">Create Game</Link>
        </div>
      </div>
    </div>
  );
};
