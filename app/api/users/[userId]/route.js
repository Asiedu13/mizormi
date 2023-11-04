import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { db, signInUser } from "../../firebase-config";

import { AUTH_ERROR_MESSAGE, isAdmin } from "../../utils";

const usersRef = collection(db, "users");

// Reading a single user
export async function GET(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const docRef = doc(db, "users", params.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ data: docSnap.data(), status: true });
    } else {
      return NextResponse.json({ error: `${params.userId} does not exist` });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

// Updating a single user
export async function PUT(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const user = params.userId;
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = await request.json();
      // TODO: Remove data that already comes with the firebase-auth such as profile_photo, etc.
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
      return NextResponse.json({
        error: `User ${params.userId} does not exist`,
      });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

// Delete a single user
export async function DELETE(request, { params }) {
  const userAPIKey = headers().get("authorization");

  if (await isAdmin(userAPIKey)) {
    const req = await request.json();

    // Delete extra data
    const user = params.userId;
    const res = await deleteDoc(doc(db, "users", user));

    // Delete user from auth
    const signedInUser = await signInUser(req.email, req.password);
    const deleteAUser = await deleteUser(signedInUser);

    return NextResponse.json({
      data: `User ${signedInUser.uid} deleted successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
