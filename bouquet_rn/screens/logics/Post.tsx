import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import { Character } from '../../utils/types';

import { getCharacterAsync, responseToCharacter } from './Character';

export interface Comment {
  name: string,
  createdAt: string,
  updatedAt: string,
  profileImg: string,
  id: number,
  comment: string,
  liked: boolean,
  parent: number,
  children?: Array<Comment>,
}

export interface PostInterface<T extends PostRequestInterface> {
  id: number,
  createdAt: string,
  updatedAt: string,
  template: T,
  numSunshines:number,
  liked: boolean,
  characterName: string,
  characterImg: string,
  comments: Array<Comment>,
}

// Template Request Types

export interface PostRequestInterface {
  characterId: number,
  template: string,
  text?: string,
}

export interface ImagePostRequestInterface extends PostRequestInterface {
  img: string,
}

export interface DiaryPostRequestInterface extends PostRequestInterface {
  title: string,
  weather: string,
  img: string,
  date: number,
  content: string,
}

export interface AlbumPostRequestInterface extends PostRequestInterface {
  description: string,
  title: string,
  img: string,
  releaseDate: number,
  tracks: Array<{ title: string, lyric: string }>,
}

export interface ListPostRequestInterface extends PostRequestInterface {
  title: string,
  content: string,
  img: string,
  components: Array<{ title: string, img: string, content: string }>,
}

export type AllPostRequestType =
PostRequestInterface |
ImagePostRequestInterface |
DiaryPostRequestInterface |
AlbumPostRequestInterface |
ListPostRequestInterface;

export interface PostResponseInterface {
  msg: string,
  posts: Array<any>,
}

export async function RequestToPostAsync<T extends PostRequestInterface>(postRequest: T): Promise<PostInterface<T> | null> {
  const result = await getCharacterAsync(postRequest.characterId);
  if (typeof(result) !== "string") {
    const character = responseToCharacter(result);
    return {
      id: -1,
      createdAt: '',
      updatedAt: '',
      template: postRequest,
      numSunshines:0,
      liked: false,
      characterName: character.name,
      characterImg: character.profileImg,
      comments: []
    }
  }
  else return null;
}

export function PostListResponseToPost(postResponse: PostResponseInterface): Array< PostInterface<AllPostRequestType> > {
  return postResponse.posts.map((post: any) => {
    let template: AllPostRequestType = {
      characterId: post.character_id ? post.character_id : -1,
      template: post.template,
      text: post.text
    }

    switch (post.template) {
      case "Image":
        template = {
          ...template,
          img: post.img
        }
        break;
      case "Diary":
        template = {
          ...template,
          title: post.title,
          weather: post.weather,
          img: post.img,
          date: post.date,
          content: post.content
        }
        break;
      case "Album":
        template = {
          ...template,
          description: post.description,
          title: post.title,
          img: post.img,
          releaseDate: post.release_date,
          tracks: post.tracks
        }
        break;
      case "List":
        template = {
          ...template,
          title: post.title,
          content: post.content,
          components: post.components,
          img: post.img
        }
        break;
    }

    return {
      id: post.id,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      characterName: post.character_name,
      characterImg: post.character_img,
      liked: post.liked,
      numSunshines: post.num_sunshines,
      comments: post.comments,
      template: template
    }
  })
}

// POST
export async function PostAsync<T extends PostRequestInterface>(body: T) {
  function getTemplate() {
    switch (body.template) {
      case "None": return "/";
      case "Image": return "/img";
      case "Diary": return "/diary";
      case "Album": return "/album";
      case "List": return "/list";
      default: return "/";
    }
  }
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    const templateInfo = getTemplate();
    try {
      let response = await fetch(serverAddress + "/post" + templateInfo, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      let result = await response.json();
      console.log(result);

      if (response.status === 200) {
        return result;
      }
      else return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
    catch (err) {
      console.log("error: " + err);
      return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  else return "로그인되어 있지 않아요.";
}