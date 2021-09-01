import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

// styles
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import useCharacter from '../../logics/hooks/useCharacter';
import { Comment } from '../../logics/server/Post';

type CommInputProps = {
  selectId: number;
  value: string;
  onChange: Function;
  onUpload: Function;
  isChild: boolean;
  setParentComm?: Function;
  info?: Comment;
};

export default function CommentInputBar({
  selectId,
  value,
  onChange,
  onUpload,
  isChild,
  setParentComm,
  info,
}: CommInputProps): React.ReactElement {
  const [character, setCharacter] = useCharacter();
  return (
    <View>
      {isChild ? (
        <area.RowArea style={styles.commentUpper}>
          <Svg icon="commentInput" size={18} />
          <View style={{ flex: 1, marginHorizontal: 8 }}>
            <text.Body3 color={colors.gray6} numberOfLines={1}>
              {info ? info.comment : info}
            </text.Body3>
          </View>
          <TouchableOpacity
            onPress={setParentComm ? () => setParentComm() : undefined}
          >
            <Svg icon="roundX" size={18} />
          </TouchableOpacity>
        </area.RowArea>
      ) : null}
      <View style={styles.commentLower}>
        <View style={{ marginBottom: 3 }}>
          <elses.CircleImg
            diameter={30}
            source={{ uri: character.profileImg }}
          />
        </View>
        <TextInput
          placeholder="어떤 반응을 남기고 싶나요?"
          placeholderTextColor={colors.gray5}
          style={styles.commentInput}
          value={value}
          onChangeText={(input: string) => onChange(input)}
          multiline
        />
        <TouchableOpacity
          style={{ marginBottom: 3 }}
          onPress={() => onUpload(value)}
        >
          <Svg icon="send" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    backgroundColor: colors.gray0,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 12,
    minHeight: 33,
    paddingBottom: Platform.OS === 'ios' ? 8 : 0,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  commentLower: {
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  commentUpper: {
    backgroundColor: colors.gray1,
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
