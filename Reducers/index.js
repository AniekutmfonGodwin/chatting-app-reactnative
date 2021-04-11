import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './userReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
 


const rootReducer = combineReducers({
    user:userReducer
})
 
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist: ['user'],
  
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}