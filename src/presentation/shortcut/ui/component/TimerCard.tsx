import Heading from '@common/component/Heading';
import Medium from '@common/component/Medium';
import Minicaps from '@common/component/Minicaps';
import React from 'react';
import Regular from '@common/component/Regular';
import SubHeading from '@common/component/SubHeading';
import SubRegular from '@common/component/SubRegular';
import TimerCardView from './TimerCardView';
import Title from '@common/component/Title';

export default function TimerCard() {
  return (
    <TimerCardView>
      <Heading>Heading</Heading>
      <Title>Title</Title>
      <SubHeading>SubHeading</SubHeading>
      <Medium>Medium</Medium>
      <Regular>Regular</Regular>
      <SubRegular>SubRegular</SubRegular>
      <Minicaps>Minicaps</Minicaps>
    </TimerCardView>
  );
}
