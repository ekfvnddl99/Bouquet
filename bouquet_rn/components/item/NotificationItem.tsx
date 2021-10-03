import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// assets
import Icon from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';

// utils
import { Notification } from '../../utils/types/PostTypes';

type NotificationItemProps = {
  notificationInfo: Notification;
  onPress: (param: string | number) => void;
  onDelete: (input: number) => void;
};
/**
 * Notification 알람 컴포넌트
 * @description 누구에게, 어떤 내용이 왔는지
 * ! 뭔가 서버에서 사진, 이름, 내용 한 번에 다 보내줄 것 같아서 인자 바꿔야 할 듯
 * TODO 알림 삭제 함수
 * TODO 알림 프로필 사진 넣기
 * TODO 알림 시간 넣기
 *
 * @param name 알람 원인이 되는 이의 이름
 * @param content 알람 내용
 */
export default function NotificationItem({
  notificationInfo,
  onPress,
  onDelete,
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
      onMoveShouldSetPanResponder: (e, gestureState) =>
        Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1,
      onPanResponderGrant: () => {
        // @ts-ignore
        drag.setOffset(TranslateX.__getValue());
      },
      onPanResponderMove: Animated.event([null, { dx: drag }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, { dx }) => {
        // @ts-ignore
        // drag.setValue(dx > SWIPE / 2 ? +SWIPE : -SWIPE);
      },
    }),
  ).current;

  function setContent() {
    switch (notificationInfo.category) {
      case 'Follow':
        return '님이 당신을 팔로우해요.';
      case 'LikeComment':
        return '님이 당신의 댓글을 좋아해요.';
      case 'LikePost':
        return '님이 당신의 게시글을 좋아해요.';
      case 'Comment':
        return '님이 당신의 게시글에 댓글을 달았어요.';
      default:
        return '';
    }
  }

  return (
    <WholeArea>
      <BinButton onPress={() => onDelete(notificationInfo.id)}>
        <View style={{ alignItems: 'center' }}>
          <Icon icon="binWhite" size={24} />
        </View>
      </BinButton>
      <Animated.View
        {...panResponder.panHandlers}
        style={[{ width: '100%' }, { transform: [{ translateX: TranslateX }] }]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: colors.white,
            borderRadius: 10,
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingVertical: 12,
            marginBottom: 10,
          }}
          activeOpacity={1}
          onPress={() =>
            onPress(
              notificationInfo.post_id
                ? notificationInfo.post_id
                : notificationInfo.sender_name,
            )
          }
        >
          <elses.CircleImg
            diameter={20}
            source={{ uri: notificationInfo.sender_profile_img }}
          />
          <View
            style={{
              flex: 2,
              marginLeft: 10,
            }}
          >
            <area.RowArea>
              <text.Body2B textColor={colors.black}>
                {notificationInfo.sender_name}
                <text.Body2R textColor={colors.black}>
                  {setContent()}
                </text.Body2R>
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
              {cal.timeName(notificationInfo.created_at)} {i18n.t('전')}
            </text.Caption>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </WholeArea>
  );
}

const WholeArea = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-horizontal: 30;
`;
const BinButton = styled.TouchableOpacity`
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
