import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';
import Search from '~/pages/Search';
import NotFound from '~/pages/NotFound';
import LogOut from '~/pages/LogOut';
import { HeaderOnly } from '~/layouts';
import UserDetail from '~/pages/UserDetail';


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.userDetail, component: UserDetail },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.live, component: Live },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.logOut, component: LogOut, layout: null },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }