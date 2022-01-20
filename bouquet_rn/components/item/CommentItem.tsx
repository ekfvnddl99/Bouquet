import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import * as Analytics from 'expo-firebase-analytics';

// assets
import Svg from '../../assets/Icon';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import useCharacter from '../../logics/hooks/useCharacter';
import useViewPost from '../../logics/hooks/useViewPost';
import * as cal from '../../logics/non-server/Calculation';
import {
  likeCommentAsync,
  reportCommentAsync,
  translateSentenceAsync,
  recognizeLanguageAsync,
} from '../../logics/server/Post';
import useUser from '../../logics/hooks/useUser';
import {
  blockCharacterAsync,
  getCharacterAsync,
} from '../../logics/server/Character';
import { blockUserAsync } from '../../logics/server/User';

// utils
import { PostComment } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../button/ProfileButton';
import HalfModal from '../view/HalfModal';

type CommentItemProps = {
  commentInfo: PostComment;
  setTargetComment: (param: string) => void;
  setTargetCommentId: (param: number) => void;
  routePrefix: string;
  deleteComment: (param: number) => void;
  openingCommentArray?: number[];
  setOpeningCommentArray?: (param: number[]) => void;
};
/**
 * 댓글 컴포넌트
 * TODO 댓글 삭제 함수
 * TODO 햇살 set 함수
 *
 * @param commentInfo 댓글 객체. 서버에서 불러온다.
 * @param setTargetComment 대댓글 대상이 되는 댓글의 set 함수
 * @param setTargetCommentId 대댓글 대상이 되는 댓글의 아이디 set 함수
 * * 대댓글에 대댓글을 달 경우, 대상이 되는 대댓글을 담은 댓글의 아이디가 들어간다.
 * @param onDelete 댓글 삭제 함수
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 * ---------------
 * @param openingCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열
 * @param setOpeningCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열의 set 함수
 */
