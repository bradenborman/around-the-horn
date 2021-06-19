import React, { useState, useEffect } from "react";
import Video from 'twilio-video';
import { Participant } from "../participant/participant";


export interface IRoomProps {
    roomName: string;
    token: string;
    handleLogout: (e: any) => void;
}

export const Room: React.FC<IRoomProps> = (props: IRoomProps) => {

    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    useEffect(() => {
        const participantConnected = (participant: any) => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = (participant: any) => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };
        Video.connect(props.token, {
            name: props.roomName
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom((currentRoom: any) => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication: any) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };

    }, [props.roomName, props.token]);

    return (
        <div className="room">
            <h2>Room: {props.roomName}</h2>
            <button onClick={props.handleLogout}>Log out</button>
            <div className="local-participant">
                {room ? (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                        ''
                    )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    );
};
