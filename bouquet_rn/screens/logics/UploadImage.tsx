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
    }
    catch (err) {
      console.log("error: " + err);
    }
  }
}