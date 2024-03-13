import { getStatement } from '../../data/gameConfig'
import { useStoryStore } from '../../store/useStoryStore'

export const Background = () => {
  const statementId = useStoryStore(state => state.statementId)
  const statement = getStatement(statementId)
  const backgroundImage = statement?.title?.backgroundImage

  if (!backgroundImage) {
    return null
  }

  return (
    <img src={backgroundImage} />
  )
}