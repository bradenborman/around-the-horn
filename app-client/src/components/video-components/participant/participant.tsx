import React, { useState, useEffect, useRef } from "react";
import Video from "twilio-video";

export interface IParticipantProps {
  participant: Video.LocalParticipant | Video.RemoteParticipant;
}

export const Participant: React.FC<IParticipantProps> = (
  props: IParticipantProps
) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter(track => track !== null);

  useEffect(() => {
    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(props.participant.videoTracks));
    setAudioTracks(trackpubsToTracks(props.participant.audioTracks));

    props.participant.on("trackSubscribed", trackSubscribed);
    props.participant.on("trackUnsubscribed", trackUnsubscribed);

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

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);
  return (
    <div className="participant">
      <h3>{props.participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </div>
  );
};
