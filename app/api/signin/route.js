import { NextResponse } from "next/server";

import { db, signInUser } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await signInUser(email, password);
  const apiKey = user.uid;

  const docRef = doc(db, "users", apiKey);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), apiKey, status: true });
  } else {
    return NextResponse.json({ error: `${apiKey} does not exist` });
  }
  // return NextResponse.json( { data: user.providerData, apiKey, status: true } );
}
