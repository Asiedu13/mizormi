import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { headers } from "next/headers";
import { AUTH_ERROR_MESSAGE, isAdmin } from "../utils";

const ticketsRef = collection(db, "tickets");

// Get all tickets
export async function GET(request) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const q = query(ticketsRef, limit(10));
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
    const ticketId = uuidv4();
    const res = await request.json();

    const newTicket = await setDoc(doc(ticketsRef, ticketId), {
      id: ticketId,
      user_id: res.user_id,
      bus_id: res.bus_id,
      trip_id: res.trip_id,
      provider_id: res.provider_id,
    });

    return NextResponse.json({
      data: `Ticket ${ticketId} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
