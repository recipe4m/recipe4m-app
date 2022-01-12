import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = {
  key: '@REDUX_PERSIST',
  storage: AsyncStorage,
};
