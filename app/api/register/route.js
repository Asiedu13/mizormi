import { NextResponse } from "next/server";
import { setDoc, doc, collection } from "firebase/firestore";
import { db, signUpUser } from "../firebase-config";

const usersRef = collection(db, "users");

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await signUpUser(email, password);

  // Use the user id to create a single user
  const res = await setDoc(doc(usersRef, user.uid), {
    id: user.uid,
    full_name: "",
    profile_photo_url: null,
    id_card_photo_url: null,
    phone_number: "",
    email,
    password,
    trips: [],
  });

  // return NextResponse.json({ res, status: true});

  return NextResponse.json({
    data: user.providerData,
    apiKey: user.uid,
    status: true,
  });
}
