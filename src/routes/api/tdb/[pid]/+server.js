import { doc, getDoc } from "firebase/firestore";
import{ db } from '../../../../lib/Firebase'
import dotenv from 'dotenv';
dotenv.config();

async function get(pid){
    const docRef = doc(db, "problem", String(pid));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data()
      console.log("Original code:", data.code);
      data.code = data.code.replace(/\\"/g, '"')
      console.log("Replaced code:", data.code);
      return data
    }
}



export async function GET({ params }){
  const pid = params.pid;
  const result = await get(pid)
  console.log("Final code:", result ? result.code : "");

  if (result) {
    return new Response(result.code, { headers: { 'Content-Type': 'text/plain' } })
  } else {
    return new Response("Error: Data Empty!", { headers: { 'Content-Type': 'text/plain' } })
  }
}