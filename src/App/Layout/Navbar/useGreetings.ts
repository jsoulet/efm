const useGreetings = () => {
  const currentDate = new Date()
  const currentHours = currentDate.getHours()
  if (currentHours >= 5 && currentHours < 12) {
    return 'Good morning'
  }

  if (currentHours >= 12 && currentHours < 17) {
    return 'Good afternoon'
  }

  return 'Good evening'
}

export default useGreetings
