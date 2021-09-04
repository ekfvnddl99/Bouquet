import React, { useMemo } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

// logics
import useCharacterView from '../../logics/hooks/useCharacterView';
import { followCharacterAsync } from '../../logics/server/Character';
import useUser from '../../logics/hooks/useUser';
import * as cal from '../../logics/non-server/Calculation';

// utils
import { Character } from '../../utils/types/UserTypes';

// components
import BoldNRegularText from '../text/BoldNRegularText';
import ProfileButton from '../button/ProfileButton';
import ProfileInfoTagItem from './ProfileInfoTagItem';
import LineButton from '../button/LineButton';
import { characterListState } from '../../logics/atoms';

type ProfileDetailItemProps = {
  isMini: boolean;
  characterInfo: Character;
};
/**
 * Profile의 swipe view 캐릭터 컴포넌트 && '상세 프로필'의 캐릭터 정보
 *
 * @param isMini swipe view에 사용되는지 아닌지
 * @param characterInfo 캐릭터
 */
export default function ProfileDetailItem({
  isMini,
  characterInfo,
}: ProfileDetailItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useCharacterView();
  const [characterList, setCharacterList] = useRecoilState(characterListState);

  /**
   * '상세 프로필' 화면으로 이동하는 함수
   */
  function goProfileDetail() {
    setViewCharacter(characterInfo.name);
    navigation.navigate('ProfileDetailStack');
  }
  /**
   * '캐릭터 프로필 수정' 화면으로 이동하는 함수
   * modify는 수정한다는 의미의 param
   */
  function goChaModification() {
    navigation.navigate('ProfileModification', { modify: 1 });
  }
  /**
   * '캐릭터 삭제' 화면으로 이동하는 함수
   */
  function goChaDeletion() {
    navigation.navigate('ProfileDeletion');
  }

  /**
   * 내가 지금 보고 있는 캐릭터 객체
   */
  const realCharacter = useMemo(() => {
    if (viewCharacter.state === 'hasValue') {
      return viewCharacter.contents;
    }
    return characterInfo;
  }, [characterInfo, viewCharacter]);

  /**
   * 내가 다른 캐릭터를 follow하는 함수
   * @returns followCharacterAsync 함수 결과
   */
  async function follow() {
    let characterInfoId = -1;
    if (characterInfo.id) characterInfoId = characterInfo.id;
    const result = await followCharacterAsync(
      realCharacter.id,
      characterInfoId,
    );
    return result;
  }

  return (
    <button.ProfileDetailButton
      activeOpacity={1}
      onPress={() => (isMini ? goProfileDetail : {})}
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
          {characterList.includes(characterInfo) ? (
            <area.RowArea>
              <LineButton
                onPress={() => goChaModification}
                content={i18n.t('정보 수정')}
                borderColor={colors.primary}
              />
              <View style={{ marginLeft: 8 }} />
              <LineButton
                onPress={() => goChaDeletion}
                content={i18n.t('삭제')}
                borderColor={colors.warning_red}
              />
            </area.RowArea>
          ) : (
            <LineButton
              onPress={() => follow}
              content={i18n.t('팔로우')}
              borderColor={colors.primary}
            />
          )}

          <area.RowArea
            style={{ justifyContent: 'center', marginTop: 8, marginBottom: 24 }}
          >
            <BoldNRegularText
              boldContent={cal
                .numName(
                  realCharacter.num_followers ? realCharacter.num_followers : 0,
                )
                .toString()}
              regularContent={i18n.t('팔로워')}
              textColor={colors.primary}
              isCenter
            />
            <View style={{ marginRight: 32 }} />
            <BoldNRegularText
              boldContent={
                realCharacter.num_follows ? realCharacter.num_follows : 0
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
              name={
                realCharacter.user_info.name ? realCharacter.user_info.name : ''
              }
              img={
                realCharacter.user_info.profile_img
                  ? realCharacter.user_info.profile_img
                  : ''
              }
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
            regularContent={realCharacter.birth}
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
      <View style={{ marginTop: 16, flexWrap: 'wrap' }} />
      <ProfileInfoTagItem
        title={i18n.t('좋아하는 것')}
        tags={realCharacter.likes}
      />
      <View style={{ marginTop: 16, flexWrap: 'wrap' }} />
      <ProfileInfoTagItem
        title={i18n.t('싫어하는 것')}
        tags={realCharacter.hates}
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
