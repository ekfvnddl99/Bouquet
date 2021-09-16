import React from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileButton from '../button/ProfileButton';
import TagItem from './TagItem';

function Inner(isMini: boolean) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {isMini ? (
        <elses.RectangleImg
          width={90}
          height={117}
          source={require('../../assets/img.jpg')}
        />
      ) : (
        <elses.RectangleImg
          width={110}
          height={143}
          source={require('../../assets/img.jpg')}
        />
      )}
      <View style={{ marginLeft: 16 }}>
        <text.Subtitle3 textColor={colors.black}>
          EjrqhRdl wjswod
        </text.Subtitle3>
        <area.RowArea style={{ marginVertical: 8 }}>
          <TagItem content="크루참여" isActive />
          <TagItem content="전체공개" isActive />
        </area.RowArea>
        <ProfileButton diameter={30} isAccount={false} name="" img="" />
      </View>
    </View>
  );
}

type EpisodeItemProps = {
  color: string;
  isMini: boolean;
};
export default function EpisodeItem({
  color,
  isMini,
}: EpisodeItemProps): React.ReactElement {
  return (
    <View>
      {color === colors.white ? (
        <button.BigListButton
          backgroundColor={color}
          paddingH={16}
          paddingV={16}
        >
          {Inner(isMini)}
        </button.BigListButton>
      ) : (
        <View>{Inner(isMini)}</View>
      )}
    </View>
  );
}
