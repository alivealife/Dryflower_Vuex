export default function (time) {
  const date = new Date(time * 1000);
  // 取得物件的當地時間
  return date.toLocaleDateString();
}
