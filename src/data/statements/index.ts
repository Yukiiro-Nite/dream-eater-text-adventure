import { Reply, Statement } from "../data.types"
import { homeStatements, homeReplies } from "./homeStatements"

const gameStatements = [
  ...homeStatements
] as Statement[]

const gameReplies = [
  ...homeReplies
]

const statements = gameStatements.reduce((statementsById, statement) => {
  const existingStatement = statementsById[statement.id]
  if (existingStatement) {
    console.warn('Found overlapping statements for ', statement.id, existingStatement, statement)
  }
  statementsById[statement.id] = statement
  return statementsById
}, {} as Record<string, Statement>)

const replies = gameReplies.reduce((repliesById, reply) => {
  let existingReplies = repliesById[reply.id]
  if (!existingReplies) {
    existingReplies = repliesById[reply.id] = []
  }

  existingReplies.push(reply)

  return repliesById
}, {} as Record<string, Reply[]>)

export { statements, replies }