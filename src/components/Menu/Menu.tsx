import { useCallback, useEffect } from "react"
import { useMenuStore } from "../../store/useMenuStore"
import { useStoryStore } from "../../store/useStoryStore"
import classNames from "classnames"
import './Menu.scss'
import { LoadSave } from "../LoadSave/LoadSave"

export const Menu = () => {
  const statementId = useStoryStore(state => state.statementId)
  const newStory = useStoryStore(state => state.newStory)
  const {
    showMenu,
    saves,
    showLoadGames,
    setShowMenu,
    setShowLoadGame
  } = useMenuStore()
  const visible = !statementId || showMenu

  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu])
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu])

  const createNewStory = useCallback(() => {
    newStory()
    setShowMenu(false)
  }, [newStory, setShowMenu])

  const openLoadMenu = useCallback(() => setShowLoadGame(true), [setShowLoadGame])
  const closeLoadMenu = useCallback(() => setShowLoadGame(false), [setShowLoadGame])
  
  useEffect(() => {
    const toggleMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setShowMenu(!showMenu)
    }

    document.addEventListener('keydown', toggleMenu)

    return () => {
      document.removeEventListener('keydown', toggleMenu)
    }
  }, [setShowMenu, showMenu])

  const menuWrapperClasses = classNames('MenuWrapper', { visible })
  const menuClasses = classNames('Menu', { visible: !showLoadGames })
  const loadGamesClasses = classNames('LoadGames', { visible: showLoadGames })

  return (
    <>
      <button className="OpenMenuButton" onClick={openMenu}>⚙️</button>
      <div className={menuWrapperClasses}>
        <div className={menuClasses}>
          {statementId && <button onClick={closeMenu}>Continue</button>}
          <button onClick={createNewStory}>New Game</button>
          {(saves.length > 0) && <button onClick={openLoadMenu}>Load Story</button> }
        </div>
        <div className={loadGamesClasses}>
          <button className="BackButton" onClick={closeLoadMenu}>Back to Menu</button>
          {
            saves.map(save => <LoadSave key={save} id={save}/>)
          }
        </div>
      </div>
    </>
  )
}