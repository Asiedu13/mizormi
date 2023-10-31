export function createSeats(number) {
  let seats = [];
  for (let i = 0; i < number; i++) {
    seats.push(i + 1);
  }

  return seats;
}