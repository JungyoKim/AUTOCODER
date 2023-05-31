import { doc, getDoc } from "firebase/firestore";
import { Base64 } from 'js-base64';
import { config } from 'dotenv';
import{ db } from '../../../../lib/Firebase'
config();

async function get(pid){
    const docRef = doc(db, "problem", String(pid));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log(data.code)
      const res = Base64.btoa(String(data.code))
      console.log(res)
      return res;
    }else{
      return "nocode";
    }
}

export async function GET({ params }){
  const pid = params.pid;
  const result = String(await get(pid))

  if (result) {
    return new Response(JSON.stringify({id:pid,code:result}), { headers: { 'Content-Type': 'text/plain' } })
  } else {
    return new Response("Error: Data Empty!", { headers: { 'Content-Type': 'text/plain' } })
  }
}