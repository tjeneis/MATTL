import Dropdown from "~/components/icons/Dropdown.vue";
import Heart from "~/components/icons/Heart.vue";

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
        component: Dropdown
      },
      heart: {
        component: Heart,
      },
      heartAlt: {
        component: Heart,
        props: {
          outlined: false,
        }
      }
    }
  }
};
