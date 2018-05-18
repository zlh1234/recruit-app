
import {combineReducers} from 'redux'
import {userReducer} from './redux/user.redux'
import {listReducer} from './redux/list.redux'
import {chatReducer} from './redux/chat.redux'
export default combineReducers({
  userReducer,
  listReducer,
  chatReducer
});