import { atom } from 'recoil';

export const pageState = atom({
  key: 'pageState',
  default: 'home',
});

export const characterState = atom({
  key: 'characterState',
  default: {
    isLogined: false,
    characterName: '',
    caption: '',
    image: '',
  }
})