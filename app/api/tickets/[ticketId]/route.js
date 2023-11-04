import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import { AUTH_ERROR_MESSAGE, isAdmin } from "../../utils";

const ticketsRef = collection(db, "tickets");

// Get a single ticket
export async function GET(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (isAdmin(userAPIKey)) {
    const docRef = doc(db, "tickets", params.ticketId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ data: docSnap.data(), status: true });
    } else {
      return NextResponse.json({ error: `${params.ticketId} does not exist` });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

export async function PUT(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (isAdmin(userAPIKey)) {
    const ticket = params.ticketId;
    const docRef = doc(db, "tickets", ticket);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = await request.json();
      const updatedTicket = await setDoc(doc(ticketsRef, ticket), {
        id: ticket,
        user_id: res.user_id, // TODO: USe appropriate IDs instead.
        bus_id: res.bus_id,
        trip_id: res.trip_id,
        provider_id: res.provider_id,
      });

      return NextResponse.json({
        data: `ticket ${ticket} updated successfully`,
        status: true,
      });
    } else {
      return NextResponse.json({
        error: `ticket ${ticket} does not ticket`,
      });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

export async function DELETE(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const ticket = params.ticketId;
    const res = await deleteDoc(doc(db, "tickets", ticket));

    return NextResponse.json({
      data: `ticket ${ticket} deleted successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
