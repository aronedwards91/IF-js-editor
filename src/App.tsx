import React, { useRef, useEffect } from "react";
import { dia, shapes } from "jointjs";
import "./App.css";

function App() {
  const canvas: any = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log("!!", canvas.current);

    const graph = new dia.Graph();

    const paper = new dia.Paper({
      el: canvas.current,
      width: 600,
      height: 400,
      gridSize: 2,
      model: graph,
      background: {
        color: "#F8F9FA",
      },
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes,
    });

    const rect = new shapes.standard.Rectangle({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 50 },
      attrs: {
        label: {
          text: "Hello World",
        },
      },
    });
    rect.addTo(graph);
    console.log("!paper", paper);
    

    return () => {
      console.log("!on return");
      // scroller.remove();
      // paper.remove();
      // paper.unmount();
    };
  }, []);

  return (
    <div className="App">
      <div  className="canvas">
        <div ref={canvas} />
      </div>
    </div>
  );
}

export default App;
