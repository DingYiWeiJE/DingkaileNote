import { useDingkaile } from "../../constext/DingkaileContext"

export default function () {
	const { setDklData } = useDingkaile()
	return <div>
		<h2
			onClick={() => setDklData(pre => {return{...pre, name:`我要称霸全世界${Date.now()}`}})}
		>ProviderPeice</h2>
		<p>this is provider peice</p>
	</div>
}