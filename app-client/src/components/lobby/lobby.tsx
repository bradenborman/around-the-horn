import React, { useState, useEffect, useCallback } from "react";

export interface ILobbyProps {
    username: string
    roomName: string
    handleUsernameChange: (e: any) => void
    handleRoomNameChange: (e: any) => void
    handleSubmit: (e: any) => void
}



export const Lobby: React.FC<ILobbyProps> = (props: ILobbyProps) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Enter a room</h2>
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
                <input
                    type="text"
                    id="room"
                    value={props.roomName}
                    onChange={props.handleRoomNameChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
};
