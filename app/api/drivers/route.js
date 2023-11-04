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
import { db } from "../firebase-config";

import { v4 as uuidv4 } from "uuid";

import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";

const driversRef = collection(db, "drivers");

export async function GET(request) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const q = query(driversRef, limit(10));
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
  if (await isAdmin(userAPIKey)) {
    const driverId = uuidv4();
    const res = await request.json();

    const newDriver = await setDoc(doc(driversRef, driverId), {
      id: driverId,
      primary_bus_assigned: res.primary_bus_assigned, // TODO: USe station IDs instead
      driver_license_number: res.driver_license_number,
      full_name: res.full_name,
      profile_photo_url: res.profile_photo_url,
    });

    return NextResponse.json({
      data: `Driver ${driverId} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
