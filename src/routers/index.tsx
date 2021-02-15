import * as React from 'react';
import {lazy,Suspense} from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Loading from '../components/loading'
import NotFound from '../components/notFound'
const Home=lazy(()=>import('../pages/home/home'))
const About=lazy(()=>import('../pages/about'))
export const routers:RouteProps[]=[
  {
    path:'/home',
    exact:true,
    component:Home
  },
  {
    path:'/about',
    exact:true,
    component:About,
  },
  {
    path: '*',
    component: NotFound
  },
]
const Routers = (authorized: boolean) => <Suspense fallback={<Loading />}>
  <Switch>
    {
      routers.map(r => {
        const { path, exact, component } = r
        const LazyCom: keyof JSX.IntrinsicElements | any = component
        return <Route key={path + ''} exact={exact} path={path} render={(props: any) => (authorized ? <LazyCom {...props} /> : <Redirect to="/login" />)} />
      })
    }
  </Switch>
</Suspense>
export default Routers
