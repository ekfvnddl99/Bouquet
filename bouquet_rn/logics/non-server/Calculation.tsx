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
  const curr = new Date(time);
  const now = new Date();
  const diff = (now.getTime() - curr.getTime()) / 1000;

  if (diff < 60) return `${time}${i18n.t('초')}`;
  if (diff / 60 < 60) return `${diff / 60}${i18n.t('분')}`;
  if (diff / 360 < 24) return `${diff / 360}${i18n.t('시간')}`;
  return `${diff / 8640}${i18n.t('일')}`;
}

export function getByte(str: string): number {
  return new Blob([str]).size;
}
