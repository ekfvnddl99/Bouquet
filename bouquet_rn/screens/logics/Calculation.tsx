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
  if(time<60) return time+"초";
  else if(time/60 < 60) return (time/60) + "분";
  else if(time/360 < 24) return (time/360) + "시간";
  else return (time/8640)+"일";
}

export function transferTime(time:string){
  let curr=new Date().toISOString();
  console.log(time, curr)
  let sec=Number(curr.slice(17,19)) - Number(time.slice(17))
  let min=Number(curr.slice(14,16)) - Number(time.slice(14,16))
  let hour=Number(curr.slice(11,13)) - Number(time.slice(11,13))
  let day=Number(curr.slice(8,10)) - Number(time.slice(8,10))
  let month=Number(curr.slice(5,7))
  let year=Number(curr.slice(0,4))
  let ch=false;
  if(sec<0) {
    sec+=60; min-=1;
    if(min<0) {
      min+=60; hour-=1;
      if(hour<0) {
        hour+=24; day-=1;
        let total=sec+min*60+(hour*60*24);
        return timeName(total)
      }
    }
  }
}

export function getByte(str : string){
  return (new Blob([str])).size;
}
