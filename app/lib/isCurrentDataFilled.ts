export default function isCurrentDataFilled(data: any) {
  for (let item in data) {
    if (data[item] !== "") {
      return true;
    }
  }
  return false;
}
