import { FlagNames, flag, setFlag } from "../../store/useGameDataStore";
import { partitionStatementChunks } from "../../utils/statementUtils";
import { StatementChunk, Title } from "../data.types";

const cityTitle = {
  content: 'City'
} as Title

const chunks = {
  'exit-home': {
    title: cityTitle,
    content: 'You exit your home. The sky is a dull gray thanks to the overcast. At least it\'s not raining. You start making your way to the office.',
    replyId: 'city',
    replies: [
      {
        content: 'Go to Office',
        nextStatementId: 'enter-office',
        condition: () => !flag(FlagNames.workFinished)
      },
      {
        content: 'Visit Cafe',
        nextStatementId: 'enter-cafe',
        condition: () => flag(FlagNames.cafeVisited),
        action: () => setFlag(FlagNames.cafeVisited, true)
      },
      {
        content: 'Go home',
        nextStatementId: 'return-home',
        condition: () => flag(FlagNames.workFinished)
      }
    ]
  },
} as Record<string, StatementChunk>


const {statements, replies} = partitionStatementChunks(chunks)
export const cityStatements = statements
export const cityReplies = replies