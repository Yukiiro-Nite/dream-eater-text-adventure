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
}