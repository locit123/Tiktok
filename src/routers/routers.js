import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import Friend from '~/pages/Friend';
import Message from '~/pages/Message';
//layout
import { HeaderOnly } from '~/layouts';
const publicRouters = [
    { path: config.routers.home, component: Home },
    { path: config.routers.following, component: Following },
    { path: config.routers.profile, component: Profile },
    { path: config.routers.live, component: Live },
    { path: config.routers.explore, component: Explore },
    { path: config.routers.friend, component: Friend },
    { path: config.routers.message, component: Message },
    { path: config.routers.upload, component: Upload, layout: HeaderOnly },
    { path: config.routers.search, component: Search, layout: null },
];

const privateRouters = [];

export { publicRouters, privateRouters };
