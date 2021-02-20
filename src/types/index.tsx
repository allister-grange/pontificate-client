export type Player = {
  id: string,
  gameId: string,
  userName: string,
  isReady: boolean,
}

export type GameData = {
  playersInGame: Player[]
}