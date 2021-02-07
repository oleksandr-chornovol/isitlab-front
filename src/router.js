import Router from 'vue-router'

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './components/Home.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import(/* webpackChunkName: "signup" */ './components/Auth/Signup.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './components/Auth/Login.vue'),
        },
        {
            path: '/my-posts',
            name: 'my-posts',
            component: () => import(/* webpackChunkName: "my-posts" */ './components/MyPosts.vue'),
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import(/* webpackChunkName: "post" */ './components/Post.vue'),
        },
    ]
})

export default router