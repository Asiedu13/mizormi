import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { isAdmin, AUTH_ERROR_MESSAGE } from "../../utils";

const busRef = collection(db, "bus");

// Get a single bus
export async function GET(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    const docRef = doc(db, "bus", params.busId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ data: docSnap.data(), status: true });
    } else {
      return NextResponse.json({ error: `${params.busId} does not exist` });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

// Update a single bus
export async function PUT(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const bus = params.busId;
    const docRef = doc(db, "bus", bus);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = await request.json();
      const updatedUser = await setDoc(doc(busRef, bus), {
        id: bus,
        provider_id: res.provider_id,
        bus_vehicle_number: res.bus_vehicle_number,
        number_of_seats: res.number_of_seats,
        booked_seats: res.booked_seats,
        status: res.status, // "ATHOME|ONTRIP|BOARDING"
      });

      return NextResponse.json({
        data: `bus ${bus} updated successfully`,
        status: true,
      });
    } else {
      return NextResponse.json({ error: `bus ${params.busId} does not exist` });
    }
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}

// Delete a bus
export async function DELETE(request, { params }) {
  const userAPIKey = headers().get("authorization");
  if (await isAdmin(userAPIKey)) {
    let data = [];
    const bus = params.busId;
    const res = await deleteDoc(doc(db, "bus", bus));

    return NextResponse.json({
      data: `bus ${bus} deleted successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: AUTH_ERROR_MESSAGE, status: false });
  }
}
