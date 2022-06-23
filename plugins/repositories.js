import createRepository from '~/repositories/RepositoryFactory'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      repositories: createRepository(nuxtApp.$axios)
    }
  }
})