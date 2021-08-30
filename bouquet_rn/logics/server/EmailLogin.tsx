import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import {Base64} from 'js-base64';

type EmailLoginProps = {
  email: string;
  password: string;
}

export async function EmailLoginAsync(email: string, password: string) {
  try {
    let response = await fetch(serverAddress + "/auth/login/Email", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "pw": password
      })
    });
    let result = await response.json();
    console.log(result);
    
    if (response.status === 422) {
      return "메일이나 비밀번호가 틀렸나 봐요.";
    }
    else if (response.status === 200) {
      await SecureStore.setItemAsync('auth', result.Authorization);
      return '';
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

export async function EmailRegisterAsync(email: string, password: string, name: string, profilePic: string) {
  try {
    let response = await fetch(serverAddress + "/auth/register/Email", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "pw": password,
        "profile_img": profilePic,
        "name": Base64.encode(name)
      })
    });
    let result = await response.json();
    console.log(result);

    if (response.status === 201) {
      await SecureStore.setItemAsync('auth', result.Authorization);
      return '';
    }
    else {
      return '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.';
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}

export async function EmailDupAsync(email: string) {
  try {
    let response = await fetch(serverAddress + "/auth/dup_email", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'email' : email
      },
    });
    let result = await response.json();

    if (response.status === 200) {
      return result.result;
    }
    else {
      return result.result;
    }
  }
  catch (err) {
    console.log("error: " + err);
    return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
  }
}