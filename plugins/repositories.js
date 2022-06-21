import createRepository from '~/repositories/RepositoryFactory'

export default defineNuxtPlugin(nuxtApp => {
  return {
    repositories: createRepository(nuxtApp.$axios)
  }
})