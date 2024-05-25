import { useState } from "react";
import { TodoList } from "./TodoList";
import { ConfigContext } from "../../constext/ConfigContext";
import { configData } from "../../configData";
import DingkialeProvider from "../../constext/DingkaileContext";

export function DingContext() {
	const [config, setConfig] = useState(configData)
	return <div>
		<ConfigContext.Provider value={{config, setConfig}}>

			<h1>DingContext</h1>
			<TodoList />
		</ConfigContext.Provider>
	</div>
}