import { TextInput } from "./typesAndInterfaces";

export default function isCurrentDataFilled(data: TextInput) {
  for (let item in data) {
    if (data[item] !== "") {
      return true;
    }
  }
  return false;
}
