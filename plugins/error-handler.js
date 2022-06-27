import ErrorHandler from '@zaengle/error-handler'


export default defineNuxtPlugin(() => {
  return {
    provide: {
      errorHandler: new ErrorHandler()
    }
  }
})