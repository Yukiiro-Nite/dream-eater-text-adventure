import classNames from 'classnames'
import { getStatement } from '../../data/gameConfig'
import { useStoryStore } from '../../store/useStoryStore'

export const Title = () => {
  const statementId = useStoryStore(state => state.statementId)
  const statement = getStatement(statementId)
  const title = statement?.title

  if (!title) {
    return null
  }

  const titleClasses = classNames('titleWrapper', title.className)

  return (
    <div className={titleClasses} style={title.style}>
      { title.image && <img className="titleImage" src={title.image} /> }
      <h1>{title.content}</h1>
    </div>
  )
}