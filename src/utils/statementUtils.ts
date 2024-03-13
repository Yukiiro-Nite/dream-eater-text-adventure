import { Reply, Statement, StatementChunk } from "../data/data.types";

export const partitionStatementChunks = (chunks: Record<string, StatementChunk>): { statements: Statement[], replies: Reply[] } => {
  const statements = [] as Statement[]
  const replies = [] as Reply[]

  Object.entries(chunks).forEach(([statementId, statementChunk]) => {
    const { replies: replyChunks, ...chunk } = statementChunk
    statements.push({ ...chunk, id: statementId })

    replyChunks.forEach(reply => {
      replies.push({ ...reply, id: statementChunk.replyId })
    })
  })

  return {
    statements,
    replies
  }
}