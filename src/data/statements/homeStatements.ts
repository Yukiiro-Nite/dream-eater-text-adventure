import { FlagNames, flag, setFlag, useGameStore } from "../../store/useGameDataStore";
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
        content: 'Look at Bookcase',
        nextStatementId: 'home-bookcase'
      },
      {
        content: 'Get ready for work',
        nextStatementId: 'prepare-for-work',
        condition: () => !flag(FlagNames.workReady)
      },
      {
        content: 'Go to work',
        nextStatementId: 'exit-home',
        condition: () => flag(FlagNames.workReady) && !flag(FlagNames.workFinished)
      },
      {
        content: 'Go to bed',
        nextStatementId: 'sleep',
        condition: () => flag(FlagNames.workFinished),
        action: () => {
          const { day, setDay } = useGameStore.getState()
          setDay(day + 1)
        }
      }
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
    action: () => setFlag(FlagNames.workReady, true),
    replies: [
      {
        content: 'Look around the house',
        nextStatementId: 'look-around-house'
      },
      {
        content: 'Go to work',
        nextStatementId: 'exit-home',
        condition: () => flag(FlagNames.workReady)
      }
    ]
  },
  'return-home': {
    title: homeTitle,
    content: 'You return home after a long day of work. Even though you spent most of the day laying down, fighting nightmares is exhausting. Hopefully they won\'t haunt your sleep. You look around your dark room before going to bed.',
    replyId: 'home-items',
    replies: []
  },
  'sleep': {
    title: homeTitle,
    content: 'You collapse in your bed and quickly fall asleep.',
    replyId: 'sleep-options',
    replies: [
      {
        content: 'Continue',
        nextStatementId: 'start'
      }
    ]
  }
} as Record<string, StatementChunk>


const {statements, replies} = partitionStatementChunks(chunks)
export const homeStatements = statements
export const homeReplies = replies