import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { db, signUpUser} from "../firebase";

const usersRef = collection(db, "users");

export async function GET(request) {
  let data = [];
  const q = query(usersRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data, status: true });
}

export async function POST(request) {
  // const userId = uuidv4();
  // // TODO: Let this use the request body
  // const res = await setDoc(doc(usersRef, userId), {
  //   id: userId,
  //   full_name: "Prince Kofi Asiedu",
  //   profile_photo_url: null,
  //   id_card_photo_url: null,
  //   phone_number: "+233244276809",
  //   email: "princekofasiedu@gmail.com",
  //   trips: ["Kasoa"],
  // });

  // return NextResponse.json({ res, status: true});
  const res = await request.json();
  const email = res.email;
  const password = res.password
  const user = await signUpUser(email, password) ; 
    
  return NextResponse.json({ data: user, status: true });
    
}

