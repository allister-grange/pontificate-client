export type Player = {
  id: string,
  gameId: string,
  userName: string,
  isReady: boolean,
  points: number,
  turnActive: boolean
}

export type GameData = {
  playersInGame: Player[]
}