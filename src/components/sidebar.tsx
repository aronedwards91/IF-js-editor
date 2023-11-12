import React, { useRef, useEffect } from "react";
import { useJointsCanvas } from "../store/jointsCanvas";
import RoomForm from "./form/room";

export default function Sidebar() {
  const sidebar = useJointsCanvas((state) => state.sidebar);

  return (
    <div className="p-4 text-start">
      Sidebar <span>{sidebar?.label}</span>
      <RoomForm />
    </div>
  );
}
