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

const driversRef = collection(db, "drivers");

export async function GET(request) {
  let data = [];
  const q = query(driversRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data });
}

export async function POST(request) {
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
}
