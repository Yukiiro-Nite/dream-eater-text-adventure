import { GameConfig, Reply, Statement } from "./data.types";
import { statements, replies } from "./statements";

export const gameConfig = {
  start: 'start',
  statements,
  replies
} as GameConfig

export const getStatement = (statementId?: string): Statement | undefined => {
  if (!statementId) return

  const statement = gameConfig.statements[statementId]
  if (!statement) {
    console.error('No statement found for: ', statementId)
    return
  }

  return statement
}

export const getReplies = (statementId?: string): Reply[] | undefined => {
  const statement = getStatement(statementId)
  if (!statement) return

  const replies = gameConfig.replies[statement.replyId]
  if (!replies) {
    console.error('No replies found for: ', statementId)
    return
  }

  return replies
}