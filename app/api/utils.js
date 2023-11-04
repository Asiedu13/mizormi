import { db } from "./firebase-config";
import { query, where, collection, getDocs } from "firebase/firestore";

export async function isAdmin(userAPIKey) {
  const q = query(
    collection(db, "users"),
    where("id", "==", userAPIKey),
    where("role", "==", "ADMIN")
  );
  const results = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    results.push({ data: doc.data() });
  });
  // console.log( results.length > 0 ? true : false );
  return results.length > 0 ? true : false;
}

export function createSeats(number) {
  let seats = [];
  for (let i = 0; i < number; i++) {
    seats.push(i + 1);
  }

  return seats;
}

export const AUTH_ERROR_MESSAGE =
  "You are not authorized to perform this action";
