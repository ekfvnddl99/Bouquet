import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// styles
import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

// logics
import useViewCharacter from '../../logics/hooks/useViewCharacter';
import { followCharacterAsync } from '../../logics/server/Character';
import * as cal from '../../logics/non-server/Calculation';

// components
import BoldNRegularText from '../text/BoldNRegularText';
import ProfileButton from '../button/ProfileButton';
import ProfileInfoTagItem from './ProfileInfoTagItem';
import LineButton from '../button/LineButton';
import useCharacterList from '../../logics/hooks/useCharacterList';
import { MyCharacter, Character } from '../../utils/types/UserTypes';

type ProfileDetailItemProps = {
  isMini: boolean;
  routePrefix: string;
  characterInfo?: MyCharacter | Character;
};
/**
 * Profile의 swipe view 캐릭터 컴포넌트 && '상세 프로필'의 캐릭터 정보
 * TODO 언팔로우
 * TODO 팔로우 여부
 * @param isMini swipe view에 사용되는지 아닌지
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 * @param characterInfo 보여줄 캐릭터 객체
 */
export default function ProfileDetailItem({
  isMini,
  routePrefix,
  characterInfo,
}: ProfileDetailItemProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [viewCharacter, setViewCharacter] = useViewCharacter();
  const characterList = useCharacterList();

  const realCharacter = characterInfo || viewCharacter;

  /**
   * '상세 프로필' 화면으로 이동하는 함수
   */
  async function goProfileDetail() {
    await setViewCharacter(realCharacter.name);
    navigation.push(`${routePrefix}ProfileDetailStack`, {
      screen: 'ProfileDetail',
      params: { routePrefix },
    });
  }
  /**
   * '캐릭터 프로필 수정' 화면으로 이동하는 함수
   * @description modify는 수정한다는 의미의 param
   */
  function goCharacterModification() {
    navigation.navigate('CharacterGeneration', {
      isModifying: true,
      characterInfo: realCharacter,
    });
  }
  /**
   * '캐릭터 삭제' 화면으로 이동하는 함수
   */
  function goCharacterDeletion() {
    navigation.navigate('ProfileDeletion', {
      characterInfo: realCharacter,
    });
  }

  function checkMyCharacter() {
    let result = false;
    characterList.forEach((obj) => {
      if (obj.name === realCharacter.name) result = true;
    });
    return result;
  }

  /**
   * 내가 다른 캐릭터를 follow하는 함수
   * @returns followCharacterAsync 함수 결과
   */
  async function followOrUnfollow() {
    const newState = !isFollowed;
    setIsFollowed(newState);
    const realCharacterId = realCharacter.id ? realCharacter.id : -1;
    const serverResult = await followCharacterAsync(realCharacterId);
    if (serverResult.isSuccess) {
      setIsFollowed(serverResult.result);
      await setViewCharacter(realCharacter.name);
    } else {
      alert(serverResult.result.errorMsg);
      setIsFollowed(!newState);
    }
  }

  function isMyCharacter(
    chInfo: MyCharacter | Character,
  ): chInfo is MyCharacter {
    return checkMyCharacter();
  }

  const [isFollowed, setIsFollowed] = useState(
    !isMyCharacter(realCharacter) ? realCharacter.followed : false,
  );

  return (
    <button.ProfileDetailButton
      activeOpacity={1}
      onPress={() => (isMini ? goProfileDetail() : {})}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <elses.CircleImg
          diameter={120}
          source={{ uri: realCharacter.profile_img }}
        />
        <View style={{ marginTop: 8 }} />
        <text.Subtitle2B textColor={colors.black}>
          {realCharacter.name}
        </text.Subtitle2B>
        <View style={{ marginTop: 8 }} />
        <text.Body2R textColor={colors.gray5} numberOfLines={1}>
          {realCharacter.intro}
        </text.Body2R>
      </View>

      {isMini ? (
        <View style={{ marginTop: 34 }} />
      ) : (
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          {checkMyCharacter() ? (
            <area.RowArea>
              <LineButton
                onPress={() => goCharacterModification()}
                content={i18n.t('정보 수정')}
                borderColor={colors.primary}
              />
              <View style={{ marginLeft: 8 }} />
              <LineButton
                onPress={() => goCharacterDeletion()}
                content={i18n.t('삭제')}
                borderColor={colors.warning_red}
              />
            </area.RowArea>
          ) : (
            <LineButton
              onPress={() => followOrUnfollow()}
              content={!isFollowed ? '팔로우' : '팔로우 취소'}
              borderColor={colors.primary}
            />
          )}

          <area.RowArea
            style={{ justifyContent: 'center', marginTop: 8, marginBottom: 24 }}
          >
            <BoldNRegularText
              boldContent={cal
                .numName(
                  // characterInfo가 있어도 이 경우는 팔로워 수를 띄울 필요도 없고 띄울 수도 없음
                  // 어차피 profile detail로 이동하게 되면 알아서 setViewCharacter()가 실행될 때 이 정보를 불러올 것이므로 realCharacter가 아닌 viewCharacter로 처리
                  viewCharacter.num_followers ? viewCharacter.num_followers : 0,
                )
                .toString()}
              regularContent={i18n.t('팔로워')}
              textColor={colors.primary}
              isCenter
            />
            <View style={{ marginRight: 32 }} />
            <BoldNRegularText
              boldContent={
                // characterInfo가 있어도 이 경우는 팔로우 수를 띄울 필요도 없고 띄울 수도 없음
                // 어차피 profile detail로 이동하게 되면 알아서 setViewCharacter()가 실행될 때 이 정보를 불러올 것이므로 realCharacter가 아닌 viewCharacter로 처리
                viewCharacter.num_follows
                  ? viewCharacter.num_follows.toString()
                  : '0'
              }
              regularContent={i18n.t('팔로우')}
              textColor={colors.primary}
              isCenter
            />
          </area.RowArea>
          <area.RowArea style={{ marginBottom: 24 }}>
            <ProfileButton
              diameter={20}
              isAccount
              isJustImg={false}
              isPress
              name={
                // characterInfo가 있어도 이 경우는 유저 정보를 띄울 필요도 없고 띄울 수도 없음
                // 어차피 profile detail로 이동하게 되면 알아서 setViewCharacter()가 실행될 때 이 정보를 불러올 것이므로 realCharacter가 아닌 viewCharacter로 처리
                viewCharacter.user_info.name ? viewCharacter.user_info.name : ''
              }
              profileImg={
                // characterInfo가 있어도 이 경우는 유저 정보를 띄울 필요도 없고 띄울 수도 없음
                // 어차피 profile detail로 이동하게 되면 알아서 setViewCharacter()가 실행될 때 이 정보를 불러올 것이므로 realCharacter가 아닌 viewCharacter로 처리
                viewCharacter.user_info.profile_img
                  ? viewCharacter.user_info.profile_img
                  : ''
              }
              routePrefix={routePrefix}
            />
            <text.Body2R textColor={colors.black}>
              {i18n.t('의')} {i18n.t('캐릭터')}
            </text.Body2R>
          </area.RowArea>
        </View>
      )}

      <area.RowArea style={{ justifyContent: 'center' }}>
        <View style={{ flex: 1 }}>
          <BoldNRegularText
            boldContent={i18n.t('직업')}
            regularContent={realCharacter.job}
            textColor={colors.black}
            isCenter
          />
        </View>
        <View style={{ flex: isMini ? 1.5 : 1 }}>
          <BoldNRegularText
            boldContent={i18n.t('생년월일')}
            regularContent={realCharacter.birth.toString()}
            textColor={colors.black}
            isCenter
          />
        </View>
        <View style={{ flex: 1 }}>
          <BoldNRegularText
            boldContent={i18n.t('국적')}
            regularContent={realCharacter.nationality}
            textColor={colors.black}
            isCenter
          />
        </View>
      </area.RowArea>
      <View style={{ marginTop: 16 }} />
      <ProfileInfoTagItem
        title={i18n.t('좋아하는 것')}
        tagArray={realCharacter.likes}
        isMini={isMini}
      />
      <View style={{ marginTop: 16 }} />
      <ProfileInfoTagItem
        title={i18n.t('싫어하는 것')}
        tagArray={realCharacter.hates}
        isMini={isMini}
      />
      <View style={{ marginTop: 16 }} />
      <BoldNRegularText
        boldContent={i18n.t('특이사항')}
        regularContent={realCharacter.tmi}
        textColor={colors.black}
        isCenter={false}
      />
    </button.ProfileDetailButton>
  );
}
