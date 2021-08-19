import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

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

const AlbumInfoWrap = styled.View`
  flex: 1;
  flex-direction: row;
`;

const AlbumPic = styled(elses.RectangleImg)`
`;

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

const AlbumTitleWrap = styled.View`
`;

const SongsWrap = styled.View`
  margin-top: 6;
`;

const SongWrap = styled.View`
  flex-direction: row;
  margin-top: 10;
`;

type AlbumProps = {
  isMini: boolean;
  isEditMode?: boolean;
  title: string;
  artist: string;
  date: string;
  description: string;
  songs: Array<{title: string; lyric: string;}>;
}

function Album({ isMini, isEditMode, title, artist, date, description, songs }: AlbumProps) {
  const [songsState, setSongsState] = useState(songs);
  useEffect(() => {
    if (isMini && (songs.length > 4)) {
      setSongsState(songs.slice(0, 3));
    }
  }, [isMini, songs, setSongsState]);

  return (
    <area.NoHeightArea
      marBottom={0}
      paddingH={15}
      paddingV={15}
    >
      <AlbumInfoWrap>
        {isEditMode ?
        <AlbumBlankPic>
          <GallerySvg
            w="24"
            h="24"
          />
        </AlbumBlankPic>
        :
        <AlbumPic
          width={isMini ? 80 : 100}
          height={isMini ? 80 : 100}
          source={require('../../assets/img.jpg')}
        />
        }
        <AlbumTextInfoWrap>
          <AlbumTitleWrap>
            {isEditMode ?
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
              multiline={true}
            />
            :
            <text.Body2B color={colors.black}>{title}</text.Body2B>
            }
            <text.Body2R color={colors.black} style={{ marginTop: 8 }}>{artist}</text.Body2R>
          </AlbumTitleWrap>
          {isEditMode ?
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
            />
            :
            <text.Caption color={colors.gray6}>{date}</text.Caption>
            }
        </AlbumTextInfoWrap>
      </AlbumInfoWrap>
      {isMini ? null : 
      isEditMode ?
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
        multiline={true}
      />
      :
      <text.Caption color={colors.gray6} style={{ marginTop: 16 }}>{description}</text.Caption>
      }
      {isEditMode ?
      <>
        <SongsWrap>
          <SongWrap>
            <text.Body2B color={colors.black} style={{ width: 20 }}>01</text.Body2B>
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
              multiline={true}
            />
            <View style={{ alignItems: 'center', flexDirection: 'row', height: 17 }}>
              <WriteSvg w="15" h="15" />
              <XSvg w="24" h="24" />
            </View>
          </SongWrap>
        </SongsWrap>
        <View style={{alignItems:'flex-start', marginTop: 10}}>
          <LineButton
            press={()=>{}}
            content="곡 추가"
            color={colors.black}
            incolor="transparent"
            outcolor="transparent"
          />
        </View>
      </>
      :
      <SongsWrap>
      {songsState.map((song, idx) => (
        <SongWrap key={idx}>
          <text.Body2B
            color={colors.black}
            style={{ width: 20 }}
          >
            {idx + 1 <= 9 ? "0" + (idx + 1) : idx + 1}
          </text.Body2B>
          <text.Body2R color={colors.black} style={{ flex: 1, marginLeft: 5, marginRight: 12 }}>{song.title}</text.Body2R>
          {isMini ? null : <PlaySvg w="15" h="15" />}
        </SongWrap>
      ))}
      </SongsWrap>
      }
    </area.NoHeightArea>
  )
}

type TemplateProps = {
  mode: string;
  post?: Post.PostInterface<any>;
}

export default function AlbumTemplate({ mode, post }: TemplateProps) {
  switch (mode) {
    case 'mini':
      return (
        <Album isMini={true} isEditMode={false}
          title={post ? post.template.title : ''}
          artist={post ? post.characterName : ''}
          date={post ? String(post?.template.releaseDate) : ''}
          description={post ? post.template.description : ''}
          songs={post ? post.template.tracks : []}
        />
      );
    case 'detail':
      return (
        <area.NoHeightArea
          marBottom={12}
          paddingH={10}
          paddingV={10}
        >
          <Album isMini={false} isEditMode={false}
            title={post ? post.template.title : ''}
            artist={post ? post.characterName : ''}
            date={post ? String(post?.template.releaseDate) : ''}
            description={post ? post.template.description : ''}
            songs={post ? post.template.tracks : []}
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
          <Album isMini={false} isEditMode={true}
            title={post ? post.template.title : ''}
            artist={post ? post.characterName : ''}
            date={post ? String(post?.template.releaseDate) : ''}
            description={post ? post.template.description : ''}
            songs={post ? post.template.tracks : []}
          />
        </area.NoHeightArea>
      );
    default:
      return (
        <Album isMini={true} isEditMode={false}
          title={post ? post.template.title : ''}
          artist={post ? post.characterName : ''}
          date={post ? String(post?.template.releaseDate) : ''}
          description={post ? post.template.description : ''}
          songs={post ? post.template.tracks : []}
        />
      );
  }
}