import { useGameStore } from "../../store/useGameDataStore";
import { partitionStatementChunks } from "../../utils/statementUtils";
import { StatementChunk, Title } from "../data.types";

const homeTitle = {
  content: 'Home'
} as Title

const chunks = {
  'start': {
    title: homeTitle,
    content: `You wake up in your dimly lit room. Light from the overcast sky seeps in through the blackout curtains. You have work today.`,
    replyId: 'home-morning',
    replies: [
      {
        content: 'Get ready for work',
        nextStatementId: 'prepare-for-work'
      },
      {
        content: 'Look around the house',
        nextStatementId: 'look-around-house'
      },
    ]
  },
  'look-around-house': {
    title: homeTitle,
    content: `You look around your room.`,
    replyId: 'home-items',
    replies: [
      {
        content: 'Bookcase',
        nextStatementId: 'home-bookcase'
      },
      {
        content: 'Get ready for work',
        nextStatementId: 'prepare-for-work',
        condition: () => {
          const { workReady } = useGameStore.getState()
          return !workReady
        }
      },
      {
        content: 'Go to work',
        nextStatementId: 'exit-home',
        condition: () => {
          const { workReady } = useGameStore.getState()
          return workReady
        }
      },
    ]
  },
  'home-bookcase': {
    title: homeTitle,
    content: 'You see several familiar books. Which one would you like to read?',
    replyId: 'home-bookcase-options',
    replies: [
      {
        content: 'DreamCorp employee manual',
        nextStatementId: 'employee-manual'
      },
      {
        content: 'Go back to looking around',
        nextStatementId: 'look-around-house'
      }
    ]
  },
  'employee-manual': {
    title: homeTitle,
    content: 'You once again familiarize yourself with the DreamCorp employee manual. It\'s dry corporate language nearly puts you to sleep. You return the book to the shelf. Would you like to read something else?',
    replyId: 'home-bookcase-options',
    replies: []
  },
  'prepare-for-work': {
    title: homeTitle,
    content: 'You go through the motions of your daily morning routine. You prepare yourself for work.',
    replyId: 'ready-for-work',
    action: () => {
      const { setWorkReady } = useGameStore.getState()
      setWorkReady(true)
    },
    replies: [
      {
        content: 'Look around the house',
        nextStatementId: 'look-around-house'
      },
      {
        content: 'Go to work',
        nextStatementId: 'exit-home',
        condition: () => {
          const { workReady } = useGameStore.getState()
          return workReady
        }
      }
    ]
  }
} as Record<string, StatementChunk>


const {statements, replies} = partitionStatementChunks(chunks)
export const homeStatements = statements
export const homeReplies = replies