import { ref, set, onValue, push } from "firebase/database";
import { realtime } from "../firebase/firebase";

export function updateStock(productId, qty) {
  set(ref(realtime, "live/stock/" + productId), qty);
}

export function createOrder(order) {
  const orderRef = push(ref(realtime, "live/orders"));
  set(orderRef, order);
}

export function listenStock(callback) {
  onValue(ref(realtime, "live/stock"), snap => {
    callback(snap.val());
  });
}
