import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';

// PUT
export async function editUserAsync(name : string, profile :string) {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let response = await fetch(serverAddress + "/user/me", {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"profile_img" : profile, "name":name})
      });
      let result = await response.json();

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

// DELETE
export async function deleteUserAsync() {
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    try {
      let path = "/user/me";
      let header: {'accept': string, 'Authorization': string}
      = {
        'accept': 'application/json',
        'Authorization': auth
      };

      let response = await fetch(serverAddress + path, {
        method: 'DELETE',
        headers: header
      });
      let result = await response.json();
      console.log(result);
  
      if (response.status === 200) {
        return true;
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