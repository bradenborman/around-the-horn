import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import { Participant } from "../participant/participant";

export interface IRoomProps {
  roomName: string;
  token: string;
  handleLogout: (e: any) => void;
}

export const Room: React.FC<IRoomProps> = (props: IRoomProps) => {
  const [room, setRoom] = useState<Video.Room>(null);
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );

  const remoteParticipants = participants.map(
    (participant: Video.RemoteParticipant) => (
      <Participant key={participant.sid} participant={participant} />
    )
  );

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
      console.log(room);
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom: any) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function(
            trackPublication: any
          ) {
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

  const getLocalUser = (): JSX.Element | null => {
    if (room != null)
      return (
        <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
      );
    else return null;
  };

  return (
    <div className="room">
      <button onClick={props.handleLogout}>Logout</button>
      <div className="participant-wrapper">
        {getLocalUser()}
        {remoteParticipants}
      </div>
    </div>
  );
};
