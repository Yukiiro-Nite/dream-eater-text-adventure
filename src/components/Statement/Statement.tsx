import classNames from 'classnames'
import { getStatement } from '../../data/gameConfig'
import { useStoryStore } from '../../store/useStoryStore'

export const Statement = () => {
  const statementId = useStoryStore(state => state.statementId)
  const statement = getStatement(statementId)

  if (!statement) {
    return null
  }

  const statementClasses = classNames('Statement', statement.className)

  return (
    <p className={statementClasses} style={statement.style}>
      {statement.content}
    </p>
  )
}