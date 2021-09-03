import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// assets
import Icon from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';

/**
 * Notification 알람 컴포넌트
 * 누구에게, 어떤 내용이 왔는지
 * ! 뭔가 서버에서 사진, 이름, 내용 한 번에 다 보내줄 것 같아서 인자 바꿔야 할 듯
 *
 * @param name 알람 원인이 되는 이의 이름
 * @param content 알람 내용
 */
type NotificationItemProps = {
  name: string;
  content: string;
};
export default function NotificationItem({
  name,
  content,
}: NotificationItemProps): React.ReactElement {
  /**
   * swipe to delete의 animation 관련
   *
   * SWIPE 스와이프 되는 정도
   * drag animation 변수
   * TranslateX x축으로 움직이는 animation
   * panResponder 내 gesture를 인식하는 animation 설정
   */
  const SWIPE = 50;
  const drag = useRef(new Animated.Value(0)).current;
  const TranslateX = drag.interpolate({
    inputRange: [-SWIPE, 0],
    outputRange: [-SWIPE, 0],
    extrapolate: 'clamp',
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: drag }]),
      onPanResponderRelease: (e, { dx }) => {
        if (dx > 0) {
          // spring처럼 통통 튀는 animation
          Animated.spring(drag, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 30,
      }}
    >
      <BinArea>
        <View style={{ alignItems: 'center' }}>
          <Icon icon="binWhite" size={24} />
        </View>
      </BinArea>
      <Animated.View
        {...panResponder.panHandlers}
        style={[{ width: '100%' }, { transform: [{ translateX: TranslateX }] }]}
      >
        <button.NotificationButton activeOpacity={1}>
          <elses.CircleImg diameter={20} source={{}} />
          <View
            style={{
              flex: 2,
              marginLeft: 10,
            }}
          >
            <area.RowArea>
              <text.Body2B textColor={colors.black}>
                {name}
                <text.Body2R textColor={colors.black}>{content}</text.Body2R>
              </text.Body2B>
            </area.RowArea>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}
          >
            <text.Caption textColor={colors.gray5}>
              {cal.timeName(57)} {i18n.t('전')}
            </text.Caption>
          </View>
        </button.NotificationButton>
      </Animated.View>
    </View>
  );
}

const BinArea = styled.View`
  align-items: center;
  background-color: ${colors.warning_red};
  border-radius: 11;
  bottom: 0;
  justify-content: center;
  margin-bottom: 10;
  padding-left: 20;
  position: absolute;
  right: 0;
  top: 0;
  width: 70;
`;
