import Dropdown from "~/components/icons/Dropdown.vue";
import Heart from "~/components/icons/Heart.vue";
import Snow from "~/components/icons/Snow.vue";

export default {
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#f0251f',
      }
    }
  },
  icons: {
    values: {
      dropdown: {
        component: Dropdown,
        props: {
          name: 'dropdown'
        }
      },
      heart: {
        component: Heart,
        props: {
          name: 'heart'
        }
      },
      snow: {
        component: Snow,
        props: {
          name: 'snow'
        }
      }
    }
  }
};
