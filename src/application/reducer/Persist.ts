import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig } from 'redux-persist';

export const persistConfig: PersistConfig<any> = {
  key: '@REDUX_PERSIST',
  storage: AsyncStorage,
  blacklist: ['theme'],
};
