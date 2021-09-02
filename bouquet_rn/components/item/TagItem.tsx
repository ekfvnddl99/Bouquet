import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as type from '../type';

// icons
import Icon from '../../assets/Icon';

type TagItemProps = {
  content: string;
  tagArray: string[];
  tagIndex: number;
  isActive: boolean;
  isModifying: boolean;
  isSearching: boolean;
  setTagArray?: Function;
  setSearch?: Function;
};
export default function TagItem({
  content,
  tagIndex,
  tagArray,
  isActive,
  isModifying,
  isSearching,
  setTagArray,
  setSearch,
}: TagItemProps): React.ReactElement {
  function deleteTag() {
    const tmp = [...tagArray];
    tmp.splice(tagIndex, 1);
    setTagArray(tmp);
  }

  return (
    <>
      {isModifying ? (
        <button.TagModifyButton
          backgroundColor={isSearching ? colors.white : colors.alpha10_primary}
          activeOpacity={1}
          onPress={() => {
            isSearching ? setSearch(content) : {};
          }}
        >
          <text.Caption
            color={isSearching ? colors.black : colors.primary}
            style={{ flexShrink: 1 }}
          >
            {content}
          </text.Caption>
          <TouchableOpacity onPress={() => deleteTag} style={{ flexGrow: 1 }}>
            {isSearching ? (
              <Icon icon="x" size={25} />
            ) : (
              <Icon icon="xFocus" size={25} />
            )}
          </TouchableOpacity>
        </button.TagModifyButton>
      ) : (
        <elses.Tag
          backgroundColor={isActive ? colors.alpha10_primary : colors.gray2}
        >
          <text.Body3 color={isActive ? colors.primary : colors.gray6}>
            {content}
          </text.Body3>
        </elses.Tag>
      )}
    </>
  );
}
