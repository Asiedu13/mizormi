import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const tripsRef = collection(db, "trips");

export async function GET() {
  const userAPIKey = headers().get("authorization");

  if (userAPIKey) {
    let userTrips = [];
    const q = query(
      collection(db, "trips"),
      where("user_id", "==", userAPIKey)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userTrips.push({ data: doc.data() });
    });
    return NextResponse.json({ data: userTrips, status: true });
  } else {
    return NextResponse.json({ data: "You are not signed in", status: false });
  }
}

// export async function POST( request ) {
//   const userAPIKey = headers().get( "authorization" );
//   if ( userAPIKey == true ) {
//     const res = await request.json();
//     const tripId = uuidv4();
//     const newTrip = await setDoc(doc(tripsRef, tripId), {
//       id: tripId,
//       bus_id: res.busId,
//       user_id: userAPIKey,
//       departure_time: res.departure_time,
//       destination: res.destination,
//       stops: res.stops,
//       trip_status: res.trip_status,
//       ticket_price: res.ticket_price,
//       departure_point: "Kasoa",
//     });

//     return NextResponse.json({ res, status: true });
//   } else {
//     return NextResponse.json()
//   }
// }
