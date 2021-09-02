import * as APIs from './APIUtils';

// 일부분은 EmailLogin에 있다.

// GET
export async function checkUserAsync(name: string): APIs.ResultOutput {
  const result = await APIs.postAsync(
    '/auth/user/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ user_name: name }),
    false,
  );
  if (typeof result !== 'string') return result.duplicated;
  return result;
}

export async function checkCharacterAsync(chaName: string): APIs.ResultOutput {
  const result = await APIs.postAsync(
    '/auth/character/check',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ character_name: chaName }),
    false,
  );
  if (typeof result !== 'string') return result.duplicated;
  return result;
}
