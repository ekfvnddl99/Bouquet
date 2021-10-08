import React, { useState } from 'react';
import {
  TextInput,
  LayoutChangeEvent,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

import Icon from '../../assets/Icon';

import { DiaryTemplate, AllTemplates } from '../../utils/types/PostTypes';

/* eslint-disable global-require */

const LINE_HEIGHT = Platform.OS === 'ios' ? 20 : 22;

type DiaryProps = {
  isMini: boolean;
  isEditMode?: boolean;
  diary: DiaryTemplate;
  setPost?: (template: DiaryTemplate) => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
};

function Diary({ isMini, isEditMode, diary, setPost, setImages }: DiaryProps) {
  const [contentHeight, setContentHeight] = useState(20);
  const [dateInfo, setDateInfo] = useState({
    year: isEditMode ? '' : String(Math.floor(Number(diary.date) / 10000)),
    month: isEditMode
      ? ''
      : String(Math.floor((Number(diary.date) % 10000) / 100)),
    day: isEditMode ? '' : String(Number(diary.date) % 100),
  });

  const setDate = (year?: string, month?: string, day?: string) => {
    if (
      (year !== undefined && !Number.isNaN(year)) ||
      (month !== undefined && !Number.isNaN(month)) ||
      (day !== undefined && !Number.isNaN(day))
    ) {
      const newDateInfo = {
        year: year === undefined ? dateInfo.year : year,
        month: month === undefined ? dateInfo.month : month,
        day: day === undefined ? dateInfo.day : day,
      };
      setDateInfo(newDateInfo);
      if (setPost)
        setPost({
          ...diary,
          date: `${newDateInfo.year}${
            Number(newDateInfo.month) < 10
              ? `0${newDateInfo.month === '' ? '0' : newDateInfo.month}`
              : newDateInfo.month
          }${
            Number(newDateInfo.day) < 10
              ? `0${newDateInfo.day === '' ? '0' : newDateInfo.day}`
              : newDateInfo.day
          }`,
        });
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const setImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('이미지를 업로드하려면 권한이 필요해요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 1024, height: 1024 } },
      ]);
      const realUri = manipResult.uri;
      if (setImages && setPost) {
        setPost({ ...diary, img: realUri });
        setImages([realUri]);
      }
    }
  };

  return (
    <area.NoHeightArea marBottom={0} paddingH={15} paddingV={15}>
      <TopWrap>
        <DateWrap>
          {isEditMode ? (
            <SmallInput
              placeholder="연도"
              placeholderTextColor={colors.gray5}
              value={dateInfo.year}
              onChangeText={(t: string) => setDate(t)}
              keyboardType="number-pad"
              maxLength={4}
            />
          ) : (
            <text.DiaryBody2R textColor={colors.diary}>
              {dateInfo.year}
            </text.DiaryBody2R>
          )}
          <text.DiaryBody2R
            textColor={colors.diary}
            style={{ marginHorizontal: 4 }}
          >
            년
          </text.DiaryBody2R>
          {isEditMode ? (
            <SmallInput
              placeholder="월"
              placeholderTextColor={colors.gray5}
              maxLength={2}
              onChangeText={(t: string) => setDate(undefined, t)}
              value={dateInfo.month}
              keyboardType="number-pad"
            />
          ) : (
            <text.DiaryBody2R textColor={colors.diary}>
              {dateInfo.month}
            </text.DiaryBody2R>
          )}
          <text.DiaryBody2R
            textColor={colors.diary}
            style={{ marginHorizontal: 4 }}
          >
            월
          </text.DiaryBody2R>
          {isEditMode ? (
            <SmallInput
              placeholder="일"
              placeholderTextColor={colors.gray5}
              maxLength={2}
              onChangeText={(t: string) => setDate(undefined, undefined, t)}
              value={dateInfo.day}
              keyboardType="number-pad"
            />
          ) : (
            <text.DiaryBody2R textColor={colors.diary}>
              {dateInfo.day}
            </text.DiaryBody2R>
          )}
          <text.DiaryBody2R
            textColor={colors.diary}
            style={{ marginHorizontal: 4 }}
          >
            일
          </text.DiaryBody2R>
        </DateWrap>
        {isEditMode ? (
          <SmallInput
            placeholder="날씨"
            placeholderTextColor={colors.gray5}
            value={diary.weather}
            onChangeText={
              setPost
                ? (t: string) => setPost({ ...diary, weather: t })
                : undefined
            }
          />
        ) : (
          <text.DiaryBody2R textColor={colors.diary}>
            {diary.weather}
          </text.DiaryBody2R>
        )}
      </TopWrap>
      <ContentWrap>
        {isEditMode ? (
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
            multiline
            value={diary.title}
            onChangeText={
              setPost
                ? (t: string) => setPost({ ...diary, title: t })
                : undefined
            }
          />
        ) : (
          <text.DiarySubtitle3 textColor={colors.diary}>
            {diary.title}
          </text.DiarySubtitle3>
        )}
        {
          /* eslint-disable-next-line no-nested-ternary */
          isEditMode ? (
            diary.img ? (
              <TouchableOpacity onPress={setImage}>
                <MainImage isMini={isMini} source={{ uri: diary.img }} />
              </TouchableOpacity>
            ) : (
              <MainBlankPic onPress={setImage}>
                <Icon icon="gallery" size={24} />
              </MainBlankPic>
            )
          ) : diary.img ? (
            <MainImage isMini={isMini} source={{ uri: diary.img }} />
          ) : (
            <MainImage
              isMini={isMini}
              source={require('../../assets/img.jpg')}
            />
          )
        }
        <ContentTextWrap>
          {isEditMode ? (
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
              multiline
              onLayout={onLayout}
              value={diary.content}
              onChangeText={
                setPost
                  ? (t: string) => setPost({ ...diary, content: t })
                  : undefined
              }
            />
          ) : (
            <text.DiaryBody2R
              textColor={colors.black}
              style={{ lineHeight: 20, zIndex: 1 }}
              onLayout={onLayout}
              numberOfLines={isMini ? 3 : undefined}
            >
              {diary.content}
            </text.DiaryBody2R>
          )}
        </ContentTextWrap>
      </ContentWrap>
    </area.NoHeightArea>
  );
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
  text-align-vertical: center;
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
  height: ${(props) => (props.isMini ? 150 : 180)};
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
  height: ${LINE_HEIGHT};
  border-bottom-width: 1;
  border-bottom-color: ${colors.diary};
`;

type TemplateProps = {
  mode: string;
  setPost?: (template: DiaryTemplate) => void;
  post: DiaryTemplate;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DiaryTemplateComp({
  mode,
  setPost,
  post,
  setImages,
}: TemplateProps): React.ReactElement {
  const diaryDataEx: DiaryTemplate = {
    type: 'Diary',
    title: '떡볶이를 실컷 먹은 날',
    date: 'Y2021M08D01',
    weather: '맑음☀️',
    img: 'https://bouquet-storage.s3.ap-northeast-2.amazonaws.com/e11de704-2746-11ec-8d2f-0242ac110002.jpg',
    content:
      '오늘은 떡볶이를 실컷 먹었다. 너무 맛있었다. 다음에 또 먹어야지. 맛있는 떡볶이 집을 찾아야겠다. 하지만 이 주변엔 그런 게 없는걸... 너무 슬프다.',
  };

  switch (mode) {
    case 'ex':
      return <Diary isMini={false} isEditMode={false} diary={diaryDataEx} />;
    case 'mini':
      return <Diary isMini isEditMode={false} diary={post} />;
    case 'detail':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <Diary isMini={false} isEditMode={false} diary={post} />
        </area.NoHeightArea>
      );
    case 'edit':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <Diary
            isMini={false}
            isEditMode
            diary={post}
            setPost={setPost}
            setImages={setImages}
          />
        </area.NoHeightArea>
      );
    default:
      return <Diary isMini isEditMode={false} diary={post} />;
  }
}
