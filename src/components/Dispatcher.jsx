import { useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { realtime } from "../firebase/firebase";

export default function Dispatcher() {

  useEffect(() => {
    onValue(ref(realtime,"live/orders"), snap => {
      const orders = snap.val();
      if(!orders) return;

      Object.entries(orders).forEach(([id,o])=>{
        if(o.status==="PLACED") assign(id,o);
      });
    });
  }, []);

  function assign(orderId, order){
    onValue(ref(realtime,"live/trucks"), snap=>{
      const trucks = snap.val();
      if(!trucks) return;

      for(const [id,t] of Object.entries(trucks)){
        if(t.status==="IDLE"){
          set(ref(realtime,`live/trucks/${id}`),{...t,status:"DELIVERING",load:t.load+order.qty});
          set(ref(realtime,`live/orders/${orderId}`),{...order,status:"DELIVERING",truck:id});

          setTimeout(()=>{
            set(ref(realtime,`live/orders/${orderId}`),{...order,status:"DELIVERED",truck:id});
            set(ref(realtime,`live/trucks/${id}`),{...t,status:"IDLE",load:0});
          },5000);
          break;
        }
      }
    },{onlyOnce:true});
  }

  return null;
}
