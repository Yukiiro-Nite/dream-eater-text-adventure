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
        nextStatementId: 'prepare-for-work'
      },
    ]
  }
} as Record<string, StatementChunk>


const {statements, replies} = partitionStatementChunks(chunks)
export const homeStatements = statements
export const homeReplies = replies