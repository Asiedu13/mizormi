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

const ticketsRef = collection(db, "tickets");

export async function GET(request) {
  let data = [];
  const q = query(ticketsRef, limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return NextResponse.json({ data });
}

export async function POST(request) {
  const ticketId = uuidv4();
  const res = await request.json();

  const newTicket = await setDoc(doc(ticketsRef, ticketId), {
    id: ticketId,
    user_id: res.user_id, // TODO: USe appropriate IDs instead.
    bus_id: res.bus_id,
    trip_id: res.trip_id,
    provider_id: res.provider_id,
  });

  return NextResponse.json({
    data: `Ticket ${ticketId} created successfully`,
    status: true,
  });
}
