import React from 'react';
import { View, FlatList } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

// components
import PostItem from '../../../components/item/PostItem';

type ProfileFeedViewProps = {
  postArray: Post<AllTemplates>[] | undefined;
  routePrefix: string;
};
export default function ProfileFeedView({
  postArray,
  routePrefix,
}: ProfileFeedViewProps): React.ReactElement {
  return (
    <View style={{ marginTop: 16 }}>
      <area.RowArea style={{ marginBottom: 12 }}>
        <text.Body2R textColor={colors.black}>{i18n.t('총')} </text.Body2R>
        <text.Body2B textColor={colors.black}>
          {postArray ? postArray.length : 0}
        </text.Body2B>
        <text.Body2R textColor={colors.black}>{i18n.t('개')}</text.Body2R>
      </area.RowArea>

      <FlatList
        data={postArray}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(obj) => (
          <PostItem postInfo={obj.item} routePrefix={routePrefix} />
        )}
      />
    </View>
  );
}
