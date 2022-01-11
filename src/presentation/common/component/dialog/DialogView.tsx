import useTheme from '@common/hook/useTheme';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Visible } from './DimmedView';
import { Layout } from './interface';

interface DialogViewProps extends ViewProps {
  visible: Visible;
  layout?: Layout;
  source?: ImageSourcePropType;
}

const initialLayout: Layout = { x: 0, y: 0, width: 0, height: 0 };

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export default function DialogView({
  children,
  visible,
  layout = initialLayout,
  source,
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
    opacity: 1.05 - opacity.value,
  }));

  const handleLayout = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      const screenHeight = Dimensions.get('window').height;
      opacity.value = withDelay(50, withTiming(1, { duration: 250 }));
      y.value = withTiming((screenHeight - layout.height) / 2, {
        duration: 300,
      });
      height.value = withTiming(layout.height, { duration: 300 });
    },
    [height, opacity, y],
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
      {source && (
        <AnimatedImageBackground
          style={[StyleSheet.absoluteFillObject, animatedImageBackgroundStyle]}
          source={source}
        />
      )}
      <Pressable style={styles.container} onLayout={handleLayout}>
        {children}
      </Pressable>
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
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
