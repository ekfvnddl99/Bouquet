import { Base64 } from 'js-base64';
import * as APIs from './APIUtils';

// 일부분은 EmailLogin에 있다.

// GET
export async function checkUserAsync(name: string): APIs.ResultOutput {
  const result = await APIs.getAsync("/auth/dup_user_name", { 'user-name': name });
  if (typeof(result) !== "string") return result.result;
  return result;
}

export async function checkCharacterAsync(chaName: string): APIs.ResultOutput {
  const result = await APIs.getAsync("/auth/dup_character_name", { 'character-name' : chaName });
  if (typeof(result) !== "string") return result.result;
  return result;
}
