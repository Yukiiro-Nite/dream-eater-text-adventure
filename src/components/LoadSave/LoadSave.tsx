import { useCallback } from "react"
import { getStatement } from "../../data/gameConfig"
import { useMenuStore } from "../../store/useMenuStore"
import { getStoredStory } from "../../utils/storageUtils"
import "./LoadSave.scss"

interface LoadSaveProps {
  id: string
}

export const LoadSave = ({id}: LoadSaveProps) => {
  const loadGame = useMenuStore((state) => state.loadGame)
  const setShowMenu = useMenuStore((state) => state.setShowMenu)
  const story = getStoredStory(id)
  const statement = getStatement(story?.statementId)

  const handleLoadGame = useCallback(() => {
    loadGame(id)
    setShowMenu(false)
  }, [id, loadGame, setShowMenu])

  if (!statement) return

  return (
    <button className="LoadSave" onClick={handleLoadGame}>
      <span>{id}</span>
      <p>{statement.content.slice(0, 50)}...</p>
    </button>
  )
}