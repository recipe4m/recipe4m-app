import useTheme from '@common/hook/useTheme';
import { ColorPalette } from '@style/ColorPalette';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  Dimensions,
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Visible } from './DimmedView';
import { DefaultOptions, Layout } from './interface';

interface DialogViewProps extends ViewProps {
  visible: Visible;
  options: DefaultOptions;
}

const initialLayout: Layout = { x: 0, y: 0, width: 0, height: 0 };

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DialogView({
  children,
  visible,
  options: { layout = initialLayout, source, onOpen },
  style,
  ...props
}: PropsWithChildren<DialogViewProps>) {
  const opacity = useSharedValue<number>(0);

  const x = useSharedValue<number>(layout.x);
  const y = useSharedValue<number>(layout.y);
  const width = useSharedValue<number>(layout.width);
  const height = useSharedValue<number>(layout.height);

  const { colors } = useTheme();

  const dialogViewStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: colors.DIALOG_BACKGROUND,
    }),
    [colors],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const animatedImageBackgroundStyle = useAnimatedStyle(() => ({
    opacity: 1.0 - opacity.value,
  }));

  const contentWrapperStyle = useMemo(
    () => ({
      backgroundColor: colors.DIALOG_BACKGROUND,
    }),
    [colors],
  );

  const animatedContentWrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleLayout = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      if (onOpen) onOpen();
      const screenHeight = Dimensions.get('window').height;
      opacity.value = withDelay(50, withTiming(1, { duration: 250 }));
      y.value = withTiming((screenHeight - layout.height) / 2, {
        duration: 300,
      });
      height.value = withTiming(layout.height, { duration: 300 });
    },
    [height, onOpen, opacity, y],
  );

  useEffect(() => {
    if (visible === 'disappearing') {
      opacity.value = withDelay(50, withTiming(0, { duration: 250 }));
      y.value = withTiming(layout.y, {
        duration: 300,
      });
      height.value = withTiming(layout.height, { duration: 300 });
    }
  }, [height, layout.height, layout.y, opacity, visible, y]);

  return (
    <Animated.View
      {...props}
      style={[styles.container, dialogViewStyle, animatedStyle, style]}>
      <LinearGradient
        style={styles.headBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[ColorPalette.ORANGE_100, ColorPalette.ORANGE_50]}
      />
      {source && (
        <AnimatedImageBackground
          style={[StyleSheet.absoluteFillObject, animatedImageBackgroundStyle]}
          source={source}
        />
      )}
      <AnimatedPressable
        style={[
          styles.container,
          contentWrapperStyle,
          animatedContentWrapperStyle,
        ]}
        onLayout={handleLayout}>
        {children}
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 36,
    maxWidth: 400,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16.0,
    elevation: 5,
  },
  headBorder: {
    ...StyleSheet.absoluteFillObject,
    height: 13,
  },
});
