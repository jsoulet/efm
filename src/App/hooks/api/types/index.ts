import { Entry } from 'contentful'

type Media = Entry<{
  file: {
    url: string
    fileName: string
  }
}>

export type Education = {
  name: string
  image: Media
  chapters: Array<Entry<Chapter>>
}

export type Chapter = {
  name: string
  number: number
  audios: Array<Entry<Audio>>
  education: Entry<Education>
}

export type Audio = {
  french: string
  english: string
  media: Media
}

export type Home = {
  trainings: Array<Entry<Education>>
}
