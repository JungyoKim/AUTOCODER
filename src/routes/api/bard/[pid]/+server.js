import axios from "axios";
import cheerio from "cheerio";
import { Bard } from "googlebard";
import { doc, setDoc } from "firebase/firestore";
import { Base64 } from 'js-base64';
import{ db } from '../../../../lib/Firebase'
import dotenv from 'dotenv';
dotenv.config();
const bot = new Bard(process.env.BARD_API_KEY);

async function puppet(pid) {
  const response = await axios.get(`http://www.xn--vb0b16w99jldw3xnme.com/problem.php?id=${pid}`);
  const $ = cheerio.load(response.data);
  try{
    const checker = $('h2').text();
    if(checker == "문제가 없습니다!!"){
      console.log("nop")
      return "noproblem";
    }else{
      console.log("pass")
      const problemText = $('body > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)').text().trim();
  const inputText = $('body > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').text().trim();
  const outputText = $('body > div > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(2)').text().trim();
  const inputExampleText = $('body > div > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > pre').text().trim();
  const outputExampleText = $('body > div > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > pre').text().trim();
  const output = `1.문제설명 ${problemText} 2.입력설명. ${inputText} 3.출력설명. ${outputText} 4.입력예시. ${inputExampleText} 5.출력예시. ${outputExampleText} 출력 결과를 말하지 마십시오, 코드 내에 주석을 쓰지 마십시오, 여러게의 변수에 입력받을때 map()을 사용하지 마십시오!!!,또한 input을 따로따로 지정하지 않는 것도 매우 중요합니다, 또한 코드 이외의 부가적인 말을 절대로 하지 마십시오. 가장 중요합니다!!!!!! 코드 내에 주석을 쓰지 마십시오`.replace(/\.\s+/g, ' ');
  const code = bard(pid,output);
  return code;
    }
  }catch(error){
    //pass
  }
 
}

async function bard(pid,code) {
  const response = await bot.ask(code);
  const regex = /```python\n([\s\S]*?)```/;
  const match = response.match(regex);
  if (match) {
    const pythonCode = match[1].trim();
    save(pid,pythonCode);
    const res = Base64.btoa(String(pythonCode))

    return res;
  } else {
    return "nocode";
  }
}

async function save(pid,code){
  await setDoc(doc(db, "problem", pid), {
    code: code,
  });
}

export async function GET({ params }) {
  const pid = params.pid;
  const result = await puppet(pid)
  console.log(result)

  if (result) {
    return new Response(JSON.stringify({id:pid,code:result}), { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
  } else {
    return new Response("Error: Data Empty!", { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
  }
}