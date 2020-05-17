import '../pages/app-home';

export var routes = [
{
    path: '/',
    component: 'app-home',
},
{
    path: "/about",
    component: "app-about",
    action: async () => {
        await import('../pages/app-about.js');
    },
},
{
    path: "/wallet",
    component: "app-wallet",
    action: async () => {
        await import('../pages/app-wallet.js');
    },
},
{
    path: "/award",
    component: "app-award",
    action: async () => {
        await import('../pages/app-award.js');
    },
},
{
    path: "/login",
    component: "app-login",
    action: async () => {
        await import('../pages/app-login.js');
    },
},
{
    path: "/logout",
    component: "app-logout",
    action: async () => {
        await import('../pages/app-logout.js');
    },
},
{
    path: '(.*)',
    component: 'app-not-found',
    action: async () => {
        await import('../pages/app-not-found.js');
    }
}];
