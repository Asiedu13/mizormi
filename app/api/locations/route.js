import { NextResponse } from "next/server";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

import { v4 as uuidv4 } from "uuid";
import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";

const locationsRef = collection(db, "locations");

export async function GET(request) {
  const userAPIKey = headers().get("authorization");
  if (isAdmin(userAPIKey) == true) {
    let data = [];
    const q = query(locationsRef, limit(10));
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
    const locationId = uuidv4();
    const res = await request.json();

    const newLocation = await setDoc(doc(locationsRef, location), {
      id: location,
      location_name: res.location_name,
      location_coordinates: res.location_coordinates,
      location_image_url: res.location_image_url,
    });

    return NextResponse.json({
      data: `location ${location} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
