import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface GameData {
  id?: string
}

export interface GameStore extends GameData {
  setGame: (game: GameData) => void
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set) => ({
    id: undefined,
    setGame: (game) => set({...game})
  }))
)