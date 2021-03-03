export type Player = {
  id: string,
  gameId: string,
  userName: string,
  isReady: boolean,
  points: number,
  turnStatus: TurnStatusOptions
}

export type TurnStatusOptions = "ready"|"active"|"waiting"

export type GameData = {
  playersInGame: Player[]
}