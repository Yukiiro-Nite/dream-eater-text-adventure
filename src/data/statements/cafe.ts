import { FlagNames, flag, setFlag } from "../../store/useGameDataStore";
import { partitionStatementChunks } from "../../utils/statementUtils";
import { StatementChunk, Title } from "../data.types";

const cafeTitle = {
  content: 'Cafe'
} as Title

const chunks = {
  'enter-cafe': {
    title: cafeTitle,
    content: 'You head to your favorite cafe. A tiny bell on the door jingles as you open the door. The cozy smell of tea and coffee surrounds you.',
    replyId: 'cafe',
    replies: [
      {
        content: 'Leave cafe',
        nextStatementId: 'enter-city-from-cafe'
      },
      {
        content: 'Buy a drink',
        nextStatementId: 'buy-cafe-drink',
        condition: () => !flag(FlagNames.cafeDrinkBought),
        action: () => setFlag(FlagNames.cafeDrinkBought, true)
      },
    ]
  },
  'buy-cafe-drink': {
    title: cafeTitle,
    content: 'You head to the counter. A familiar clerk greets you. You purchase your favorite drink. You take a sip. It\'s delightful, just like always.',
    replyId: 'cafe',
    replies: []
  },
} as Record<string, StatementChunk>


const {statements, replies} = partitionStatementChunks(chunks)
export const cafeStatements = statements
export const cafeReplies = replies