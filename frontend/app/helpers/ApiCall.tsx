import { useEffect, useState } from "react";


export const callAPI = async (url: string, params: any, setData: any=undefined) => {
  await fetch(
    url,
    {
      ...params,
      headers: {
        "Content-Type": "application/json"
      }
    },
  ).then(response => response.json().then(data => setData && setData(data))
  ).catch(e => console.log('error', e));
}

export const ApiCall = <T,>(url: string, params: any): [T|undefined, any] => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    (async () => {
      await fetch(
        url,
        {
          ...params,
          headers: {
            "Content-Type": "application/json"
          }
        },
      ).then(response => {
        if (response.status.toString().startsWith('2')) {
          response.json().then(data => setData(data))}
        }
      ).catch(e => console.log('error', e));
    })();
  }, []);
  return [data, setData];
}