import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const FlagNames = {
  workReady: 'workReady',
  workFinished: 'workFinished',
  cafeVisited: 'cafeVisited',
}

export interface Flags extends Record<string, boolean | undefined> {
  workReady?: boolean,
  workFinished?: boolean,
  cafeVisited?: boolean,
}

export interface GameData {
  day: number,
  flags: Flags,
}

export interface GameStore extends GameData {
  setDay: (day: number) => void,
  setFlag: (key: string, val: boolean) => void
  setGame: (game: GameData) => void
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    day: 0,
    flags: {},
    workReady: false,
    workFinished: false,
    cafeVisited: false,
    setDay: (day) => set({
      day,
      flags: {
        workReady: false, workFinished: false, cafeVisited: false 
      }
    }),
    setFlag: (key, val) => {
      const { flags } = get()
      set({ flags: {
        ...flags,
        [key]: val
      }})
    },
    setGame: (game) => set({...game})
  }))
)

export const flag = (key: string): boolean => !!useGameStore.getState().flags[key]
export const setFlag = (key: string, val: boolean) => useGameStore.getState().setFlag(key, val)