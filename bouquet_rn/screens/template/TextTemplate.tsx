import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';

import {
  translateSentenceAsync,
  recognizeLanguageAsync,
} from '../../logics/server/Post';

function Text({
  post,
  isMini,
  isEditMode,
  setPost,
}: {
  post?: string;
  isMini: boolean;
  isEditMode?: boolean;
  setPost?: (newText: string) => void;
}) {
  const [postText, setPostText] = useState(post);
  const [languageCode, setLanguageCode] = useState('ko');

  async function recognizeText() {
    if (postText === undefined) return;
    const serverResult = await recognizeLanguageAsync(postText);
    if (serverResult.isSuccess) {
      setLanguageCode(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }

  async function translateText() {
    if (postText === undefined) return;
    const serverResult = await translateSentenceAsync(languageCode, postText);
    if (serverResult.isSuccess) {
      setPostText(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  useEffect(() => {
    if (!isEditMode) recognizeText();
  }, []);

  return (
    <area.NoHeightArea marBottom={isMini ? 0 : 12} paddingH={15} paddingV={15}>
      {isEditMode ? (
        <input.TextTemplate
          placeholder={I18n.t('내용을 입력해 주세요')}
          value={post}
          onChangeText={setPost ? (t) => setPost(t) : undefined}
          multiline
        />
      ) : (
        <text.Body2R textColor={colors.black}>{postText}</text.Body2R>
      )}
      {!isEditMode && !isMini && languageCode !== 'ko' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => translateText()}
          style={{ marginTop: 6 }}
        >
          <text.Body2R textColor={colors.gray5}>번역하기</text.Body2R>
        </TouchableOpacity>
      ) : null}
    </area.NoHeightArea>
  );
}

type TemplateProps = {
  mode: string;
  post: string;
  setPost?: (newText: string) => void;
};

export default function TextTemplateComp({
  mode,
  post,
  setPost,
}: TemplateProps): React.ReactElement {
  switch (mode) {
    case 'mini':
      return <Text post={post} isMini isEditMode={false} />;
    case 'detail':
      return <Text post={post} isMini={false} isEditMode={false} />;
    case 'ex':
      return (
        <Text post="아 오늘 떡볶이 땡긴다!" isMini={false} isEditMode={false} />
      );
    case 'edit':
      return <Text post={post} isMini={false} isEditMode setPost={setPost} />;
    default:
      return <Text post={post} isMini={false} isEditMode={false} />;
  }
}
