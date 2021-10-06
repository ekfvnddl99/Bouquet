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
  const curr: number = Date.parse(time);
  const now: number = new Date().getTime();
  const diff = (now - curr) / 1000;

  if (diff > 0 && diff < 60) return `${Math.floor(diff)}${i18n.t('초')}`;
  if (diff / 60 < 60 && diff / 60 > 0)
    return `${Math.floor(diff / 60)}${i18n.t('분')}`;
  if (diff / 3600 < 24 && diff / 3600 > 0)
    return `${Math.floor(diff / 3600)}${i18n.t('시간')}`;
  return `${Math.floor(diff / 86400)}${i18n.t('일')}`;
}

export function getByte(str: string): number {
  return new Blob([str]).size;
}
