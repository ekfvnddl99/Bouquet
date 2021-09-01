import * as APIs from './APIUtils';

// GET
export async function getUserAsync(): APIs.ResultOutput {
  const result = await APIs.getAsync('/user/', true);
  return result;
}

// PATCH
export async function editUserAsync(
  name: string,
  profile: string,
): APIs.ResultOutput {
  const result = await APIs.patchAsync(
    '/user/',
    true,
    undefined,
    JSON.stringify({ profile_img: profile, name }),
  );
  return result;
}

// DELETE
export async function deleteUserAsync(): APIs.ResultOutput {
  const result = await APIs.deleteAsync('user/', true);
  return result;
}
