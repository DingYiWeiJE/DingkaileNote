import { useContext } from "react"
import { ConfigContext } from "../../constext/ConfigContext"
import { useDingkaile } from "../../constext/DingkaileContext"

export function ListItem() {
    const {dklData} = useDingkaile()
    const {config:{title}} = useContext(ConfigContext)!
    return (<div>
        <h3>List Item</h3>
        <span>{title}{dklData.name}</span>
    </div>)
}