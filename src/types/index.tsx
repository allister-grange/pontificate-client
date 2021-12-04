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
  points: number;
  turnStatus: TurnStatusOptions;
  category: Category;
  words: Array<string>;
  timeLeftInTurn: number;
};

export type GameData = {
  playersInGame: Player[];
};
