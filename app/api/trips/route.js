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
import { db } from "../firebase-config";
import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";
import { headers } from "next/headers";

const tripsRef = collection(db, "trips");

export async function GET() {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const q = query(tripsRef, limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return NextResponse.json({ data, status: true });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

export async function POST(request) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const res = await request.json();
    const tripId = uuidv4();
    const newTrip = await setDoc(doc(tripsRef, tripId), {
      id: tripId,
      bus_id: res.bus_id,
      user_id: userAPIKey,
      departure_time: res.departure_time,
      destination: res.destination,
      stops: res.stops,
      trip_status: res.trip_status,
      ticket_price: res.ticket_price,
      departure_point: res.departure_point,
    });

    return NextResponse.json({ data: tripId, status: true });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
