export type Education = {
  name: string
  image: {
    fields: {
      file: { url: string }
    }
  }
}

export type Chapter = {
  name: string
  number: number
  audios: Array<Record<string, unknown>>
  education: {
    sys: {
      id: string
    }
    fields: Education
  }
}
