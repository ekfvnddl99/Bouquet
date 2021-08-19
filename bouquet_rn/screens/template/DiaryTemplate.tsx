import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

import LineButton from '../components/LineButton';

import PlaySvg from '../../assets/Play';
import PlayFocusSvg from '../../assets/PlayFocus';
import WriteSvg from '../../assets/Write';
import XSvg from '../../assets/X';
import GallerySvg from '../../assets/Gallery';

import * as Post from '../logics/Post';

type DiaryInfo = {
  title: string;
  year: number;
  month: number;
  day: number;
  weather: string;
  imageUrl: string;
  content: string;
}

type DiaryProps = {
  isMini: boolean;
  isEditMode?: boolean;
  diary: DiaryInfo;
  setPost?: React.Dispatch< React.SetStateAction<Post.AllPostRequestType> >;
}

const TopWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8;
  border-bottom-width: 1;
  border-bottom-color: ${colors.diary};
`;

const DateWrap = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SmallInput = styled.TextInput`
  font-weight: normal;
  font-size: 14;
  text-align-vertical: top;
  padding-top: 0;
  padding-bottom: 0;
  padding-horizontal: 4;
  border-radius: 4;
  background-color: ${colors.gray1};
`;

const ContentWrap = styled.View`
  margin-top: 16;
`;

const MainImage = styled.Image<{ isMini: boolean }>`
  margin-top: 16;
  border-radius: 5;
  height: ${props => props.isMini ? 150 : 180};
  width: 100%;
`;

const MainBlankPic = styled.TouchableOpacity`
  background-color: ${colors.gray0};
  border-radius: 5;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180;
  margin-top: 16;
`;

const ContentTextWrap = styled.View`
  margin-top: 16;
`;

const LineBackground = styled.View`
  position: absolute;
  width: 100%;
  z-index: 0;
`;

const Line = styled.View`
  height: 20;
  border-bottom-width: 1;
  border-bottom-color: ${colors.diary};
