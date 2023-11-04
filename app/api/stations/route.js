import { NextResponse } from "next/server";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../firebase-config";

import { v4 as uuidv4 } from "uuid";

import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";

const stationsRef = collection(db, "stations");

export async function GET(request) {
  const userAPIKey = headers().get("authorization");
  if (isAdmin(userAPIKey) == true) {
    let data = [];
    const q = query(stationsRef, limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return NextResponse.json({ data });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

export async function POST(request) {
  const userAPIKey = headers().get("authorization");
  if (isAdmin(userAPIKey) == true) {
    const stationId = uuidv4();
    const res = await request.json();

    const newStation = await setDoc(doc(stationsRef, stationId), {
      id: stationId,
      admin_id: res.admin_id, // TODO: USe admin IDs instead
      full_name: res.full_name,
      profile_photo_url: res.profile_photo_url,
    });

    return NextResponse.json({
      data: `Station ${stationId} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
