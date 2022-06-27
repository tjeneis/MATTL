import Dropdown from "~/components/icons/Dropdown.vue";
import HeartFilled from "~/components/icons/HeartFilled.vue";
import HeartOutline from "~/components/icons/HeartOutline.vue";

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
      heartFilled: {
        component: HeartFilled,
        props: {
          name: 'heartFilled'
        }
      },
      heart: {
        component: HeartOutline,
        props: {
          name: 'heart'
        }
      }
    }
  }
};
