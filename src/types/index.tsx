export type Player = {
  id: string,
  gameId: string,
  userName: string,
  isReady: boolean,
  points: number,
  turnStatus: "ready"|"active"|"waiting"
}

export type GameData = {
  playersInGame: Player[]
}