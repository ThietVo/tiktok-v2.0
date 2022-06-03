import Home from '../pages/Home/Home';
import Following from '../pages/Following/Following';
import Upload from '../pages/Upload/Upload';
import Live from '../pages/Live/Live';
import Search from '../pages/Search/Search';
import NotFound from '../pages/NotFound/NotFound';
import { HeaderOnly } from '../layouts';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/live', component: Live },
    { path: '/search', component: Search, layout: null },
    { path: '*', component: NotFound }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }