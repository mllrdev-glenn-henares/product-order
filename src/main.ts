import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue';
import App from './App.vue'
import moment from 'moment';
import loadModules from './register-modules';
import router from './router';
import '@/plugins/themes';
import '@/plugins/ionic';



const app = createApp(App).use(IonicVue);

loadModules({ app, router });
app.use(router);
 
router.isReady().then(() => {
  app.config.globalProperties.$filters = {
    timeFormater(date: Date | string) {
      return date = moment.utc(date).format('MM/DD/YYYY');
    }
  }
  app.mount('#app');
});

