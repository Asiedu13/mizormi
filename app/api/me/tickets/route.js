import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function GET() {
  const userAPIKey = headers().get("authorization");
  let userTickets = [];

  const q = query(
    collection(db, "tickets"),
    where("user_id", "==", userAPIKey)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userTickets.push({data: doc.data() });
  });
 return NextResponse.json({ data: userTickets, status: true });
}

export async function POST(request) {
  const userAPIKey = headers().get("authorization");
  if (userAPIKey) {
    const ticketId = uuidv4();
    const res = await request.json();

    const newTicket = await setDoc(doc(ticketsRef, ticketId), {
      id: ticketId,
      user_id: userAPIKey,
      bus_id: res.bus_id,
      trip_id: res.trip_id,
      provider_id: res.provider_id,
    });

    return NextResponse.json({
      data: `Ticket ${ticketId} created successfully`,
      status: true,
    });
  } else {
    return NextResponse.json({ data: "You are not authorized", status: false });
  }
}
