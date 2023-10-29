import React, { useRef, useEffect } from "react";
import { dia, shapes } from "jointjs";
import "./App.css";
import DragScroll from "./components/drag-scroll";
import Sidebar from "./components/sidebar";
import AddButton from "./components/buttons/add";

function App() {
  const canvas: any = useRef<HTMLElement>(null);

  useEffect(() => {
    const graph = new dia.Graph();

    const paper = new dia.Paper({
      el: canvas.current,
      width: 6000,
      height: 4000,
      gridSize: 20,
      drawGrid: true,
      model: graph,
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
    var rect3 = new shapes.standard.Rectangle();
    rect3.position(100, 130);
    rect3.resize(100, 40);
    rect3.attr({
      body: {
        fill: "#E74C3C",
        rx: 20,
        ry: 20,
        strokeWidth: 0,
      },
      label: {
        text: "Hello",
        fill: "#ECF0F1",
        fontSize: 11,
        fontVariant: "small-caps",
      },
    });
    rect3.addTo(graph);

    var rect4 = new shapes.standard.Rectangle();
    rect4.position(400, 130);
    rect4.resize(100, 40);
    rect4.attr({
      body: {
        fill: "#8E44AD",
        strokeWidth: 0,
      },
      label: {
        text: "World!",
        fill: "white",
        fontSize: 13,
      },
    });
    rect4.addTo(graph);

    var link = new shapes.standard.Link();
    link.source(rect);
    link.target(rect3);
    link.addTo(graph);
  }, []);

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
