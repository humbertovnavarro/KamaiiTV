import { User } from "../types";
export default function validateUser(user: User) {
  if(!user.id) {
    return false;
  }
  if(!user.username) {
    return false;
  }
  if(typeof user.username !== 'string') {
    return false;
  }
  if(!(Number.isSafeInteger(user.id) && user.id > 0)) {
    return false;
  }
  return true;
}
