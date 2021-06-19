import React, { useState, useEffect, useRef } from 'react';


export interface IParticipantProps {
    participant: any;
}

export const Participant: React.FC<IParticipantProps> = (props: IParticipantProps) => {

    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap: any) => Array.from(trackMap.values())
        .map((publication: any) => publication.track)
        .filter(track => track !== null);

    useEffect(() => {
        const trackSubscribed = (track: any) => {
            // implementation
        };

        const trackUnsubscribed = (track: any) => {
            // implementation
        };

        setVideoTracks(trackpubsToTracks(props.participant.videoTracks));
        setAudioTracks(trackpubsToTracks(props.participant.audioTracks));

        props.participant.on('trackSubscribed', trackSubscribed);
        props.participant.on('trackUnsubscribed', trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            props.participant.removeAllListeners();
        };
    }, [props.participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
          videoTrack.attach(videoRef.current);
          return () => {
            videoTrack.detach();
          };
        }
      }, [videoTracks]);

    return (
        <div className="participant">
            <h3>{props.participant.identity}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    );

};