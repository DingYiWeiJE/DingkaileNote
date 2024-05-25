import { ReactNode, createContext, useContext, useState } from "react"

const dingkaileData = {
	name: '丁凯乐',
	age: 28
}

type IDingkaileData = typeof dingkaileData

interface IDingkaileContext {
	dklData: IDingkaileData,
	setDklData: React.Dispatch<React.SetStateAction<IDingkaileData>>
}

export const DingkaileContext = createContext<IDingkaileContext | null>(null)

interface IDingkaileProvider {
	children: ReactNode
}

export function useDingkaile() {
	const dkl = useContext(DingkaileContext)
	if (dkl === null) {
		throw new Error('使用 useDingkaile 必须在DingkaileProviden内容当中')
	}
	return dkl
} 

export default function DingkialeProvider({children} :IDingkaileProvider) {
	const [dklData, setDklData] = useState(dingkaileData)

	return <DingkaileContext.Provider  value={{dklData, setDklData}}>
		{children}
	</DingkaileContext.Provider>
} 