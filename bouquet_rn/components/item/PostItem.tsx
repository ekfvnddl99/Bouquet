import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// logics
import * as cal from '../../logics/non-server/Calculation';
import useViewPost from '../../logics/hooks/useViewPost';

// utils
import { AllTemplates, Post } from '../../utils/types/PostTypes';

// components
import SunButton from '../button/SunButton';
import ProfileButton from '../button/ProfileButton';

// templates
import TextTemplate from '../../screens/template/TextTemplate';
import ImageTemplate from '../../screens/template/ImageTemplate';
import AlbumTemplate from '../../screens/template/AlbumTemplate';
import DiaryTemplate from '../../screens/template/DiaryTemplate';
import ListTemplate from '../../screens/template/ListTemplate';

type PostItemProps = {
  postInfo: Post<AllTemplates>;
  routePrefix: string;
  /** Press Sun button */
  onPressSun: (postInfo: Post<AllTemplates>) => void;
};
/**
 * 피드에 보이는 게시글 컴포넌트
 * TODO 햇살 set 함수
 *
 * @param postInfo 게시글 객체
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 */
export default function PostItem({
  postInfo,
  routePrefix,
  onPressSun,
}: PostItemProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [, setViewPost] = useViewPost();
  /**
   * '상세 게시글' 화면으로 이동하는 함수
   */
  async function goPostStack() {
    await setViewPost(postInfo.id);
    navigation.push(`${routePrefix}PostStack`, {
      screen: 'PostDetail',
      params: { routePrefix, postId: postInfo.id },
    });
  }

  /**
   * 해당 게시글의 template과 그에 맞는 내용들을 가져오는 함수
   */
  const getTemplate = () => {
    if (postInfo) {
      switch (postInfo.template.type) {
        case 'None':
          return <TextTemplate mode="mini" post={postInfo.text} />;
        case 'Image':
          return (
            <>
              <ImageTemplate mode="mini" post={postInfo.template} />
              {postInfo.text ? (
                <TextTemplate mode="mini" post={postInfo.text} />
              ) : null}
            </>
          );
        case 'Diary':
          return <DiaryTemplate mode="mini" post={postInfo.template} />;
        case 'Album':
          return <AlbumTemplate mode="mini" post={postInfo.template} />;
        case 'List':
          return <ListTemplate mode="mini" post={postInfo.template} />;
        default:
          return null;
      }
    } else return null;
  };
  // 위의 함수 getTemplate에서 가져온 template 객체
  // const template = useMemo(() => getTemplate(), [getTemplate]);
  const template = getTemplate();

  return (
    <button.BigListButton
      backgroundColor={colors.white}
      paddingH={10}
      paddingV={10}
      onPress={() => goPostStack()}
      activeOpacity={1}
    >
      <area.RowArea>
        <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            isJustImg={false}
            isPress
            name={postInfo ? postInfo.character_info.name : ''}
            profileImg={postInfo ? postInfo.character_info.profile_img : ''}
            routePrefix={routePrefix}
          />
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <text.Caption textColor={colors.gray5}>
            {cal.timeName(postInfo.created_at)} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>
      <View style={{ marginVertical: 10 }}>{template}</View>
      <View style={{ alignItems: 'flex-start' }}>
        <SunButton
          active={postInfo.liked}
          sunNumber={postInfo.num_sunshines}
          onPress={() => onPressSun(postInfo)}
        />
      </View>
    </button.BigListButton>
  );
}
