import { atom, selector } from 'recoil';

import { User, Character } from '../../utils/types';
import { getCharacterListAsync, getCharacterAsync, responseToCharacter, CharacterResponseType } from './Character';

export const guest: User = {
  isLogined: false,
  id: -1,
  email: '',
  name: '',
  profileImg: '',
  snsType: ''
}

export const userState = atom({
  key: 'userState',
  default: guest,
});

export const bottomBarHideState = atom({
  key: 'bottomBarHideState',
  default: false,
})

export const selectTemplate = atom({
  key: 'selectTemplate',
  default: -1,
})

export const noCharacter: Character = {
  id: -1,
  name: '',
  profileImg: "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
  birth: '',
  job: '',
  nationality: '',
  intro: '',
  tmi: '',
  likes: [],
  hates: []
}

export const characterState = atom({
  key: 'characterState',
  default: noCharacter,
})


export const characterListState = atom({
  key: 'characterListState',
  default: <Character[]>[],
})

export const viewCharacterState = atom({
  key: 'viewCharacterState',
  default: <number|string>-1,
})

export const viewCharacterSelector = selector({
  key: 'viewCharacterSelector',
  get: async ({ get }) => {
    const current = get(viewCharacterState);
    if (typeof(current) === "number" && current !== -1) {
      const result = await getCharacterAsync(current);
      if (typeof(result) !== "string") {
        return responseToCharacter(result, result.id);
      }
    }
    else if (typeof(current) === "string" && current !== '') {
      const result = await getCharacterAsync(undefined, current);
      if (typeof(result) !== "string") {
        return responseToCharacter(result);
      }
    }
    return noCharacter;
  }
})