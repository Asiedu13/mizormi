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

import { isAdmin, AUTH_ERROR_MESSAGE, createSeats } from "../utils";

const busRef = collection(db, "bus");

// Get all buses
export async function GET(request) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const q = query(busRef, limit(10));
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
    const busId = uuidv4();
    const res = await request.json();
    let seats = [];

    const newBus = await setDoc(doc(busRef, busId), {
      id: busId,
      provider_id: res.provider_id, // TODO: USe station IDs instead
      bus_vehicle_number: res.bus_vehicle_number,
      number_of_seats: res.number_of_seats,
      booked_seats: [],
      available_seats: createSeats(res.number_of_seats),
      status: res.status, //"ATHOME|ONTRIP|BOARDING
    });

    return NextResponse.json({
      data: `Bus ${busId} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
