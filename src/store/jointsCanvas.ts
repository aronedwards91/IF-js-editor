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
type NewElementProps = {
  label: string;
  key: string;
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
};
type JointsStore = {
  graph: dia.Graph<dia.Graph.Attributes, dia.ModelSetOptions>;
  paper: dia.Paper | null;
  isReady: boolean;
  keyMap: Record<ObjectTypeKeys, Record<string, string>>;
  setupCanvas: (element: RefObject<HTMLDivElement>) => void;
  addRoom: (args: newObject) => void;
  addTrigger: (args: NewElementProps) => void;
  addGamestate: (args: NewElementProps) => void;
  addItem: (args: NewElementProps) => void;
  addLink: (idA: string, idB: string) => void;
};

export const useJointsCanvas = create<JointsStore>((set) => ({
  graph: new dia.Graph(),
  paper: null,
  isReady: false,
  keyMap: {
    room: {},
    item: {},
    gamestate: {},
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
  addRoom: ({
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
  addTrigger: ({
    posX = 100,
    posY = 100,
    width = 100,
    height = 50,
    label = "Unnamed Trigger",
    key,
  }) =>
    set((state) => {
      const poly = new shapes.erd.Relationship({
        position: { x: posX, y: posY },
        size: { width, height },
        attrs: {
          label: {
            text: label,
            fontSize: 13,
          },
        },
      });

      poly.addTo(state.graph);

      const trigger = { ...state.keyMap.trigger, [key]: poly.id as string };

      return { graph: state.graph, keyMap: { ...state.keyMap, trigger } };
    }),
  addGamestate: ({
    posX = 100,
    posY = 100,
    width = 100,
    height = 50,
    label = "Unnamed State",
    key,
  }) =>
    set((state) => {
      const cylinder = new shapes.erd.Entity({
        position: { x: posX, y: posY },
        size: { width, height },
        attrs: {
          label: {
            text: label,
            fontSize: 13,
            fill: "white",
          },
        },
      });

      cylinder.addTo(state.graph);

      const gamestate = {
        ...state.keyMap.gamestate,
        [key]: cylinder.id as string,
      };

      return { graph: state.graph, keyMap: { ...state.keyMap, gamestate } };
    }),
  addItem: ({
    posX = 100,
    posY = 100,
    width = 100,
    height = 50,
    label = "Unnamed Item",
    key,
  }) =>
    set((state) => {
      const ellipse = new shapes.standard.Ellipse({
        position: { x: posX, y: posY },
        size: { width, height },
        attrs: {
          body: {
            fill: "purple",
            strokeWidth: 1,
          },
          label: {
            text: label,
            fontSize: 13,
            fill: "white",
          },
        },
      });

      ellipse.addTo(state.graph);

      const item = { ...state.keyMap.item, [key]: ellipse.id as string };

      return { graph: state.graph, keyMap: { ...state.keyMap, item } };
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
