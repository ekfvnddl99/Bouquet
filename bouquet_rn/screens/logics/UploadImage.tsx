import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';

export default async function UploadImageAsync(uri: string) {
  const formData = new FormData();
  formData.append('img', {
    type: "image/jpeg",
    uri: uri,
    name: 'upload.jpg',
  });

  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/services/img/upload", {
        method: 'POST',
        headers: {
          'Authorization': auth,
          'Content-Type': 'multipart/form-data'
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