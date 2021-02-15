import * as React from "react";
import Loading from './components/loading'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
const { lazy, Suspense } = React;
import NotFound from './components/notFound'
const DivLayout = lazy(() => import( /* webpackChunkName:"DivLayout" */'./pages/layout'))
const Login = lazy(() => import( /* webpackChunkName:"login" */'./pages/login'))
import 'antd/dist/antd.css'
const App=()=>
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Loading size="large"/>}>
        <Switch>
          <Route path="/login" exact component={(props: any) => <Login {...props} />} />
          <Route path="/" component={(props: any) => <DivLayout {...props} />} />
          <Route path="*" component={NotFound}/>
          <Redirect to="/home" />
        </Switch>
      </Suspense>
  </Router>  
  </Provider>
export default App