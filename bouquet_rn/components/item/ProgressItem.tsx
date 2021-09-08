import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// icons
import Icon from '../../assets/Icon';

type ProgressItemProps = {
  stepBack: () => void;
  step: 0 | 1 | 2 | 3 | 4;
  title: string;
  subtitle?: string;
  navigation: any;
};
/**
 * progress bar 컴포넌트
 * @description 진행정도를 표시한다.
 *
 * @param stepBack step 뒤로가기 할 때 실행되는 함수
 * @param step step의 값
 * @param title 해당 step 화면의 제목
 * @param subtitle 해당 step 화면의 부제목
 * @param navigation navigation 값
 */
export default function ProgressItem({
  stepBack,
  step,
  title,
  subtitle,
  navigation,
}: ProgressItemProps): React.ReactElement {
  /**
   * progress의 animation 관련
   *
   * progressValue progress bar에서 표시되는 정도의 값
   * progress animation 변수
   * TranslateX x축으로 움직이는 animation
   */
  // const [progressValue, setProgressValue] = useState(step * 25);
  const progress = useRef(new Animated.Value(0)).current;
  const TranslateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  /**
   * step 값이 바뀔 때마다 progress bar가 자동으로 움직여야 한다.
   */
  useEffect(() => {
    const newValue = 25 * step;
    // setProgressValue(newValue);

    Animated.timing(progress, {
      duration: 1000,
      toValue: newValue,
      useNativeDriver: false,
    }).start();
  }, [step]);
  /**
   * step 1일 때 뒤로가기를 처리하는 함수
   * 탭을 다시 나타나게 하고, 화면 자체를 뒤로 이동한다.
   */
  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={{ marginBottom: 12 }}>
      {step === 4 ? (
        <View style={{ marginBottom: 24 }} />
      ) : (
        <TouchableOpacity onPress={() => (step === 1 ? goBack : stepBack)}>
          <Icon icon="arrowLeft" size={24} />
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 20, marginBottom: 24 }}>
        <elses.Bar width="100%" backgroundColor={colors.alpha20_primary} />
        <ProgressArea barWidth={TranslateX} style={{ width: TranslateX }} />
      </View>
      <text.Subtitle1 textColor={colors.black}>{title}</text.Subtitle1>
      {subtitle ? (
        <View style={{ marginTop: 8 }}>
          <text.Caption textColor={colors.gray6}>{subtitle}</text.Caption>
        </View>
      ) : null}
    </View>
  );
}

interface ProgressAreaProps {
  barWidth: any;
}
const ProgressArea = styled(Animated.View)`
  width: ${(props: ProgressAreaProps) => props.barWidth};
  height: 8;
  border-radius: 10;
  position: 'absolute';
  background-color: ${colors.primary};
`;
