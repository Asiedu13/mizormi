import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAvailableSeats } from "../utils";
const busRef = collection(db, "bus");

// Get a single bus
export async function GET(request, { params }) {
  const docRef = doc(db, "bus", params.busId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${params.busId} does not exist` });
  }
}

// Update a single bus
export async function PUT(request, { params }) {
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
      status: "ATHOME|ONTRIP|BOARDING",
    });

    return NextResponse.json({
      data: `bus ${bus} updated successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ error: `bus ${params.busId} does not exist` });
  }
}

// Delete a bus
export async function DELETE(request, { params }) {
  const bus = params.busId;
  const res = await deleteDoc(doc(db, "bus", bus));

  return NextResponse.json({
    data: `bus ${bus} deleted successfully`,
    status: true,
  });
}
