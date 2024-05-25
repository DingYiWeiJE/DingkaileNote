import { useContext } from "react"
import { DingkaileContext, useDingkaile } from "../../constext/DingkaileContext"

export default function () {
    const {dklData, setDklData} = useDingkaile()
    return <div>
        <h2 onClick={() => setDklData(pre => {
            return {
                ...pre,
                name: '你先让自己强大起来先吧'
            }
        })}>ProviderItem</h2>
        <p>this is provider Item</p>
        <p>{dklData.name}</p>
    </div>
}