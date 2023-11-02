import { NextResponse } from "next/server";
import { collection, setDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { headers } from "next/headers";
import { db } from "../firebase";

const usersRef = collection(db, "users");

export async function GET() {
  const userAPIKey = headers().get("authorization");
  const docRef = doc(db, "users", userAPIKey);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${userAPIKey} does not exist` });
  }
}

// Updating a single user
export async function PUT(request) {
  const userAPIKey = headers().get("authorization");
  const user = userAPIKey;
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const res = await request.json();

    const updatedUser = await setDoc(doc(usersRef, user), {
      id: user,
      full_name: res.full_name,
      profile_photo_url: res.profile_photo_url,
      id_card_photo_url: res.id_card_photo_url,
      phone_number: res.phone_number,
      email: res.email,
      trips: res.trips,
    });

    return NextResponse.json({
      data: `User ${user} updated successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ error: `User ${params.userId} does not exist` });
  }
}

// Delete a single user
export async function DELETE(request) {
  const userAPIKey = headers().get("authorization");
  const user = userAPIKey;
  const res = await deleteDoc(doc(db, "users", user));

  return NextResponse.json({
    data: `User ${user} deleted successfully`,
    status: true,
  });
}
