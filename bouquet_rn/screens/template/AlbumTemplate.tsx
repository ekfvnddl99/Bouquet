import React, { useMemo } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// components
import LineButton from '../../components/button/LineButton';

// assets
import Icon from '../../assets/Icon';

// utils
import { AlbumTemplate, AllTemplates } from '../../utils/types/PostTypes';

/* eslint-disable global-require */

type AlbumProps = {
  isMini: boolean;
  isEditMode?: boolean;
  postInfo: AlbumTemplate;
  setPost?: (template: AlbumTemplate) => void;
  setImageInfo?: React.Dispatch<
    React.SetStateAction<
      [string[], ((images: string[]) => AllTemplates) | undefined]
    >
  >;
};

function Album({
  isMini,
  isEditMode,
  postInfo,
  setPost,
  setImageInfo,
}: AlbumProps) {
  const realTracks = useMemo(
    () => (isMini ? postInfo.tracks.slice(0, 3) : postInfo.tracks),
    [isMini, postInfo],
  );

  const navigation = useNavigation();
  async function goNavigation(lyric: string) {
    navigation.navigate('WritingStack', {
      screen: 'AlbumLyric',
      params: { lyric, setPost },
    });
  }

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
      if (setImageInfo && setPost) {
        setPost({ ...postInfo, img: result.uri });
        setImageInfo([
          [result.uri],
          (images: string[]) => {
            const tmpPost = postInfo;
            /* eslint-disable-next-line prefer-destructuring */
            tmpPost.img = images[0];
            setPost(tmpPost);
            return tmpPost;
          },
        ]);
      }
    }
  };

  return (
    <area.NoHeightArea marBottom={0} paddingH={15} paddingV={15}>
      <AlbumInfoWrap>
        {postInfo.img === '' ? (
          <TouchableOpacity onPress={isEditMode ? () => setImage() : undefined}>
            <AlbumBlankPic>
              <Icon icon="gallery" size={24} />
            </AlbumBlankPic>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={isEditMode ? () => setImage() : undefined}>
            <AlbumPic
              width={isMini ? 80 : 100}
              height={isMini ? 80 : 100}
              source={
                postInfo.img
                  ? { uri: postInfo.img }
                  : require('../../assets/img.jpg')
              }
            />
          </TouchableOpacity>
        )}
        <AlbumTextInfoWrap>
          <AlbumTitleWrap>
            {isEditMode ? (
              <TextInput
                placeholder="앨범 제목 (필수)"
                style={{
                  flex: 1,
                  fontWeight: '600',
                  fontSize: 14,
                  textAlignVertical: 'top',
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                multiline
                value={postInfo.title}
                onChangeText={
                  setPost
                    ? (t: string) => setPost({ ...postInfo, title: t })
                    : undefined
                }
              />
            ) : (
              <text.Body2B textColor={colors.black}>
                {postInfo.title}
              </text.Body2B>
            )}
            <text.Body2R textColor={colors.black} style={{ marginTop: 8 }}>
              {postInfo.artist}
            </text.Body2R>
          </AlbumTitleWrap>
          {isEditMode ? (
            <TextInput
              placeholder="앨범 발매일 (필수)"
              style={{
                fontWeight: 'normal',
                fontSize: 12,
                color: colors.gray6,
                textAlignVertical: 'top',
                paddingTop: 0,
                paddingBottom: 0,
              }}
              value={postInfo.release_date}
              onChangeText={
                setPost
                  ? (t: string) => setPost({ ...postInfo, release_date: t })
                  : undefined
              }
            />
          ) : (
            <text.Caption textColor={colors.gray6}>
              {postInfo.release_date}
            </text.Caption>
          )}
        </AlbumTextInfoWrap>
      </AlbumInfoWrap>
      {
        /* eslint-disable-next-line no-nested-ternary */
        isMini ? null : isEditMode ? (
          <TextInput
            placeholder="앨범 소개를 입력해 주세요."
            style={{
              fontWeight: 'normal',
              fontSize: 12,
              color: colors.gray6,
              textAlignVertical: 'top',
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 16,
            }}
            multiline
            value={postInfo.description}
            onChangeText={
              setPost
                ? (t: string) => setPost({ ...postInfo, description: t })
                : undefined
            }
          />
        ) : (
          <text.Caption textColor={colors.gray6} style={{ marginTop: 16 }}>
            {postInfo.description}
          </text.Caption>
        )
      }
      {isEditMode ? (
        <>
          <SongsWrap>
            {postInfo.tracks.map((song, idx) => (
              <SongWrap>
                <text.Body2B textColor={colors.black} style={{ width: 20 }}>
                  {idx + 1 <= 9 ? `0${idx + 1}` : idx + 1}
                </text.Body2B>
                <TextInput
                  placeholder="곡 제목 (필수)"
                  style={{
                    fontWeight: 'normal',
                    fontSize: 14,
                    marginLeft: 5,
                    marginRight: 12,
                    flex: 1,
                    textAlignVertical: 'top',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  multiline
                  value={song.title}
                  onChangeText={
                    setPost
                      ? (t: string) => {
                          const tmpPost = postInfo;
                          tmpPost.tracks[idx].title = t;
                          setPost(tmpPost);
                        }
                      : undefined
                  }
                />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 17,
                  }}
                >
                  <TouchableOpacity onPress={() => goNavigation(song.lyric)}>
                    <Icon icon="write" size={15} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      setPost
                        ? () => {
                            const tmpPost = postInfo;
                            if (tmpPost.tracks.length > 1) {
                              tmpPost.tracks.splice(idx, 1);
                              setPost(tmpPost);
                            }
                          }
                        : undefined
                    }
                  >
                    <Icon icon="x" size={24} />
                  </TouchableOpacity>
                </View>
              </SongWrap>
            ))}
          </SongsWrap>
          <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
            <LineButton
              content="곡 추가"
              borderColor={colors.black}
              onPress={
                setPost
                  ? () => {
                      const tmpPost = postInfo;
                      tmpPost.tracks = [
                        ...tmpPost.tracks,
                        { title: '', lyric: '' },
                      ];
                      setPost(tmpPost);
                    }
                  : undefined
              }
            />
          </View>
        </>
      ) : (
        <SongsWrap>
          {realTracks.map((song, idx) => (
            <SongWrap>
              <text.Body2B textColor={colors.black} style={{ width: 20 }}>
                {idx + 1 <= 9 ? `0${idx + 1}` : idx + 1}
              </text.Body2B>
              <text.Body2R
                textColor={colors.black}
                style={{ flex: 1, marginLeft: 5, marginRight: 12 }}
              >
                {song.title}
              </text.Body2R>
              {isMini ? null : <Icon icon="play" size={15} />}
            </SongWrap>
          ))}
        </SongsWrap>
      )}
    </area.NoHeightArea>
  );
}

