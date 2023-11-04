import { NextResponse } from "next/server";
import { headers } from "next/headers";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { db, signUpUser } from "../firebase-config";

import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";

const usersRef = collection(db, "users");

export async function GET(request) {
  const userAPIKey = headers().get("authorization");

  if (await isAdmin(userAPIKey)) {
    let data = [];
    const q = query(usersRef, limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return NextResponse.json({ data, status: true });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

export async function POST(request) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const { email, password } = await request.json();

    const user = await signUpUser(email, password);

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

    return NextResponse.json({
      data: user.providerData,
      apiKey: user.uid,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
