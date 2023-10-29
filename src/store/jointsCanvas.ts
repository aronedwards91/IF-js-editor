import { create } from "zustand";
import { dia, shapes } from "jointjs";
import { RefObject } from "react";
import { ObjectTypeKeys } from "../utils/type";
// import { persist, createJSONStorage } from 'zustand/middleware'

type newObject = {
  label: string;
  key: string;
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
  fontSize?: number;
  textColor?: string;
};
type JointsStore = {
  graph: dia.Graph<dia.Graph.Attributes, dia.ModelSetOptions>;
  paper: dia.Paper | null;
  isReady: boolean;
  keyMap: Record<ObjectTypeKeys, Record<string, string>>;
  setupCanvas: (element: RefObject<HTMLDivElement>) => void;
  addRectangle: (args: newObject) => void;
  addLink: (idA: string, idB: string) => void;
  //   addLink: () => void;
};

// func:() => set((state) => {
//     return {}
// })

export const useJointsCanvas = create<JointsStore>((set) => ({
  graph: new dia.Graph(),
  paper: null,
  isReady: false,
  keyMap: {
    room: {},
    item: {},
    state: {},
    trigger: {},
  },
  setupCanvas: (element: RefObject<HTMLDivElement>) =>
    set((state) => {
      const paper = new dia.Paper({
        el: element.current,
        width: 6000,
        height: 4000,
        gridSize: 20,
        drawGrid: true,
        model: state.graph,
        sorting: dia.Paper.sorting.APPROX,
        cellViewNamespace: shapes,
      });

      return { isReady: true, paper };
    }),
  addRectangle: ({
    posX = 100,
    posY = 100,
    width = 100,
    height = 50,
    fill = "#ffffff",
    strokeWidth = 1,
    label = "Unnamed",
    fontSize = 13,
    textColor = "black",
    key,
  }) =>
    set((state) => {
      const rect = new shapes.standard.Rectangle({
        position: { x: posX, y: posY },
        size: { width, height },
        attrs: {
          body: {
            fill,
            strokeWidth,
          },
          label: {
            text: label,
            fontSize,
            fill: textColor,
          },
        },
      });

      rect.addTo(state.graph);

      const room = { ...state.keyMap.room, [key]: rect.id as string };

      return { graph: state.graph, keyMap: { ...state.keyMap, room } };
    }),
  addLink: (idA: string, idB: string) =>
    set((state) => {
      var link = new shapes.standard.Link();
      link.source(state.paper?.getModelById(idA) as any);
      link.target(state.paper?.getModelById(idB) as any);
      link.addTo(state.graph);

      return state;
    }),
}));