// TODO: SongWrap의 key에 array의 index가 아닌 다른 unique한 값을 넣기

const AlbumInfoWrap = styled.View`
  flex: 1;
  flex-direction: row;
`;

const AlbumPic = styled(elses.RectangleImg)``;

const AlbumBlankPic = styled.View`
  background-color: ${colors.gray0};
  border-radius: 5;
  justify-content: center;
  align-items: center;
  width: 100;
  height: 100;
`;

const AlbumTextInfoWrap = styled.View`
  margin-left: 20;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const AlbumTitleWrap = styled.View``;

const SongsWrap = styled.View`
  margin-top: 6;
`;

const SongWrap = styled.View`
  flex-direction: row;
  margin-top: 10;
`;

type TemplateProps = {
  mode: string;
  post: AlbumTemplate;
  setPost?: (template: AlbumTemplate) => void;
  setImageInfo?: React.Dispatch<
    React.SetStateAction<
      [string[], ((images: string[]) => AllTemplates) | undefined]
    >
  >;
};

export default function AlbumTemplateComp({
  mode,
  post,
  setPost,
  setImageInfo,
}: TemplateProps): React.ReactElement {
  const exampleTemplate: AlbumTemplate = {
    type: 'Album',
    title: '봄의 정원',
    artist: '달오떡',
    release_date: '20210814',
    description:
      "‘봄을 피우기 위한 기다림' 봄을 기다리며 달오떡이 심혈을 기울인 앨범. 전체적으로 수록곡 모두 부드러운 선율과 싱그러운 멜로디가 마음을 간질이지만, 그 속에 들어 있는 기다림의 애처로움이 역설적으로 드러난다.",
    img: '',
    tracks: [
      {
        title: '안녕, 나의 봄',
        lyric: '',
      },
      {
        title: '파랑새',
        lyric: '',
      },
      {
        title: '꽃 피우다 보면',
        lyric: '',
      },
    ],
  };

  switch (mode) {
    case 'ex':
      return (
        <Album isMini={false} isEditMode={false} postInfo={exampleTemplate} />
      );
    case 'mini':
      return <Album isMini isEditMode={false} postInfo={post} />;
    case 'detail':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <Album isMini={false} isEditMode={false} postInfo={post} />
        </area.NoHeightArea>
      );
    case 'edit':
      return (
        <area.NoHeightArea marBottom={12} paddingH={10} paddingV={10}>
          <Album
            isMini={false}
            isEditMode
            postInfo={post}
            setPost={setPost}
            setImageInfo={setImageInfo}
          />
        </area.NoHeightArea>
      );
    default:
      return <Album isMini isEditMode={false} postInfo={post} />;
  }
}