`;

function Diary({ isMini, isEditMode, diary, setPost }: DiaryProps) {
  const [contentHeight, setContentHeight] = useState(20);
  const [tmpPost, setTmpPost] = useState<Post.DiaryPostRequestInterface>({
    characterId: -1,
    template: "Diary",
    text: undefined,
    title: "",
    weather: "",
    img: "",
    date: 10000000,
    content: "",
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const changePost = (toChange: Post.DiaryPostRequestInterface) => {
    if (isEditMode && setPost) {
      setTmpPost(toChange);
      setPost(toChange);
    }
  }

  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      changePost({
        ...tmpPost,
        img: result.uri
      });
    }
  }

  return (
    <area.NoHeightArea
      marBottom={0}
      paddingH={15}
      paddingV={15}
    >
      <TopWrap>
        <DateWrap>
          {isEditMode ?
          <SmallInput
            placeholder="연도"
            placeholderTextColor={colors.gray5}
            value={String(tmpPost.date).slice(0, 4)}
            onChangeText={(text: string) => changePost({
              ...tmpPost,
              date: Number(text + String(tmpPost.date).slice(2, 8))
            })}
          />
          :
          <text.DiaryBody2R color={colors.diary}>{diary.year}</text.DiaryBody2R>
          }
          <text.DiaryBody2R color={colors.diary} style={{ marginHorizontal: 4 }}>년</text.DiaryBody2R>
          {isEditMode ?
          <SmallInput
            placeholder="월"
            placeholderTextColor={colors.gray5}
            value={String(tmpPost.date).slice(4, 6)}
            onChangeText={(text: string) => changePost({
              ...tmpPost,
              date: Number(String(tmpPost.date).slice(0, 2) + text + String(tmpPost.date).slice(4, 8))
            })}
          />
          :
          <text.DiaryBody2R color={colors.diary}>{diary.month}</text.DiaryBody2R>
          }
          <text.DiaryBody2R color={colors.diary} style={{ marginHorizontal: 4 }}>월</text.DiaryBody2R>
          {isEditMode ?
          <SmallInput
            placeholder="일"
            placeholderTextColor={colors.gray5}
            value={String(tmpPost.date).slice(6, 8)}
            onChangeText={(text: string) => changePost({
              ...tmpPost,
              date: Number(String(tmpPost.date).slice(0, 6) + text)
            })}
          />
          :
          <text.DiaryBody2R color={colors.diary}>{diary.day}</text.DiaryBody2R>
          }
          <text.DiaryBody2R color={colors.diary} style={{ marginHorizontal: 4 }}>일</text.DiaryBody2R>
        </DateWrap>
        {isEditMode ?
        <SmallInput
          placeholder="날씨"
          placeholderTextColor={colors.gray5}
          value={tmpPost.weather}
          onChangeText={(text: string) => changePost({
            ...tmpPost,
            weather: text
          })}
        />
        :
        <text.DiaryBody2R color={colors.diary}>{diary.weather}</text.DiaryBody2R>
        }
      </TopWrap>
      <ContentWrap>
        {isEditMode ?
        <TextInput
          placeholder="일기 제목"
          style={{
            flex: 1,
            fontWeight: '600',
            fontSize: 16,
            textAlignVertical: 'top',
            paddingTop: 0,
            paddingBottom: 0,
            color: colors.diary,
          }}
          multiline={true}
          value={tmpPost.title}
          onChangeText={(text: string) => changePost({
            ...tmpPost,
            title: text
          })}
        />
        :
        <text.DiarySubtitle3 color={colors.diary}>{diary.title}</text.DiarySubtitle3>
        }
        {isEditMode ?

        tmpPost.img ?
        <TouchableOpacity onPress={changeImage}>
          <MainImage
            isMini={isMini}
            source={{ uri: tmpPost.img }}
          />
        </TouchableOpacity>
        
        :
        <MainBlankPic onPress={changeImage}>
          <GallerySvg
            w="24"
            h="24"
          />
        </MainBlankPic>

        :
        <MainImage
          isMini={isMini}
          source={require('../../assets/img.jpg')}
        />
        }
        <ContentTextWrap>
          {isEditMode ?
          <TextInput
            placeholder="일기를 입력해 보세요."
            style={{
              flex: 1,
              fontWeight: 'normal',
              fontSize: 14,
              textAlignVertical: 'top',
              paddingTop: 0,
              paddingBottom: 0,
              lineHeight: 20,
              zIndex: 1,
            }}
            multiline={true}
            onLayout={onLayout}
            value={tmpPost.content}
            onChangeText={(text: string) => changePost({
              ...tmpPost,
              content: text
            })}
          />
          :
          <text.DiaryBody2R
            color={colors.black}
            style={{ lineHeight: 20, zIndex: 1 }}
            onLayout={onLayout}
            numberOfLines={isMini ? 3 : undefined}
          >
            {diary.content}
          </text.DiaryBody2R>
          }
          <LineBackground>
            {[...Array(Math.round(contentHeight / 20))].map((n, idx) => (
              <Line key={idx} />
            ))}
          </LineBackground>
        </ContentTextWrap>
      </ContentWrap>
    </area.NoHeightArea>
  )
}

type TemplateProps = {
  mode: string;
  setPost?: React.Dispatch< React.SetStateAction<Post.AllPostRequestType> >;
  post?: Post.PostInterface<any>;
}

export default function DiaryTemplate({ mode, setPost, post }: TemplateProps) {
  const diaryData = {
    title: post ? post.template.title : '',
    year: post ? Number(String(post.template.date).slice(0, 4)) : 1000,
    month: post ? Number(String(post.template.date).slice(4, 6)) : 10,
    day: post ? Number(String(post.template.date).slice(6, 8)) : 10,
    weather: post ? post.template.weather : '',
    imageUrl: post ? post.template.img : '',
    content: post ? post.template.content : '',
  };

  switch (mode) {
    case 'mini':
      return (
        <Diary isMini={true} isEditMode={false}
          diary={diaryData}
          setPost={setPost}
        />
      );
    case 'detail':
      return (
        <area.NoHeightArea
          marBottom={12}
          paddingH={10}
          paddingV={10}
        >
          <Diary isMini={false} isEditMode={false}
            diary={diaryData}
            setPost={setPost}
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
          <Diary isMini={false} isEditMode={true}
            diary={diaryData}
            setPost={setPost}
          />
        </area.NoHeightArea>
      );
    default:
      return (
        <Diary isMini={true} isEditMode={false}
          diary={diaryData}
          setPost={setPost}
        />
      );
  }
}