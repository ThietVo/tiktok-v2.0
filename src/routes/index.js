import config from '~/config';

import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Upload from '~/pages/Upload/Upload';
import Live from '~/pages/Live/Live';
import Search from '~/pages/Search/Search';
import NotFound from '~/pages/NotFound/NotFound';
import { HeaderOnly } from '~/layouts';
import LogOut from '~/pages/LogOut/LogOut';


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.live, component: Live },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.logOut, component: LogOut, layout: null },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }