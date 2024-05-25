import { useContext } from "react"
import { ConfigContext } from "../../constext/ConfigContext"

export function ToDoItem() {
    const {config, setConfig} = useContext(ConfigContext)!
    return <div>
        <h3 onClick={() => setConfig({...config, title:'大王叫我来巡山'})}>
        ToDoItem
        </h3>
    </div>
}