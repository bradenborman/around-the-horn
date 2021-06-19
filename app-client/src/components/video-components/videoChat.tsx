import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router";

import { Room } from "./room/room";

export interface IVideoChatProps {}

export const VideoChat: React.FC<IVideoChatProps> = (
  props: IVideoChatProps
) => {
  let { token } = useParams();
  return <Room roomName={"lobbyName"} token={token} />;
};
