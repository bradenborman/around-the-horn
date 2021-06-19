import React, { useState, useEffect } from "react";
import { VideoChat } from "../video-components/videoChat";

require("./aroundTheHorn.scss");

export interface IAroundTheHornAppProps { }

export const AroundTheHornApp: React.FC<IAroundTheHornAppProps> = (props: IAroundTheHornAppProps) => {

    return (
        <div className="app">
            <header>
                <h1>Around The Horn</h1>
            </header>
            <main>
                <VideoChat />
            </main>
            <footer>
                <p>
                    Made by Braden Borman
                </p>
            </footer>
        </div>
    );
};
