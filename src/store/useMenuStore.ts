import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface Menu {
  
}

export interface MenuStore {
  showMenu: boolean
  setShowMenu: (showMenu: boolean) => void
}

export const useMenuStore = create<MenuStore>()(
  subscribeWithSelector((set) => ({
    showMenu: false,
    setShowMenu: (showMenu) => set({ showMenu })
  }))
)