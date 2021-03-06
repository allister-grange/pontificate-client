export type TurnStatusOptions = "ready" | "active" | "waiting";

export type Category =
  | "people"
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
};

export type GameData = {
  playersInGame: Player[];
};
