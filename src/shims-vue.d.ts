declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'vue/types/vue' {
  import VueRouter, { Route } from "vue-router"
  interface Vue {
    $router: VueRouter
  }
}