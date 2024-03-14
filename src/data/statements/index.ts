import { Reply, Statement } from "../data.types"
import { cityReplies, cityStatements } from "./cityStatements"
import { homeStatements, homeReplies } from "./homeStatements"

const gameStatements = [
  ...homeStatements,
  ...cityStatements,
] as Statement[]

const gameReplies = [
  ...homeReplies,
  ...cityReplies,
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