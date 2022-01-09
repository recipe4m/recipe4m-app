import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Pressable, Text, View } from 'react-native';

import React from 'react';

export default function ShortcutScreen() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <View>
      <Animated.View style={[animatedStyles]}>
        <Animated.Text>Animated Text</Animated.Text>
      </Animated.View>
      <Pressable onPress={() => (offset.value = Math.random())}>
        <Text>ShortcutScreen</Text>
      </Pressable>
    </View>
  );
}
