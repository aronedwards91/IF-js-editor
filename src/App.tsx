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
    state.addRectangle({
      label: "test1",
      key: "one",
    });
    state.addRectangle({
      posX: 300,
      posY: 150,
      label: "test2",
      key: "two",
    });

  }, []);

  useEffect(() => {
    const idA = state.keyMap.room["one"];
    const idB = state.keyMap.room["two"];
    if(idA && idB) {
      state.addLink(idA, idB);
    }

  } , [state.keyMap])

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
