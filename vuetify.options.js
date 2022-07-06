import Dropdown from '~/components/icon/Dropdown.vue'
import Heart from '~/components/icon/Heart.vue'

export default {
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#e3001b'
      }
    }
  },
  icons: {
    values: {
      dropdown: {
        component: Dropdown
      },
      heart: {
        component: Heart
      },
      heartAlt: {
        component: Heart,
        props: {
          outlined: false
        }
      }
    }
  }
}
