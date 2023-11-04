import axios from 'axios'
import { type FetchUserContributionType } from '../types'
const baseUrl = import.meta.env.VITE_BASE_URL

export const fetchUserContribution =
	async (): Promise<FetchUserContributionType | null> => {
		try {
			const response = await axios.get<FetchUserContributionType>(baseUrl)
			return response.data
		} catch (error) {
			console.error('Error fetching data:', error)
			return null
		}
	}
