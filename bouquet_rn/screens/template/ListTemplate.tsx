import React, { useMemo } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

import LineButton from '../../components/button/LineButton';

import Icon from '../../assets/Icon';

import { ListTemplate } from '../../utils/types/PostTypes';

/* eslint-disable global-require */

type ListProps = {
  isMini: boolean;
  isEditMode?: boolean;
  postInfo: ListTemplate;
};

function List({ isMini, isEditMode, postInfo }: ListProps) {
  const realList = useMemo(
    () => (isMini ? postInfo.components.slice(0, 3) : postInfo.components),
    [isMini, postInfo],
  );

  return (
    <>
      {isMini ? null : (
        <>
          {isEditMode ? (
            <MainBlankPic>
              <Icon icon="gallery" size={24} />
            </MainBlankPic>
          ) : (
            <MainPic
              isMini={isMini}
              source={
                postInfo.img
                  ? { uri: postInfo.img }
                  : require('../../assets/img.jpg')
              }
            />
          )}
        </>
      )}
      <area.NoHeightArea marBottom={0} paddingH={15} paddingV={15}>
        {isMini ? (
          <MainPic
            isMini={isMini}
            source={
              postInfo.img
                ? { uri: postInfo.img }
                : require('../../assets/img.jpg')
            }
          />
        ) : null}
        {isMini ? (
          <text.Subtitle3 textColor={colors.black}>
            {postInfo.title}
          </text.Subtitle3>
        ) : (
          <>
            {isEditMode ? (
              <>
                <TextInput
                  placeholder="목록 제목 (필수)"
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlignVertical: 'top',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  multiline
                />
                <TextInput
                  placeholder="목록 설명을 입력해 주세요."
                  style={{
                    flex: 1,
                    fontWeight: 'normal',
                    fontSize: 12,
                    textAlignVertical: 'top',
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 16,
                  }}
                  multiline
                />
              </>
            ) : (
              <>
                <text.Subtitle2B textColor={colors.black}>
                  {postInfo.title}
                </text.Subtitle2B>
                <text.Caption
                  textColor={colors.gray6}
                  style={{ marginTop: 16 }}
                >
                  {postInfo.content}
                </text.Caption>
              </>
            )}
          </>
        )}

        <ListWrap>
          {isEditMode ? (
            <>
              <ContentWrap>
                <ContentBlankPic>
                  <Icon icon="gallery" size={24} />
                </ContentBlankPic>
                <ContentTextWrap>
                  <TextInput
                    placeholder="요소 제목 (필수)"
                    style={{
                      flex: 1,
                      fontWeight: '600',
                      fontSize: 14,
                      textAlignVertical: 'top',
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    multiline
                  />
                  <TextInput
                    placeholder="요소 설명을 입력해 주세요."
                    style={{
                      flex: 1,
                      fontWeight: 'normal',
                      fontSize: 12,
                      textAlignVertical: 'top',
                      paddingTop: 0,
                      paddingBottom: 0,
                      marginTop: 4,
                    }}
                    multiline
                  />
                </ContentTextWrap>
                <Icon icon="x" size={24} />
              </ContentWrap>
              <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
                <LineButton content="추가" borderColor={colors.black} />
              </View>
            </>
          ) : (
            <>
              {realList.map((content, idx) => (
                <ContentWrap key={idx}>
                  <ContentPic
                    isMini={isMini}
                    source={
                      content.img === ''
                        ? require('../../assets/img.jpg')
                        : { uri: content.img }
                    }
                  />
                  <ContentTextWrap>
                    {isMini ? (
                      <text.Body2R textColor={colors.black}>
                        {content.title}
                      </text.Body2R>
                    ) : (
                      <>
                        <text.Body2B textColor={colors.black}>
                          {content.title}
                        </text.Body2B>
                        <text.Caption
                          textColor={colors.gray6}
                          style={{ marginTop: 4 }}
                        >
                          {content.content}
                        </text.Caption>
                      </>
                    )}
                  </ContentTextWrap>
                </ContentWrap>
              ))}
            </>
          )}
        </ListWrap>
      </area.NoHeightArea>
    </>
  );
}

const MainPic = styled.Image<{ isMini: boolean }>`
  height: ${(props) => (props.isMini ? 150 : 180)};
  border-radius: 5;
  width: 100%;
  margin-bottom: ${(props) => (props.isMini ? 20 : 5)};
`;

const MainBlankPic = styled.View`
  background-color: ${colors.gray0};
  border-radius: 5;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180;
`;

const ListWrap = styled.View`
  flex-direction: column;
`;

const ContentBlankPic = styled.View`
  background-color: ${colors.gray0};
  border-radius: 5;
  justify-content: center;
  align-items: center;
  width: 50;
  height: 50;
`;

const ContentWrap = styled.View`
  flex-direction: row;
  margin-top: 16;
  flex: 1;
`;

const ContentPic = styled.Image<{ isMini: boolean }>`
  width: ${(props) => (props.isMini ? 30 : 50)};
  height: ${(props) => (props.isMini ? 30 : 50)};
  border-radius: 5;
`;

const ContentTextWrap = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 12;
  justify-content: center;
`;

type TemplateProps = {
  mode: string;
  post?: ListTemplate;
};

export default function ListTemplate({
  mode,
  post,
}: TemplateProps): React.ReactElement {
  const exampleTemplate: ListTemplate = {
    type: 'List',
    title: '현지의 떡볶이 다이어트 1일차',
    content:
      '떡볶이로도 다이어트가 된다? 당연하다. 아니라고 생각한다면 나보다 강해져서 와라. 오늘의 떡볶이 다이어트 식단이다.',
    components: [
      {
        title: '아침 : 궁중떡볶이',
        content:
          '아침에는 대접받는 기분으로 궁중떡볶이를 먹는다. 다이어트는 기분이 중요하다. 이 생각에 반대하고 싶다면 우선 나보다 약한 자가 아니어야 할 거다.',
        img: '',
      },
      {
        title: '점심 : 분식떡볶이',
        content: '역시 떡볶이는 분식이 근본이다. 점심에는 근본을 영접한다.',
        img: '',
      },
      {
        title: '저녁 : 국물떡볶이',
        content:
          '저녁에는 국물떡볶이에 밥을 비벼먹는다. 다이어트는 조금 먹어야 하는 게 아니다.',
        img: '',
      },
    ],
    img: '',
  };
  switch (mode) {
    case 'ex':
      return (
        <List isMini={false} isEditMode={false} postInfo={exampleTemplate} />
      );
    case 'mini':
      return (
        <List isMini isEditMode={false} postInfo={post || exampleTemplate} />
      );
    case 'detail':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <List
            isMini={false}
            isEditMode={false}
            postInfo={post || exampleTemplate}
          />
        </area.NoHeightArea>
      );
    case 'edit':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <List isMini={false} isEditMode postInfo={post || exampleTemplate} />
        </area.NoHeightArea>
      );
    default:
      return (
        <List isMini isEditMode={false} postInfo={post || exampleTemplate} />
      );
  }
}
