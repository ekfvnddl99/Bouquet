import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// icons
import Icon from '../../assets/Icon';

type ProgressItemProps = {
  back: any;
  step: number;
  title: string;
  intro: string;
  navigation: any;
  press?: Function;
};
export default function ProgressItem({
  back,
  step,
  title,
  intro,
  navigation,
  press,
}: ProgressItemProps): React.ReactElement {
  const [progressValue, setProgressValue] = useState(step * 25);
  const progress = useRef(new Animated.Value(0)).current;
  const TranslateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    setProgressValue(25 * step);
    Animated.timing(progress, {
      duration: 1000,
      toValue: progressValue,
      useNativeDriver: false,
    }).start();
  });
  const pressBack = () => {
    if (press) press();
    navigation.goBack();
  };
  return (
    <View style={{ marginBottom: 12 }}>
      {step === 4 ? (
        <View style={{ marginBottom: 24 }} />
      ) : (
        <TouchableOpacity onPress={step === 1 ? pressBack : back}>
          <Icon icon="arrowLeft" size={24} />
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 20, marginBottom: 24 }}>
        <elses.Bar width="100%" color={colors.alpha20_primary} />
        <ProgressArea barWidth={TranslateX} />
      </View>
      <text.Subtitle1 color={colors.black}>{title}</text.Subtitle1>
      <View style={{ marginTop: 8 }}>
        <text.Caption color={colors.gray6}>{intro}</text.Caption>
      </View>
    </View>
  );
}

interface ProgressAreaProps {
  barWidth: number | any;
}
const ProgressArea = styled(Animated.View)`
  width: ${(props: ProgressAreaProps) => props.barWidth};,
  height: 8,
  border-radius: 10,
  position: 'absolute',
  background-color: ${colors.primary},
`;
