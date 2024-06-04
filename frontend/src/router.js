import { createMemoryHistory, createRouter } from 'vue-router'

import ViewMovieList from "./views/ViewMovieList.vue";
import ViewAuthorList from "./views/ViewAuthorList.vue";

const routes = [
    { path: '/', component: ViewMovieList },
    { path: '/authors', component: ViewAuthorList },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router