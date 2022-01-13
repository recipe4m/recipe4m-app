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
  MINICAPS: string;
  PLACE_HOLDER: string;
  DISABLED: string;

  SYSTEM_BACKGROUND: string;

  BOTTOM_TAB_BAR_BACKGROUND: string;
  BOTTOM_TAB_BAR_BORDER: string;
  BOTTOM_TAB_LABEL: string;
  BOTTOM_TAB_LABEL_ACTIVE: string;
  BOTTOM_TAB_ICON: string;
  BOTTOM_TAB_ICON_ACTIVE: string;

  DIALOG_BACKGROUND: string;
  DIALOG_BORDER: string;

  BUTTON_FILL_BACKGROUND: string;
  BUTTON_FILL_LABEL: string;
  BUTTON_OUTLINE_BACKGROUND: string;
  BUTTON_OUTLINE_LABEL: string;
}

const LightDynamicColor: Color = {
  HEADING: ColorPalette.BLACK,
  TITLE: ColorPalette.BLACK,
  SUB_HEADING: ColorPalette.GRAY_800,
  MEDIUM: ColorPalette.BLACK,
  REGULAR: ColorPalette.GRAY_700,
  MINICAPS: ColorPalette.BLACK,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  SYSTEM_BACKGROUND: ColorPalette.WHITE,

  BOTTOM_TAB_BAR_BACKGROUND: ColorPalette.WHITE,
  BOTTOM_TAB_BAR_BORDER: ColorPalette.GRAY_300,
  BOTTOM_TAB_LABEL: ColorPalette.GRAY_500,
  BOTTOM_TAB_LABEL_ACTIVE: ColorPalette.ORANGE_300,
  BOTTOM_TAB_ICON: ColorPalette.GRAY_500,
  BOTTOM_TAB_ICON_ACTIVE: ColorPalette.ORANGE_300,

  DIALOG_BACKGROUND: ColorPalette.WHITE,
  DIALOG_BORDER: ColorPalette.ORANGE_100,

  BUTTON_FILL_BACKGROUND: ColorPalette.ORANGE_100,
  BUTTON_FILL_LABEL: ColorPalette.WHITE,
  BUTTON_OUTLINE_BACKGROUND: ColorPalette.ORANGE_100,
  BUTTON_OUTLINE_LABEL: ColorPalette.ORANGE_200,
};

const DarkDynamicColor: Color = {
  HEADING: ColorPalette.WHITE,
  TITLE: ColorPalette.WHITE,
  SUB_HEADING: ColorPalette.GRAY_200,
  MEDIUM: ColorPalette.WHITE,
  REGULAR: ColorPalette.GRAY_300,
  MINICAPS: ColorPalette.WHITE,
  PLACE_HOLDER: ColorPalette.GRAY_500,
  DISABLED: ColorPalette.GRAY_300,

  SYSTEM_BACKGROUND: ColorPalette.GRAY_900,

  BOTTOM_TAB_BAR_BACKGROUND: ColorPalette.BLACK,
  BOTTOM_TAB_BAR_BORDER: ColorPalette.GRAY_700,
  BOTTOM_TAB_LABEL: ColorPalette.GRAY_500,
  BOTTOM_TAB_LABEL_ACTIVE: ColorPalette.ORANGE_300,
  BOTTOM_TAB_ICON: ColorPalette.GRAY_500,
  BOTTOM_TAB_ICON_ACTIVE: ColorPalette.ORANGE_300,

  DIALOG_BACKGROUND: ColorPalette.GRAY_800,
  DIALOG_BORDER: ColorPalette.BLACK,

  BUTTON_FILL_BACKGROUND: ColorPalette.ORANGE_100,
  BUTTON_FILL_LABEL: ColorPalette.WHITE,
  BUTTON_OUTLINE_BACKGROUND: ColorPalette.ORANGE_100,
  BUTTON_OUTLINE_LABEL: ColorPalette.ORANGE_200,
};

export const DynamicColor = {
  light: LightDynamicColor,
  dark: DarkDynamicColor,
};
