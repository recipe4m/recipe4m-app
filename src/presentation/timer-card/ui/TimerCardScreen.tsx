import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import TimeList, { TimeListRef } from '@common/component/dialog/TimeList';
import { convertHMSToValue, convertValueToHMS } from '@lib/DateTime';

import HeaderButton from '@common/component/button/HeaderButton';
import Heading from '@common/component/text/Heading';
import { ITEM_HEIGHT } from '@common/component/dialog/TimeListItem';
import InputItem from '@common/component/text/InputItem';
import { TextInput } from 'react-native-gesture-handler';
import { addTimerCard } from '@reducer/TimerCard';
import { getRandomId } from '@lib/Random';
import { useDispatch } from 'react-redux';

interface TimeoutStateRef {
  hour: number;
  minute: number;
  second: number;
}

export default function TimerCardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const timeoutRef = useRef<TimeoutStateRef>(convertValueToHMS(4 * 60 * 1000));
  const hourRef = useRef<TimeListRef>(null);
  const minuteRef = useRef<TimeListRef>(null);
  const secondRef = useRef<TimeListRef>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { hour, minute, second } = useMemo(() => {
    return convertValueToHMS(4 * 60 * 1000);
  }, []);

  const handlePressCancel = useCallback(() => {
    navigation.dispatch(StackActions.pop());
  }, []);

  const handlePressSave = useCallback(() => {
    dispatch(
      addTimerCard({
        id: getRandomId(),
        title: title || '라면',
        description: description || '라면이 맛있어지는 시간',
        timeout: convertHMSToValue(timeoutRef.current),
      }),
    );
    navigation.dispatch(StackActions.pop());
  }, []);

  const handleChangeHour = useCallback((value: number) => {
    timeoutRef.current.hour = value;
  }, []);

  const handleChangeMinute = useCallback((value: number) => {
    if (timeoutRef.current.minute === 59 && value === 0) {
      hourRef.current?.moveToNext();
    } else if (timeoutRef.current.minute === 0 && value === 59) {
      hourRef.current?.moveToPrev();
    }
    timeoutRef.current.minute = value;
  }, []);

  const handleChangeSecond = useCallback((value: number) => {
    if (timeoutRef.current.second === 59 && value === 0) {
      minuteRef.current?.moveToNext();
    } else if (timeoutRef.current.second === 0 && value === 59) {
      minuteRef.current?.moveToPrev();
    }
    timeoutRef.current.second = value;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderButton onPress={handlePressCancel}>취소</HeaderButton>
        <HeaderButton onPress={handlePressSave}>저장</HeaderButton>
      </View>
      <InputItem label="이름" placeholder="라면" />
      <InputItem label="설명" placeholder="라면이 맛있어지는 시간" />
      <View style={styles.timeListWrapper}>
        <TimeList
          ref={hourRef}
          initialValue={hour}
          range={100}
          onChangeValue={handleChangeHour}
        />
        <Heading style={styles.colon}>:</Heading>
        <TimeList
          ref={minuteRef}
          initialValue={minute}
          onChangeValue={handleChangeMinute}
        />
        <Heading style={styles.colon}>:</Heading>
        <TimeList
          ref={secondRef}
          initialValue={second}
          onChangeValue={handleChangeSecond}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeListWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 50,
    padding: 18,
    height: ITEM_HEIGHT * 5,
  },
  colon: {
    marginHorizontal: 10,
  },
});
