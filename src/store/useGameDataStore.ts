import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface GameData {
  day: number,
  workReady: boolean,
}

export interface GameStore extends GameData {
  setDay: (day: number) => void,
  setWorkReady: (ready: boolean) => void
  setGame: (game: GameData) => void
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set) => ({
    day: 0,
    workReady: false,
    setDay: (day) => set({ day }),
    setWorkReady: (workReady) => set({ workReady }),
    setGame: (game) => set({...game})
  }))
)