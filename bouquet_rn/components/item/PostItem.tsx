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
import { Post } from '../../utils/types/PostTypes';

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
  info?: Post;
};
export default function PostItem({ info }: PostItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  function goPostStack() {
    if (info) {
      setViewPost(info);
      navigation.navigate('PostStack');
    }
  }

  const getTemplate = useCallback(() => {
    if (info) {
      switch (info.template.template) {
        case 'None':
          return <TextTemplate mode="mini" content={info.template.text} />;
        case 'Image':
          return <ImageTemplate mode="mini" post={info} />;
        case 'Diary':
          return <DiaryTemplate mode="mini" post={info} />;
        case 'Album':
          return <AlbumTemplate mode="mini" post={info} />;
        case 'List':
          return <ListTemplate mode="mini" post={info} />;
        default:
          return null;
      }
    } else return null;
  }, [info]);
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
            name={info ? info.characterName : ''}
            img={info ? info.characterImg : ''}
          />
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <text.Caption textColor={colors.gray5}>
            {cal.timeName(1)} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>
      <View style={{ marginVertical: 10 }}>{template}</View>
      <View style={{ alignItems: 'flex-start' }}>
        <SunButton
          active={info ? info.liked : false}
          sun={info ? info.numSunshines : 0}
        />
      </View>
    </button.BigListButton>
  );
}
