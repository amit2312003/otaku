import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"

function ProfileContentENG({ userId }) {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const lang = profileParams.get("lang")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getProfileData = async () => {
			await axios
				.post(`${API}/get-history?page=${page}`, { userId: userId })
				.then((response) => {
					setData(response.data.data)
					if (response.data.success) {
						const { page, data } = response.data.data
						console.log(page, data)
						setPage(parseInt(page))
						setData(data)
						setLoading(false)
					}
				})
		}

		getProfileData()
		return () => {
			source.cancel()
		}
	}, [lang, navigate, page, userId])

	return <div>{loading ? "Loading" : console.log(data)}</div>
}

export default ProfileContentENG