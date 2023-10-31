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

const tripsRef = collection(db, "trips");

export async function GET(request) {
  let data = [];
  const q = query(tripsRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data });
}

export async function POST(request) {
  const tripId = uuidv4();
  const res = await setDoc(doc(tripsRef, tripId), {
    id: tripId,
    bus_id: uuidv4(), // TODO:REmove UUID
    user_id: uuidv4(), // TODO: Remove UUID
    departure_time: Date("12/02/2024"), // TODO: Look into JS date object
    destination: "Accra",
    stops: [],
    trip_status: "OnGoing", // TODO: Find out the enums version for JS
    ticket_price: 10.0,
    departure_point: "Kasoa", // TODO: USe station IDs instead
  });

  return NextResponse.json({ res, status: true });
}
