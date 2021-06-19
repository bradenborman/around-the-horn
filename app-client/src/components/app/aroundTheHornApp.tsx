import React, { useState, useEffect, useCallback } from "react";
import { VideoChat } from "../video-components/videoChat";
import {
  BrowserRouter as ReactRouter,
  Route as ReactRoute
} from "react-router-dom";
import { Navbar } from "../navbar/navbar";
import { HomeMenu } from "../homemenu/homemenu";

require("./aroundTheHorn.scss");

export interface IAroundTheHornAppProps {}

export const AroundTheHornApp: React.FC<IAroundTheHornAppProps> = (
  props: IAroundTheHornAppProps
) => {
  return (
    <ReactRouter>
      <div className="app">
        <Navbar />
        <main>
          <ReactRoute exact path={"/"}>
            <HomeMenu />
          </ReactRoute>
          <ReactRoute path={"/lobby"}>
            <VideoChat />
          </ReactRoute>
          <ReactRoute path={"/create-game"}>
            <h2>Under Contruction</h2>
          </ReactRoute>
        </main>
      </div>
    </ReactRouter>
  );
};
