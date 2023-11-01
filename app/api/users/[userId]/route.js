import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../firebase";

const usersRef = collection(db, "users");

// Reading a single user
export async function GET(request, { params }) {
  const docRef = doc(db, "users", params.userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${params.userId} does not exist` });
  }
}

// Updating a single user
export async function PUT(request, { params }) {
  const user = params.userId;
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
export async function DELETE(request, { params }) {
  const user = params.userId;
  const res = await deleteDoc(doc(db, "users", user));

  return NextResponse.json({
    data: `User ${user} deleted successfully`,
    status: true,
  });
}
