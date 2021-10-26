import i18n from 'i18n-js';

export function numName(num: number): string {
  let ans;
  let tmpNum = num;
  if (tmpNum >= 1000) {
    tmpNum /= 1000;
    ans = `${tmpNum}K`;
  } else ans = `${tmpNum}`;
  return ans;
}

export function timeName(time: string): string {
  // Split timestamp into [ Y, M, D, h, m, s ]
  const t = time.split(/[-T:]/);
  // const t = '2010-06-09T13:12:01'.split(/[-T:]/);

  // Apply each element to the Date function
  const curr = new Date(
    Date.UTC(
      Number(t[0]),
      Number(t[1]) - 1,
      Number(t[2]),
      Number(t[3]) - 9,
      Number(t[4]),
      Number(t[5]),
    ),
  ).getTime();
  const now = new Date().getTime();
  const diff = Math.floor((now - curr) / 1000);

  if (diff > 0 && diff < 3) return '방금 전';
  if (diff >= 3 && diff < 60) return `${Math.floor(diff)}${i18n.t('초')}`;
  if (diff / 60 < 60 && diff / 60 > 0)
    return `${Math.floor(diff / 60)}${i18n.t('분')}`;
  if (diff / 3600 < 24 && diff / 3600 > 0)
    return `${Math.floor(diff / 3600)}${i18n.t('시간')}`;
  return `${Math.floor(diff / 86400)}${i18n.t('일')}`;
}

export function getByte(str: string): number {
  return new Blob([str]).size;
}
