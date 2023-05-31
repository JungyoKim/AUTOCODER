export async function fetchData(number) {
    const response1 = await fetch(`/api/db/${number}`);
    const data1 = await response1.json();
    const res1 = String(data1.code)
    console.log(res1)
    if(res1 == "nocode"){
      const response2 = await fetch(`/api/bard/${number}`);
      const data2 = await response2.json();
      const res2 = String(data2.code)
      if(res2== "noproblem"){
        return "noproblem";
      }else{
        return data2;
      }
    }else{
      return data1;
    }
}