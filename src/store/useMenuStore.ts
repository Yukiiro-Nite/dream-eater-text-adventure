import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { getStoredSaves, getStoredStory } from '../utils/storageUtils'
import { useStoryStore } from './useStoryStore'

export interface Menu {
  
}

export interface MenuStore {
  showMenu: boolean
  saves: string[]
  showLoadGames: boolean
  setShowMenu: (showMenu: boolean) => void
  setShowLoadGame: (showLoadGames: boolean) => void
  addSave: (id: string) => void
  loadGame: (id: string) => void
}

export const useMenuStore = create<MenuStore>()(
  subscribeWithSelector((set, get) => ({
    showMenu: false,
    saves: getStoredSaves(),
    showLoadGames: false,
    setShowMenu: (showMenu) => set({ showMenu, showLoadGames: false }),
    setShowLoadGame: (showLoadGames) => set({ showLoadGames }),
    addSave: (id) => {
      const {saves} = get()
      const newSaves = [...saves, id]
      set({ saves: newSaves})
    },
    loadGame: (id) => {
      const save = getStoredStory(id)
      if (!save) {
        return
      }

      const {setStory} = useStoryStore.getState()
      setStory(save)
    }
  }))
)