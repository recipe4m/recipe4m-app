import { ColorPalette } from '.';

interface DynamicColor {
  /**
   * Text
   */
  HEADING: string;
  TITLE: string;
  SUB_HEADING: string;
  MEDIUM: string;
  REGULAR: string;
  MINICAP: string;
  PLACE_HOLDER: string;
  DISABLED: string;

  BOTTOM_TAB: string;
  BOTTOM_TAB_ACTIVE: string;
}

const LightDynamicColor: DynamicColor = {
  HEADING: ColorPalette.BLACK,
  TITLE: ColorPalette.BLACK,
  SUB_HEADING: ColorPalette.BLACK,
  MEDIUM: ColorPalette.BLACK,
  REGULAR: ColorPalette.GRAY_900,
  MINICAP: ColorPalette.BLACK,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  BOTTOM_TAB: ColorPalette.GRAY_500,
  BOTTOM_TAB_ACTIVE: ColorPalette.ORANGE_300,
};

const DarkDynamicColor: DynamicColor = {
  HEADING: ColorPalette.BLACK,
  TITLE: ColorPalette.BLACK,
  SUB_HEADING: ColorPalette.BLACK,
  MEDIUM: ColorPalette.BLACK,
  REGULAR: ColorPalette.GRAY_900,
  MINICAP: ColorPalette.BLACK,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  BOTTOM_TAB: ColorPalette.GRAY_500,
  BOTTOM_TAB_ACTIVE: ColorPalette.ORANGE_300,
};

export const DynamicColor = {
  light: LightDynamicColor,
  dark: DarkDynamicColor,
};
