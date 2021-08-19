import i18n from 'i18n-js';

export function numName(num : number){
  let ans;
  if(num>=1000){
      num=num/1000;
      ans = num+ 'K';
  }
  else ans=num;
  return ans;
}

export function timeName(time : number){
  if(time<60) return time+i18n.t('분');
  else if(time/60 < 24) return ((time/60) | 0) + i18n.t('시간');
  else return ((time/1440) | 0 )+i18n.t('일');
}

export function transferTime(timea:string, timeb:string){
  let sec;
  let min;
  let hour;
  let day;
  return 0;
}

export function getByte(str : string){
  return (new Blob([str])).size;
}
