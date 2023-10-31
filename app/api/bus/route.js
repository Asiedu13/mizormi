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
import { createSeats } from "./utils";
import { db } from "../firebase";

const busRef = collection(db, "bus");

export async function GET(request) {
  let data = [];
  const q = query(busRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data });
}

export async function POST(request) {
  const busId = uuidv4();
  const res = await request.json();
  let seats = [];

  const newBus = await setDoc(doc(busRef, busId), {
    id: busId,
    provider_id: res.provider_id, // TODO: USe station IDs instead
    bus_vehicle_number: res.bus_vehicle_number,
    number_of_seats: res.number_of_seats,
    booked_seats: [],
    available_seats: createSeats( res.number_of_seats ),
    status: "ATHOME|ONTRIP|BOARDING",
  });

  return NextResponse.json({
    data: `Bus ${busId} created successfully`,
    status: true,
  });
}
