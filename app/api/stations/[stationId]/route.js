import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const stationsRef = collection(db, "stations");

// Get a single station
export async function GET(request, { params }) {
  const docRef = doc(db, "stations", params.stationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${params.stationId} does not exist` });
  }
}

// Update a single station
export async function PUT(request, { params }) {
  const station = params.stationId;
  const docRef = doc(db, "stations", station);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const res = await request.json();
    const updatedStation = await setDoc(doc(stationsRef, station), {
      id: station,
      admin_id: res.admin_id, // TODO: USe admin IDs instead
      full_name: res.full_name,
      profile_photo_url: res.profile_photo_url,
    });

    return NextResponse.json({
      data: `station ${station} updated successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({
      error: `station ${driver} does not exist`,
    });
  }
}

// Delete a driver
export async function DELETE(request, { params }) {
  const station = params.stationId;
  const res = await deleteDoc(doc(db, "stations", station));

  return NextResponse.json({
    data: `station ${station} deleted successfully`,
    status: true,
  });
}
