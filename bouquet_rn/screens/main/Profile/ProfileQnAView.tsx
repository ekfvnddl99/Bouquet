import React from 'react';
import { View, FlatList } from 'react-native';
import i18n from 'i18n-js';
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// components
import QnAItem from '../../../components/item/QnAItem';

// utils
import { noCharacter } from '../../../utils/types/UserTypes';

export default function ProfileQnAScreen(): React.ReactElement {
  // dummy data - 서버에서 불러와야 함
  const data = [
    { id: 1, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
    { id: 2, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
    { id: 3, question: 'asdf', answer: 'asdfasdf', characterInfo: noCharacter },
  ];

  return (
    <View style={{ marginTop: 16 }}>
      <area.RowArea style={{ marginBottom: 12 }}>
        <text.Body2R textColor={colors.black}>{i18n.t('총')} </text.Body2R>
        <text.Body2B textColor={colors.black}>{data.length}</text.Body2B>
        <text.Body2R textColor={colors.black}>{i18n.t('개')}</text.Body2R>
      </area.RowArea>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(obj) => (
          <QnAItem
            question={obj.item.question}
            answer={obj.item.answer}
            characterInfo={obj.item.characterInfo}
          />
        )}
      />
    </View>
  );
}
