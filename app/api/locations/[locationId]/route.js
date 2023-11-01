import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const locationsRef = collection(db, "locations");

// Get a single ticket
export async function GET(request, { params }) {
  const docRef = doc(db, "locations", params.locationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json({ data: docSnap.data(), status: true });
  } else {
    return NextResponse.json({ error: `${params.locationId} does not exist` });
  }
}

export async function PUT(request, { params }) {
  const location = params.location;
  const docRef = doc(db, "locations", location);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const res = await request.json();
    const updatedLocation = await setDoc(doc(locationsRef, location), {
      id: location,
      location_name: res.location_name, // TODO: USe appropriate IDs instead.
      location_coordinates: res.location_coordinates,
      location_image_url: res.location_image_url,
    });

    return NextResponse.json({
      data: `location ${location} updated successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({
      error: `location ${location} does not exist`,
    });
  }
}

export async function DELETE(request, { params }) {
  const location = params.location;
  const res = await deleteDoc(doc(db, "locations", location));

  return NextResponse.json({
    data: `location ${location} deleted successfully`,
    status: true,
  });
}
