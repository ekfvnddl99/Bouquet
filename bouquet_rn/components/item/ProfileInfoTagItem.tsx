import React from 'react';
import { View } from 'react-native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import TagItem from './TagItem';

type ProfileInfoTagProps = {
  title: string;
  tags: string[];
};
export default function ProfileInfoTag({
  title,
  tags,
}: ProfileInfoTagProps): React.ReactElement {
  const list = tags.map((tag, index) => (
    <TagItem
      content={tag}
      tagIndex={index}
      tagArray={tags}
      isActive
      isModifying={false}
      isSearching={false}
    />
  ));
  return (
    <View>
      <text.Body2B color={colors.black}>{title}</text.Body2B>
      <area.RowArea>{list}</area.RowArea>
    </View>
  );
}
