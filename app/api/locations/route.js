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
import { db } from "../firebase";

const locationsRef = collection(db, "locations");

export async function GET(request) {
  let data = [];
  const q = query(locationsRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data });
}

export async function POST(request) {
  const locationId = uuidv4();
  const res = await request.json();

  const newLocation = await setDoc(doc(locationsRef, location), {
    id: location,
    user_id: res.user_id, // TODO: USe appropriate IDs instead.
    bus_id: res.bus_id,
    trip_id: res.trip_id,
    provider_id: res.provider_id,
  });

  return NextResponse.json({
    data: `location ${location} created successfully`,
    status: true,
  });
}
