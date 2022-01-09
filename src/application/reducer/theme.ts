import { Color, DynamicColor } from '@style/DynamicColor';
import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  theme: 'light' | 'dark';
  colors: Color;
}

export interface ThemeReducer extends SliceCaseReducers<ThemeState> {
  setDarkTheme: (state: ThemeState) => void;
  setLightTheme: (state: ThemeState) => void;
}

export const themeSlice = createSlice<ThemeState, ThemeReducer, 'theme'>({
  name: 'theme',
  initialState: {
    theme: 'light',
    colors: DynamicColor.light,
  },
  reducers: {
    setDarkTheme: state => {
      state.theme = 'dark';
      state.colors = DynamicColor.dark;
    },
    setLightTheme: state => {
      state.theme = 'light';
      state.colors = DynamicColor.light;
    },
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
