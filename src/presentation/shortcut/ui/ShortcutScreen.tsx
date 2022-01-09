import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, Text } from 'react-native';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShortcutScreen() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[animatedStyles]}>
        <Animated.Text>Animated Text</Animated.Text>
      </Animated.View>
      <Pressable onPress={() => (offset.value = Math.random())}>
        <Text>ShortcutScreen</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
