import { useState, useEffect, useCallback } from 'react'

interface IParams {
    url?: string
    autoFetch?: boolean
}

interface IHookReturn {
    response: any // eslint-disable-line
    error: string | null
    isLoading: boolean
    fetchData: (url: string) => void
}

export default ({ url = '', autoFetch = true }: IParams): IHookReturn => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async (urlFetch: string) => {
        setIsLoading(true)
        try {
            const res = await fetch(urlFetch)
            const json = await res.json()
            setResponse(json)
            setIsLoading(false)
        } catch (responseError) {
            setError(responseError)
        }
    }, [])

    useEffect(() => {
        if (!url) {
            setResponse(null)
            setError(null)
            setIsLoading(false)
            return
        }
        if (autoFetch) {
            fetchData(url)
        }
    }, [url, fetchData, autoFetch])
    return { response, error, isLoading, fetchData }
}
