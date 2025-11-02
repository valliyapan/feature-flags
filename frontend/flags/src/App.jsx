import { useEffect, useState, useMemo, use } from 'react'
import './App.css'
import Search from './Search.jsx'
import Error from './Error.jsx'
import FlagsTable from './FlagsTable.jsx'
import Stats from './Stats.jsx'
import { API_URL, API_KEY } from './constants.js'

function App() {

  const [flags, setFlags] = useState([])
  const [error, setError] = useState('')
  const [stats, setStats] = useState({})

  async function fetchStats() {
    try {
      const url = new URL(`${API_URL}/stats`)

      const response = await fetch(url.toString(), {
        headers: {
          'x-api-key': API_KEY
        }
      })

      const statsData = await response.json()
      setStats(statsData)
    }
    catch (error) {
      setError('Could not fetch stats')
      setStats({})
    }
  }

  useEffect(() => {
    let errorDisappearTimer

    if (error) {
      errorDisappearTimer = setTimeout(() => {
        setError('')
      }, 3000)
    }

    return () => {
      clearTimeout(errorDisappearTimer)
    }
  }, [error])

  useEffect(() => {
    fetchStats()
  }, [])

  // function to update flag status to backend
  async function updateFlagStatus(key, version) {
    try {
      const url = new URL(`${API_URL}/flags/${key}`)

      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          version
        })
      })

      if (response.status !== 200) {
        throw new Error('Failed to update flag')
      }

      // update updatedAt on success
      const flagsResponse = await response.json()

      setFlags((prevFlags) => getUpdatedFlags(
        prevFlags,
        {
          enabled: flagsResponse.enabled,
          updatedAt: flagsResponse.updatedAt,
          version: flagsResponse.version
        },
        key
      ))

      fetchStats() // refresh stats

    } catch (error) {
      setError('Could not update flag status')
      setFlags((prevFlags) => getUpdatedFlags(prevFlags, {}, key)) // revert toggle
    }
  }

  function getUpdatedFlags(prevFlags, newFlagData, key) {
    return prevFlags.map((flag) => {
      if (flag.key === key) {
        return {
          ...flag,
          enabled: !flag.enabled,
          ...newFlagData
        }
      }
      return flag // other key flags
    })
  }

  function toggleFlag(key) {
    setFlags((prevFlags) => getUpdatedFlags(prevFlags, {}, key))

    const flagVersion = flags.find((flag) => flag.key === key).version // take current version
    updateFlagStatus(key, flagVersion) // update to backend
  }

  return (
    <div className='app-container'>
      <p className='app-title'>Feature flags dashboard</p>
      <Stats data={stats} />
      <Error message={error} />
      <Search setFlags={setFlags} setError={setError} />
      <FlagsTable flags={flags} toggleFlag={toggleFlag} />
    </div>
  )
}

export default App
