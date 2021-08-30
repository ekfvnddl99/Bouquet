import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import { Base64 } from 'js-base64';

export default async function UploadImageAsync(uri: string) {
  let extension = '';
  for (let i = uri.length - 1; i >= 0; i--) {
    if (uri.charAt(i) === '.') {
      extension = uri.slice(i, uri.length);
      break;
    }
  }
  let type = ''
  if (extension === ".jpg" || extension === ".jpeg") {
    type = "image/jpeg"
  }
  else if (extension === ".png") {
    type = "image/png"
  }
  else if (extension === ".gif") {
    type = "image/gif"
  }
  else {
    return "지원하지 않는 형식이거나, 파일 이름이 잘못되었어요.";
  }
  console.log(extension, type);

  const formData = new FormData();
  formData.append('img', {
    type: type,
    uri: uri,
    name: 'upload' + extension,
  });

  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/img/upload", {
        method: 'POST',
        headers: {
          'Authorization': auth,
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        },
        body: formData
      });
      let result = await response.json();
      console.log(result);

      if (response.status === 201) {
        return result;
      }
      else {
        return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
      }
    }
    catch (err) {
      console.log("error: " + err);
      return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  else {
    return "로그인하지 않았어요.";
  }
}