export default function CommentItem({
  commentInfo,
  setTargetComment,
  setTargetCommentId,
  routePrefix,
  deleteComment,
  openingCommentArray,
  setOpeningCommentArray,
}: CommentItemProps): React.ReactElement {
  const user = useUser();
  const [myCharacter] = useCharacter();
  const [viewPost, setViewPost] = useViewPost();
  const [isActive, setIsActive] = useState(commentInfo.liked);
  const [sunshineNum, setSunshineNum] = useState(commentInfo.num_sunshines);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState(commentInfo.comment);
  const [languageCode, setLanguageCode] = useState('ko');

  const [loading, setLoading] = useState(false);
  async function likeComment() {
    if (myCharacter.name === '') {
      alert('캐릭터를 설정해주세요!');
      return;
    }

    if (loading) return;
    setLoading(true);

    const prevSunNum = sunshineNum;
    const newState = !isActive;
    setIsActive(newState);
    if (newState) setSunshineNum(prevSunNum + 1);
    else setSunshineNum(prevSunNum - 1);

    const serverResult = await likeCommentAsync(commentInfo.id);
    if (serverResult.isSuccess) {
      const realState = serverResult.result;
      setIsActive(realState);
      await Analytics.logEvent(
        realState ? 'like_comment' : 'cancel_like_comment',
      );
    } else {
      setIsActive(!newState);
      alert(serverResult.result.errorMsg);
    }
    setLoading(false);
  }

  async function recognizeComment() {
    const serverResult = await recognizeLanguageAsync(commentInfo.comment);
    if (serverResult.isSuccess) {
      setLanguageCode(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }

  async function translateComment() {
    const serverResult = await translateSentenceAsync(
      languageCode,
      commentInfo.comment,
    );
    if (serverResult.isSuccess) {
      setComment(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  useEffect(() => {
    recognizeComment();
  }, []);

  async function reportComment() {
    const serverResult = await reportCommentAsync(commentInfo.id);
    if (serverResult.isSuccess) {
      alert('신고가 접수되었습니다.');
    } else alert(serverResult.result.errorMsg);
  }

  const blockSomeone = async (what: string) => {
    const characterResult = await getCharacterAsync(
      commentInfo.character_info.name,
    );
    if (!characterResult.isSuccess) {
      alert(characterResult.result.errorMsg);
      return;
    }
    const characterInfo = characterResult.result;
    let serverResult;
    if (what === 'user') {
      serverResult = await blockUserAsync(characterInfo.user_info.name);
    } else serverResult = await blockCharacterAsync(characterInfo.name);
    if (serverResult.isSuccess) {
      await Analytics.logEvent(
        what === 'user' ? 'block_user' : 'block_character',
        what === 'user'
          ? {
              blocked_user: characterInfo.user_info.name,
            }
          : {
              blocked_character: characterInfo.name,
            },
      );
      alert('차단되었습니다.');
      // 새로고침을 위하여
      setViewPost(viewPost.id);
    } else alert(serverResult.result.errorMsg);
  };

  const elementArray = [
    { name: '신고', function: () => reportComment(), isShow: true },
    { name: '계정 차단', function: () => blockSomeone('user'), isShow: true },
    {
      name: '캐릭터 차단',
      function: () => blockSomeone('character'),
      isShow: true,
    },
    {
      name: '삭제',
      function: () => deleteComment(commentInfo.id),
      isShow: myCharacter.name === commentInfo.character_info.name,
    },
  ];

  return (
    <area.NoHeightArea
      marBottom={8}
      paddingH={16}
      paddingV={12}
      style={{ backgroundColor: colors.white }}
    >
      <HalfModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        elementArray={elementArray}
      />
      <area.RowArea style={{ alignItems: 'flex-start', marginBottom: 3 }}>
        <View style={{ flex: 2 }}>
          <text.Body2R textColor={colors.black}>{comment}</text.Body2R>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <text.Caption textColor={colors.gray5}>
            {cal.timeName(commentInfo.created_at)} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>

      {languageCode !== 'ko' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => translateComment()}
          style={{ marginBottom: 3 }}
        >
          <text.Body2R textColor={colors.gray5}>번역하기</text.Body2R>
        </TouchableOpacity>
      ) : null}

      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          isJustImg={false}
          isPress
          name={commentInfo.character_info.name}
          profileImg={commentInfo.character_info.profile_img}
          routePrefix={routePrefix}
        />
        <View style={{ flex: 1 }} />
        <area.RowArea>
          {user.name !== '' ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(true)}
            >
              <Svg icon="moreOption" size={25} />
            </TouchableOpacity>
          ) : null}

          {commentInfo.parent === 0 &&
          commentInfo.children.length > 0 &&
          openingCommentArray &&
          setOpeningCommentArray ? (
            <View style={{ marginLeft: 8 }}>
              {openingCommentArray.includes(commentInfo.id) ? (
                <TouchableOpacity
                  onPress={() =>
                    setOpeningCommentArray(
                      openingCommentArray.filter(
                        (item) => item !== commentInfo.id,
                      ),
                    )
                  }
                >
                  <Svg icon="commentUpArrow" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setOpeningCommentArray([
                      ...openingCommentArray,
                      commentInfo.id,
                    ])
                  }
                >
                  <Svg icon="commentDownArrow" size={18} />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => [
              setTargetCommentId(
                commentInfo.parent === 0 ? commentInfo.id : commentInfo.parent,
              ),
              setTargetComment(commentInfo.comment),
            ]}
            style={{ marginLeft: 8 }}
          >
            <Svg icon="comment" size={18} />
          </TouchableOpacity>

          <area.RowArea style={{ marginLeft: 8 }}>
            <TouchableOpacity onPress={() => likeComment()}>
              {isActive ? (
                <Svg icon="sunFocusPrimary" size={18} />
              ) : (
                <Svg icon="sun" size={18} />
              )}
            </TouchableOpacity>
            <text.Body3 textColor={colors.primary} style={{ marginLeft: 4 }}>
              {cal.numName(sunshineNum)}
            </text.Body3>
          </area.RowArea>
        </area.RowArea>
      </area.RowArea>
    </area.NoHeightArea>
  );
}
