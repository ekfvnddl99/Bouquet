import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// logics
import * as cal from '../../logics/non-server/Calculation';
import { viewPostState } from '../../logics/atoms';

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
};
/**
 * 피드에 보이는 게시글 컴포넌트
 * TODO 햇살 set 함수
 *
 * @param postInfo 게시글 객체
 */
export default function PostItem({
  postInfo,
}: PostItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  /**
   * '상세 게시글' 화면으로 이동하는 함수
   */
  function goPostStack() {
    setViewPost(postInfo);
    navigation.navigate('PostStack');
  }

  /**
   * 해당 게시글의 template과 그에 맞는 내용들을 가져오는 함수
   */
  const getTemplate = useCallback(() => {
    if (postInfo) {
      switch (postInfo.template.type) {
        case 'None':
          return <TextTemplate mode="mini" post={postInfo.text} />;
        case 'Image':
          return <ImageTemplate mode="mini" post={postInfo.template} />;
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
  }, [postInfo]);
  // 위의 함수 getTemplate에서 가져온 template 객체
  const template = useMemo(() => getTemplate(), [getTemplate]);

  return (
    <button.BigListButton
      backgroundColor={colors.white}
      paddingH={10}
      paddingV={10}
      onPress={() => goPostStack}
      activeOpacity={1}
    >
      <area.RowArea>
        <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row' }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            name={postInfo ? postInfo.character_info.name : ''}
            img={postInfo ? postInfo.character_info.profile_img : ''}
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
          active={postInfo ? postInfo.liked : false}
          sunNum={postInfo ? postInfo.num_sunshines : 0}
          setSunNum={() => undefined}
        />
      </View>
    </button.BigListButton>
  );
}
