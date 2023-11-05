import React, { useRef, useEffect } from "react";
import { useJointsCanvas } from "../store/jointsCanvas";

export default function Sidebar() {
    const sidebar = useJointsCanvas((state) => state.sidebar)
    return (
        <div>Sidebar <span>{sidebar?.label}</span></div>
    )
}