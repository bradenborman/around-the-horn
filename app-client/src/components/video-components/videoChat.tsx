import React, { useState, useEffect, useCallback } from "react";
import { Lobby } from "../lobby/lobby";
import { Room } from "../room/room";

export interface IVideoChatProps { }

export const VideoChat: React.FC<IVideoChatProps> = (props: IVideoChatProps) => {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState<string>('');
    const [token, setToken] = useState<string>();

    const handleUsernameChange = useCallback((event: any) => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback((event: any) => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        // const data = await fetch('/video/token', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         identity: username,
        //         room: roomName
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json());
        setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM0NzljODEzYzk5ZGNhY2E1YzRlZjVkYzY5Yjc5MTEzLTE2MjQwNTg0NjQiLCJpc3MiOiJTSzM0NzljODEzYzk5ZGNhY2E1YzRlZjVkYzY5Yjc5MTEzIiwic3ViIjoiQUM2YWYxMDU1YjcxN2E5N2Y4ZGVlNjhjZTMyYjAxYjZmYiIsImV4cCI6MTYyNDA2MjA2NCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQnJhZGVuIiwidmlkZW8iOnsicm9vbSI6InRlc3Qtcm9vbS0xIn19fQ.NjuujEKbzbAM0fDDvfUZuPBElJgbrBdoBoAVe_q9_-Y");
    }, [username, roomName]);

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
