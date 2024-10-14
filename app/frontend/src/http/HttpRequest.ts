import { stringify } from "querystring"

const httpRequest = async (
  url: string,
  token: string,
  params?: {[key: string]: any},
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  fullUrl?: string
):Promise<any> => {
  try {
    let requestBody:{method: string; headers: {}, body?: string} = {
      method: (method === undefined) ? 'POST' : method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      }
    }
    if (method === 'POST') {
      requestBody = {
        ...requestBody,
        body: JSON.stringify((params === undefined) ? {} : params)
      }    
    }
    const apiUrl:string|undefined = process.env.NEXT_PUBLIC_API_URL
    const requestUrl:string = fullUrl === undefined ? `${apiUrl}${url}` : fullUrl
    const response:Response = await fetch(requestUrl, requestBody)
    if (process.env.NODE_ENV !== 'production') {
      console.info('URL :', requestUrl)
      console.info('Body :', requestBody)
      console.info('Response :', response)
    }
    if (response.ok) {
      return await response.json()
    }
  } catch (error:unknown) {
    console.error(error)
    return new Error('Request failed')
  }
}

export default httpRequest
