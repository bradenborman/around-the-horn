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
          <ReactRoute exact path={"/lobby/:token"}>
            <VideoChat />
          </ReactRoute>
        </main>
      </div>
    </ReactRouter>
  );
};
