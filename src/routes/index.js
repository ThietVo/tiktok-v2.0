import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';
import Search from '~/pages/Search';
import LogOut from '~/pages/LogOut';
import Coin from '~/pages/Coin';
import NotFound from '~/pages/NotFound';
import { HeaderOnlyLayout } from '~/layouts';
import UserDetail from '~/pages/UserDetail';
import Settings from '~/pages/Settings';
import Analytics from '~/pages/Analytics';
import Feedback from '~/pages/Feedback';
import Studio from '~/pages/Studio';


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.userDetail, component: UserDetail },
    { path: config.routes.upload, component: Upload, layout: HeaderOnlyLayout },
    { path: config.routes.live, component: Live },
    { path: config.routes.search, component: Search },
    { path: config.routes.logOut, component: LogOut, layout: null },
    { path: config.routes.coin, component: Coin, layout: HeaderOnlyLayout },
    { path: config.routes.analytics, component: Analytics, layout: HeaderOnlyLayout },
    { path: config.routes.studio, component: Studio, layout: HeaderOnlyLayout },
    { path: config.routes.settings, component: Settings, layout: HeaderOnlyLayout },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnlyLayout },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }