import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

import LineButton from '../components/LineButton';

import XSvg from '../../assets/X';
import GallerySvg from '../../assets/Gallery';

const MainPic = styled.Image<{ isMini: boolean }>`
  height: ${props => props.isMini ? 150 : 180};
  border-radius: 5;
  width: 100%;
  margin-bottom: ${props => props.isMini ? 20 : 5};
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
  width: ${props => props.isMini ? 30 : 50};
  height: ${props => props.isMini ? 30 : 50};
  border-radius: 5;
`;

const ContentTextWrap = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 12;
  justify-content: center;
`;

type ListProps = {
  isMini: boolean;
  isEditMode?: boolean;
  title: string;
  description: string;
  list: Array<{title: string; description: string; imageUrl: string;}>;
}

function List({ isMini, isEditMode, title, description, list }: ListProps) {
  const [listState, setListState] = useState(list);
  useEffect(() => {
    if (isMini && (list.length > 3)) {
      setListState(list.slice(0, 3));
    }
  }, [isMini, list, setListState]);

  return (
    <>
      {isMini ? null :
      <>
        {isEditMode ?
        <MainBlankPic>
          <GallerySvg
            w="24"
            h="24"
          />
        </MainBlankPic>
        :
        <MainPic isMini={isMini} source={require('../../assets/img.jpg')} />
        }
        
      </>
      }
      <area.NoHeightArea
        marBottom={0}
        paddingH={15}
        paddingV={15}
      >
        {isMini ? 
        <MainPic isMini={isMini} source={require('../../assets/img.jpg')} />
        : null
        }
        {isMini ?
        <text.Subtitle3 color={colors.black}>{title}</text.Subtitle3>
        :
        <>
          {isEditMode ?
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
              multiline={true}
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
              multiline={true}
            />
          </>
          :
          <>
            <text.Subtitle2B color={colors.black}>{title}</text.Subtitle2B>
            <text.Caption color={colors.gray6} style={{ marginTop: 16 }}>{description}</text.Caption>
          </>
          }
        </>
        }
        
        <ListWrap>
          {isEditMode ?
          <>
            <ContentWrap>
              <ContentBlankPic>
                <GallerySvg
                  w="24"
                  h="24"
                />
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
                  multiline={true}
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
                  multiline={true}
                />
              </ContentTextWrap>
              <XSvg w="24" h="24" />
            </ContentWrap>
            <View style={{alignItems:'flex-start', marginTop: 10}}>
              <LineButton
                press={()=>{}}
                content="추가"
                color={colors.black}
                incolor="transparent"
                outcolor="transparent"
              />
            </View>
          </>
          :
          <>
            {listState.map((content, idx) => (
              <ContentWrap key={idx}>
                <ContentPic
                  isMini={isMini}
                  source={require('../../assets/img.jpg')}
                />
                <ContentTextWrap>
                  {isMini ?
                  <text.Body2R color={colors.black}>{content.title}</text.Body2R>
                  :
                  <>
                    <text.Body2B color={colors.black}>{content.title}</text.Body2B>
                    <text.Caption color={colors.gray6} style={{ marginTop: 4 }}>{content.description}</text.Caption>
                  </>
                  }
                  
                </ContentTextWrap>
              </ContentWrap>
            ))}
          </>
          }
          
        </ListWrap>
      </area.NoHeightArea>
    </>
  )
}

type TemplateProps = {
  mode: string;
}

export default function ListTemplate({ mode }: TemplateProps) {
  const list = [
    {
      title: "아침 : 궁중떡볶이",
      description: "아침에는 대접받는 기분으로 궁중떡볶이를 먹는다. 다이어트는 기분이 중요하다. 이 생각에 반대하고 싶다면 우선 나보다 약한 자가 아니어야 할 거다.",
      imageUrl: '../../assets/img.jpg'
    },
    {
      title: "점심 : 분식떡볶이",
      description: "역시 떡볶이는 분식이 근본이다. 점심에는 근본을 영접한다.",
      imageUrl: '../../assets/img.jpg'
    },
    {
      title: "저녁 : 국물떡볶이",
      description: "저녁에는 국물떡볶이에 밥을 비벼먹는다. 다이어트는 조금 먹어야 하는 게 아니다.",
      imageUrl: '../../assets/img.jpg'
    },
  ]

  switch (mode) {
    case 'mini':
      return (
        <List isMini={true} isEditMode={false}
          title="현지의 떡볶이 다이어트 1일차"
          description="떡볶이로도 다이어트가 된다? 당연하다. 아니라고 생각한다면 나보다 강해져서 와라. 오늘의 떡볶이 다이어트 식단이다."
          list={list}
        />
      );
    case 'detail':
      return (
        <area.NoHeightArea
          marBottom={12}
          paddingH={10}
          paddingV={10}
        >
          <List isMini={false} isEditMode={false}
            title="현지의 떡볶이 다이어트 1일차"
            description="떡볶이로도 다이어트가 된다? 당연하다. 아니라고 생각한다면 나보다 강해져서 와라. 오늘의 떡볶이 다이어트 식단이다."
            list={list}
          />
        </area.NoHeightArea>
      );
    case 'edit':
      return (
        <area.NoHeightArea
          marBottom={12}
          paddingH={10}
          paddingV={10}
        >
          <List isMini={false} isEditMode={true}
            title="현지의 떡볶이 다이어트 1일차"
            description="떡볶이로도 다이어트가 된다? 당연하다. 아니라고 생각한다면 나보다 강해져서 와라. 오늘의 떡볶이 다이어트 식단이다."
            list={list}
          />
        </area.NoHeightArea>
      );
    default:
      return (
        <List isMini={true} isEditMode={false}
          title="현지의 떡볶이 다이어트 1일차"
          description="떡볶이로도 다이어트가 된다? 당연하다. 아니라고 생각한다면 나보다 강해져서 와라. 오늘의 떡볶이 다이어트 식단이다."
          list={list}
        />
      );
  }
}