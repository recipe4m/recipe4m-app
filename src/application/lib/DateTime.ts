export interface HMS {
  hour: number;
  minute: number;
  second: number;
}

export function convertValueToHMS(value: number) {
  let remain = value / 1000;
  const hour = Math.floor(remain / 3600);
  remain = remain % 3600;
  const minute = Math.floor(remain / 60);
  const second = remain % 60;
  return { hour, minute, second };
}

export function convertHMSToValue({ hour, minute, second }: HMS) {
  return ((hour * 60 + minute) * 60 + second) * 1000;
}
