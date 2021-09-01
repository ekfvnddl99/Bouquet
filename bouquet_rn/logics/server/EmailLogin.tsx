import * as APIs from './APIUtils';

export async function loginEmailAsync(
  email: string,
  password: string,
): APIs.ResultOutput {
  const result = await APIs.postAsync(
    '/auth/login/Email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
      pw: password,
    }),
    false,
  );

  if (typeof result !== 'string') return result.Authorization;
  return result;
}

export async function registerEmailAsync(
  email: string,
  password: string,
  name: string,
  profilePic: string,
): APIs.ResultOutput {
  const result = await APIs.postAsync(
    '/auth/register/email',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
      pw: password,
      profile_img: profilePic,
      name,
    }),
    false,
  );

  if (typeof result !== 'string') return result.Authorization;
  return result;
}

export async function checkEmailAsync(email: string): APIs.ResultOutput {
  const result = await APIs.postAsync(
    '/auth/email/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      email,
    }),
    false,
  );
  if (typeof result !== 'string') return result.duplicated;
  return result;
}
