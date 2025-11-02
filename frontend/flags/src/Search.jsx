import { useEffect, useState } from "react"
import { API_URL, API_KEY } from './constants.js'

export default function Search({ setFlags, setError }) {

    const [searchKey, setSearchKey] = useState('')

    const debounceTime = 300

    useEffect(() => {
        const queryTimer = setTimeout(async () => {
            try {
                const url = new URL(`${API_URL}/flags`)

                if (searchKey) url.searchParams.set('search', searchKey)

                console.log('Backend api call for:', searchKey)

                const response = await fetch(url.toString(), {
                    headers: {
                        'x-api-key': API_KEY
                    }
                })

                const flags = await response.json()

                console.log(flags)

                setFlags(flags)
            } catch (error) {
                setError('Something went wrong')
            }
        }, debounceTime)

        return () => {
            clearTimeout(queryTimer)
        }
    }, [searchKey])

    return (
        <div className="search">
            <input
                value={searchKey}
                placeholder="Enter flag key"
                onChange={(event) => setSearchKey(event.target.value)}
            />
        </div>
    )
}