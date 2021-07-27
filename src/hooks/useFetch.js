import { useEffect, useRef, useState } from "react";

export const getToken = () => localStorage.getItem('token') || '';

/**
 * Returns options for fetch requests.
 * @param {String} method - The method of the request. E.g. GET, POST, PATCH, PUT, DELETE.
 * @param {Boolean} useToken - Specifies whether token credentials should be used. Defaults to `false`.
 * @param {Object} body - The payload to be sent as the request body.
 * @returns {Object} The fetch options specified based on arity.
 */
export const makeOptions = (method, useToken = false, body = null) => {
  const headers = {
    'Authorization': `Bearer ${getToken()}`,
  };

  const headersJSON = {
    ...headers,
    'Content-Type': 'application/json'
  };

  const nonBody = ['GET', 'DELETE'];
  method = method.toUpperCase();
 let fetchOptions =  {
    method: method || 'GET',
    mode: 'cors',
    credentials: 'include',
    withCredentials: useToken,
    headers: nonBody.includes(method) ? headers : headersJSON
  };
  (body && !(nonBody.includes(method))) && (fetchOptions.body = body);
  return fetchOptions;
};

export function useFetch(url, opts = {}) {
  // const [responseData, setResponseData] = useState(null);
  const responseData = useRef(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(url, opts);
        if(!res.ok) {
          throw new Error('Could not fetch data');
        }
        const payld = await res.json();
        // setResponseData(payld);
        responseData.current = payld.data;
        setIsPending(false);
      } catch(e) {
        setError(e);
        setIsPending(false);
        console.error(e);
      }
    })();
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps
  return [responseData.current, isPending, error];
}