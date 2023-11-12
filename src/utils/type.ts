export type ObjectTypeKeys = "room" | "item" | "gamestate" | "trigger";

export enum Directions {
  UP = "up",
  DOWN = "down",
  N = "n",
  S = "s",
  E = "e",
  W = "w",
  NE = "ne",
  NW = "nw",
  SE = "se",
  SW = "sw",
}

type RoomID = string;

export enum BaseInteractions {
  Examine = "examine",
  Take = "take",
  Place = "place",
  Items = "items",
  Use = "use",
  Go = "go",
  Eat = "eat",
  Open = "open",
  Close = "close",
  Help = "help",
  Attack = "attack",
  Equip = "equip",
  Smell = "smell",
  Combine = "combine",
}

export type DirectionsOptions = Record<Directions | string, RoomID | StateCheck>;

// type RoomID = string;
// type TriggerID = string;
type TriggerString = string;
type StateID = string;
type ItemID = string;
type ReturnString = string;
type State = string | number | boolean;
// type StateGroup = Record<string, State>;
type StateCheckDescription = string;
type InteractionVaried = BaseInteractions | string;

export interface Trigger {
  stateID: StateID;
  newValue: State;
  returnString: ReturnString;
}

export interface StateCheck {
  onPass: ReturnString | TriggerString;
  onFail: ReturnString | TriggerString;
  req: Record<StateID, State>;
}

type Interaction = ReturnString | TriggerString | StateCheck;

export interface Room {
  name: string;
  description: StateCheckDescription;
  exits: DirectionsOptions;
  img?: string;
  interactions: Record<InteractionVaried, Interaction>;
  itemsList?: Array<ItemID>;
  placedItems?: Array<ItemID>;
  altNames?: Record<string, ItemID>;
  examinable?: Record<string, ReturnString>;
}

export interface Item {
  description: StateCheckDescription;
  isTakeable: boolean;
  icon?: string;
  interactions: Record<InteractionVaried, Interaction>;
  itemID?: ItemID;
  altNames?: Array<string>;
}
