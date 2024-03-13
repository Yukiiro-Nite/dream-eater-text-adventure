import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { getStoredStory } from '../utils/storageUtils'
import { gameConfig, getStatement } from '../data/gameConfig'

export interface StoryData {
  id?: string
  statementId?: string
}

export interface StoryStore extends StoryData {
  setStory: (story: StoryData) => void
  loadStory: (id: string) => void
  selectReply: (replyId: string, index: number) => void
  newStory: () => void
}

export const useStoryStore = create<StoryStore>()(
  subscribeWithSelector((set, get) => ({
    id: undefined,
    statementId: undefined,
    setStory: (story) => set({...story}),
    loadStory: (id) => {
      const story = getStoredStory(id)
      if (!story) return
      
      const { setStory } = get()
      setStory(story)
    },
    selectReply: (replyId, index) => {
      const reply = gameConfig.replies[replyId]?.[index]
      if (!reply) {
        console.error('No reply for ', replyId, index)
        return
      }
      
      reply.action?.()
      const statement = getStatement(reply.nextStatementId)
      statement?.action?.()
      set({ statementId: reply.nextStatementId })
    },
    newStory: () => {
      const start = gameConfig.start
      const statement = gameConfig.statements[start]
      if (!statement) {
        console.error(`No statement for ${start}, can not start new story.`)
        return
      }

      const id = crypto.randomUUID()
      set({ id, statementId: statement.id })
    }
  }))
)