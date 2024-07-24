import { useState } from "react"
import { useMyStore } from "../MyState/MyStore"
// import { encrypt } from "./cryptoTools"

export default function () {
  const [before, setBefore] = useState<string>('')
  const [after, setAfter] = useState<string>('')
  const [myState, setMyState] = useMyStore()


  const setKey = () => {
    var key = prompt("请输入需要加密的文:", "丁凯乐称霸全世界");
    if (key != null && key != "") {
      setBefore(key)
      // const result = encrypt(key)
      setAfter(encodeURIComponent(key))
    }
  }
  return <div onClick={setKey}>
    <h1>

      加密之前：{before}
    </h1>
    <h3>

    加密之后：{after}
    </h3>
    <h3>
      展示MyState的内容： {JSON.stringify(myState)}
    </h3>
    <button onClick={() => setMyState({ xingqiu: '改成了星球', time: Date.now() })}>Update State</button>
  </div>
}