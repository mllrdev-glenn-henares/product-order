import { createRouter,createWebHistory } from '@ionic/vue-router';


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: []
  });
  
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register','/landing']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = sessionStorage.getItem('TOKEN')

    if (authRequired && !loggedIn) {
        return next('/landing')
    }
    next()
});


export default router;
