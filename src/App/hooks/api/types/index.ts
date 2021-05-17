type ContentfulElement<T> = {
  sys: {
    id: string
  }
  fields: T
}

type Media = ContentfulElement<{
  file: {
    url: string
    fileName: string
  }
}>

export type Education = {
  name: string
  image: Media
}

export type Chapter = {
  name: string
  number: number
  audios: Array<ContentfulElement<Audio>>
  education: ContentfulElement<Education>
}

export type Audio = {
  french: string
  english: string
  media: Media
}
