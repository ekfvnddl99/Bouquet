import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import { Character } from '../../utils/types';


export type CharacterRequestType = {
  chaID:number,
  chaName:string, 
  template:number, 
  text:string,
  img?:string,
  title?:string,
  weather?:string,
  date?:number,
  content?:string,
  releaseDate?:number,
  components?:object[]
}

// POST
export async function PostAsync(chaID:number, chaName:string, template:number, text:string) {
  function setTemplateString(){
    switch(template){
      case 0: return "None";
      case 1: return "Album";
      case 2: return "Diary";
      case 3: return "List";
    }
  }
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/post", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "character_id": chaID,
          "character_name": chaName,
          "template": setTemplateString,
          "text": text
        })
      });

      switch(template){
        case 0: break;
        case 1: 
        case 2: 
        case 3: 
        default: break;
      }


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