import { useRef, useEffect, RefObject } from "react";
import "./App.css";
import DragScroll from "./components/drag-scroll";
import Sidebar from "./components/sidebar";
import AddButton from "./components/buttons/add";
import { useJointsCanvas } from "./store/jointsCanvas";

function App() {
  const canvas: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const state = useJointsCanvas();

  useEffect(() => {
    state.setupCanvas(canvas);
    state.addRoom({
      label: "test1",
      key: "one",
    });
    state.addGamestate({
      posX: 300,
      posY: 180,
      label: "state",
      key: "two",
    });
    state.addTrigger({
      posX: 300,
      posY: 200,
      label: "trigger",
      key: "three",
    });
    state.addItem({
      posX: 400,
      posY: 150,
      label: "item",
      key: "four",
    });
  }, []);

  useEffect(() => {
    const idA = state.keyMap.room["one"];
    const idB = state.keyMap.gamestate["two"];
    console.log("X", {
      idA,
      idB,
    });
    if (idA && idB) {
      state.addLink(idA, idB);
    }
  }, [state.keyMap]);

  return (
    <div className="App">
      <div className="relative">
        <div className="absolute">
          <AddButton />
        </div>
        <DragScroll className="canvas">
          <div ref={canvas} />
        </DragScroll>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
