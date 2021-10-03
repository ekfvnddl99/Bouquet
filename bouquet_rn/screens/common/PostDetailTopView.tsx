import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// utils
import { Post, AllTemplates } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../../components/button/ProfileButton';
import SunButton from '../../components/button/SunButton';
import LineButton from '../../components/button/LineButton';

// templates
import TextTemplate from '../template/TextTemplate';

type PostDetailTopViewProps = {
  viewPost: Post<AllTemplates>;
  routePrefix: string;
  postOwner: boolean;
  template: true | JSX.Element | null;
  onDelete: () => void;
};
/**
 * TODO 댓글 삭제
 * TODO 햇님 누르기
 * @returns
 */
export default function PostDetailTopView({
  viewPost,
  routePrefix,
  postOwner,
  template,
  onDelete,
}: PostDetailTopViewProps): React.ReactElement {
  return (
    <View>
      <View style={{ paddingTop: 20 }} />

      <area.RowArea>
        <View style={{ flex: 1 }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            isJustImg={false}
            isPress
            name={viewPost?.character_info.name}
            profileImg={viewPost?.character_info.profile_img}
            routePrefix={routePrefix}
          />
        </View>
        {postOwner ? (
          <area.RowArea style={{ paddingRight: 1 }}>
            <LineButton
              onPress={() => {
                /**/
              }}
              content={i18n.t('수정')}
              borderColor={colors.black}
            />
            <View style={{ marginRight: 4 }} />
            <LineButton
              onPress={() => onDelete()}
              content={i18n.t('삭제')}
              borderColor={colors.warning_red}
            />
          </area.RowArea>
        ) : null}
      </area.RowArea>
      <View style={{ marginBottom: 12 }} />
      {template}
      {viewPost?.template && viewPost.text ? (
        <TextTemplate mode="detail" post={viewPost.text} />
      ) : null}
      <View style={{ alignItems: 'flex-start' }}>
        <SunButton
          sunNum={viewPost?.num_sunshines}
          active={viewPost?.liked}
          postId={viewPost.id}
        />
      </View>
      <text.Subtitle3 textColor={colors.black} style={{ marginTop: 36 }}>
        {i18n.t('반응')}
      </text.Subtitle3>

      <View style={{ paddingTop: 12 }} />
    </View>
  );
}
