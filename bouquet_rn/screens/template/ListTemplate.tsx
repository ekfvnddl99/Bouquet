import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

import LineButton from '../components/LineButton';

import XSvg from '../../assets/X';
import GallerySvg from '../../assets/Gallery';

import * as Post from '../logics/Post';

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
  list: Array<{title: string; content: string; img: string;}>;
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
                  source={{ uri: content.img }}
                />
                <ContentTextWrap>
                  {isMini ?
                  <text.Body2R color={colors.black}>{content.title}</text.Body2R>
                  :
                  <>
                    <text.Body2B color={colors.black}>{content.title}</text.Body2B>
                    <text.Caption color={colors.gray6} style={{ marginTop: 4 }}>{content.content}</text.Caption>
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
  post?: Post.PostInterface<any>;
}

export default function ListTemplate({ mode, post }: TemplateProps) {
  switch (mode) {
    case 'mini':
      return (
        <List isMini={true} isEditMode={false}
          title={post ? post.template.title : ''}
          description={post ? post.template.content : ''}
          list={post ? post.template.components : []}
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
            title={post ? post.template.title : ''}
            description={post ? post.template.content : ''}
            list={post ? post.template.components : []}
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
            title={post ? post.template.title : ''}
            description={post ? post.template.content : ''}
            list={post ? post.template.components : []}
          />
        </area.NoHeightArea>
      );
    default:
      return (
        <List isMini={true} isEditMode={false}
          title={post ? post.template.title : ''}
          description={post ? post.template.content : ''}
          list={post ? post.template.components : []}
        />
      );
  }
}