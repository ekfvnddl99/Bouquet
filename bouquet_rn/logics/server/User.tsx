import * as APIs from './APIUtils';

// PUT
export async function editUserAsync(name: string, profile: string): APIs.ResultOutput {
  const result = APIs.putAsync("/user/me", JSON.stringify({"profile_img" : profile, "name":name}), true);
  return result;
}

// DELETE
export async function deleteUserAsync(): APIs.ResultOutput {
  const result = APIs.deleteAsync("user/me", true);
  return result;
}