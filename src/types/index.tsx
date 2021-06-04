export type TurnStatusOptions = "ready" | "active" | "waiting";

export type Category =
  | "person"
  | "object"
  | "nature"
  | "random"
  | "action"
  | "world";

export type Player = {
  id: string;
  gameId: string;
  userName: string;
  isReady: boolean;
  points: number;
  turnStatus: TurnStatusOptions;
  category: Category;
  words: Array<string>;
};

export type GameData = {
  playersInGame: Player[];
};
