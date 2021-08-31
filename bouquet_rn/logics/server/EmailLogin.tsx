import {Base64} from 'js-base64';
import * as APIs from './APIUtils';



export async function loginEmailAsync(email: string, password: string): APIs.ResultOutput {
  const result = await APIs.postAsync(
    "/auth/login/Email",
    { 'email': email, 'pw': password, 'Content-Type': 'application/json' },
    JSON.stringify({
      "email": email,
      "pw": password
    }),
    false
  );
  
  if (typeof(result) !== "string") return result.Authorization;
  return result;
}

export async function registerEmailAsync(email: string, password: string, name: string, profilePic: string): APIs.ResultOutput {
  const result = await APIs.postAsync(
    "/auth/register/Email",
    { 'email': email, 'pw': password, 'Content-Type': 'application/json' },
    JSON.stringify({
      "email": email,
      "pw": password,
      "profile_img": profilePic,
      "name": Base64.encode(name)
    }),
    false
  );
  
  if (typeof(result) !== "string") return result.Authorization;
  return result;
}

export async function checkEmailAsync(email: string): APIs.ResultOutput {
  const result = await APIs.getAsync("/auth/dup_email", { 'email': email });
  if (typeof(result) !== "string") return result.result;
  return result;
}