import { StoryData } from "../store/useStoryStore"

const storyKey = `Story`
export const getStoredStory = (id: string): StoryData | undefined => {
  const key = `${storyKey}_${id}`
  const rawData = localStorage.getItem(key)

  if (!rawData) {
    console.warn('No story found for ', key)
    return
  }

  try {
    const data = JSON.parse(rawData)
    if (!data) {
      console.warn('No story found for ', key)
      return
    }

    return data as StoryData
  } catch (error) {
    console.warn('Problem parsing story data for ', key)
    return
  }
}
export const setStoredStory = (story?: StoryData) => {
  if (!story || !story.id) return

  const key = `${storyKey}_${story.id}`

  localStorage.setItem(key, JSON.stringify(story))
  addStoredSave(story.id)
}

const savesKey = `Saves`
export const getStoredSaves = (): string[] => {
  const rawData = localStorage.getItem(savesKey)

  if (!rawData) {
    return []
  }

  try {
    const data = JSON.parse(rawData)
    if (!data || !data.length) {
      return []
    }

    return data as string[]
  } catch (error) {
    return []
  }
}
export const addStoredSave = (id: string) => {
  const currentSaves = getStoredSaves()
  currentSaves.push(id)
  const cleanSaves = Object.keys(Object.fromEntries(currentSaves.map(id => [id, id])))

  localStorage.setItem(savesKey, JSON.stringify(cleanSaves))
}
export const cleanStoredSaves = () => {
  const currentSaves = getStoredSaves()
  const cleanSaves = Object.keys(Object.fromEntries(currentSaves.map(id => [id, id])))
    .map(id => [id, getStoredStory(id)])
    .filter(([id, save]) => id && save)
    .map(([id]) => id)

  localStorage.setItem(savesKey, JSON.stringify(cleanSaves))
}