
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import reducers from './reducers'
import './interceptors'
//容器
import Login from './containers/login/login'
import Register from './containers/register/register'
import BossInfo from './containers/bossinfo/bossinfo'
import GeniusInfo from './containers/geniusinfo/geniusinfo'
//组件
import AuthRoute from './components/authRoute/authRoute'
import DashBoard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'
// const store = createStore(reducers,compose(
//       applyMiddleware(thunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );
//const store = createStore(reducers,applyMiddleware(thunk));
let store;
if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){
  store = createStore(reducers,applyMiddleware(thunk));
}else{
  store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:_id" component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);