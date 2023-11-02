import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const tripsRef = collection(db, "trips");

// Get a single trip
export async function GET(request, { params }) {
  const docRef = doc(db, "trips", params.tripId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${params.tripId} does not exist` });
  }
}

// Update a single trip
export async function PUT(request, { params }) {
  const trip = params.tripId;
  const docRef = doc(db, "trips", trip);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const res = await request.json();
    const updatedUser = await setDoc(doc(tripsRef, trip), {
      id: trip,
      bus_id: res.bus_id, 
      user_id: res.user_id, 
      departure_time: res.departure_time, 
      destination: res.destination,
      stops: res.stops,
      trip_status: res.trip_status,
      ticket_price: res.ticket_price,
      departure_point: res.departure_point,
    });

    return NextResponse.json({
      data: `Trip ${trip} updated successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ error: `Trip ${params.userId} does not exist` });
  }
}

// Delete a trip
export async function DELETE(request, { params }) {
  const trip = params.tripId;
  const res = await deleteDoc(doc(db, "trips", trip));

  return NextResponse.json({
    data: `Trip ${trip} deleted successfully`,
    status: true,
  });
}
