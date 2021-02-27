import React from 'react';

const SignUp = React.lazy(() => import('./Demo/Authentication/SignUp/Register'));
const Signin = React.lazy(() => import('./Demo/Authentication/SignIn/Login'));

const route = [
    { path: '/signup', exact: true, name: 'Signup 1', component: SignUp },
    { path: '/login', exact: true, name: 'Signin 1', component: Signin }
];

export default route;