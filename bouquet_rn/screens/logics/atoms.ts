import { atom, selector } from 'recoil';

import { User, Character } from '../../utils/types';
import { getCharacterListAsync, getCharacterAsync, responseToCharacter, CharacterResponseType } from './GetCharacter';

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
  profileImg: '',
  birth: 0,
  job: '',
  nationality: '',
  intro: '',
  tmi: '',
  likes: [''],
  hates: ['']
}

export const characterState = atom({
  key: 'characterState',
  default: noCharacter,
})

export const characterListSelector = selector({
  key: 'characterListSeletor',
  get: async () => {
    const result = await getCharacterListAsync();
    if (typeof(result) !== "string") {
      let list = result.map((obj: CharacterResponseType) => {
        return responseToCharacter(obj, obj.id);
      })
      return list;
    }
    else return [];
  }
})

export const viewCharacterIdState = atom({
  key: 'viewCharacterIdState',
  default: -1,
})

export const viewCharacterSelector = selector({
  key: 'viewCharacterSelector',
  get: async ({ get }) => {
    const currentId = get(viewCharacterIdState);
    if (currentId !== -1) {
      const result = await getCharacterAsync(currentId);
      if (typeof(result) !== "string") {
        return responseToCharacter(result, result.id);
      }
    }
    return noCharacter;
  }
})