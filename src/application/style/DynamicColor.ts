import { ColorPalette } from '@style/ColorPalette';

export interface Color {
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

  SYSTEM_BACKGROUND: string;

  BOTTOM_TAB_BAR_BACKGROUND: string;
  BOTTOM_TAB_BAR_BORDER: string;
  BOTTOM_TAB_LABEL: string;
  BOTTOM_TAB_LABEL_ACTIVE: string;
}

const LightDynamicColor: Color = {
  HEADING: ColorPalette.BLACK,
  TITLE: ColorPalette.BLACK,
  SUB_HEADING: ColorPalette.BLACK,
  MEDIUM: ColorPalette.BLACK,
  REGULAR: ColorPalette.GRAY_900,
  MINICAP: ColorPalette.BLACK,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  SYSTEM_BACKGROUND: ColorPalette.WHITE,

  BOTTOM_TAB_BAR_BACKGROUND: ColorPalette.WHITE,
  BOTTOM_TAB_BAR_BORDER: ColorPalette.GRAY_300,
  BOTTOM_TAB_LABEL: ColorPalette.GRAY_500,
  BOTTOM_TAB_LABEL_ACTIVE: ColorPalette.ORANGE_300,
};

const DarkDynamicColor: Color = {
  HEADING: ColorPalette.BLACK,
  TITLE: ColorPalette.BLACK,
  SUB_HEADING: ColorPalette.BLACK,
  MEDIUM: ColorPalette.BLACK,
  REGULAR: ColorPalette.GRAY_900,
  MINICAP: ColorPalette.BLACK,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  SYSTEM_BACKGROUND: ColorPalette.GRAY_900,

  BOTTOM_TAB_BAR_BACKGROUND: ColorPalette.BLACK,
  BOTTOM_TAB_BAR_BORDER: ColorPalette.GRAY_700,
  BOTTOM_TAB_LABEL: ColorPalette.GRAY_500,
  BOTTOM_TAB_LABEL_ACTIVE: ColorPalette.ORANGE_300,
};

export const DynamicColor = {
  light: LightDynamicColor,
  dark: DarkDynamicColor,
};
