export const fetchData = (url, method = 'GET', body = null, successCallback, errorCallback) => {
  const options = { method: method, body: body ? JSON.stringify(body) : null}

  if(url) {
    fetch(url, options).then(res => {
      if(!res.ok) {
        throw new Error('Error fetching data 🫣')
      }
      return res.json()
    }).then(data => {
      console.log('🆗', data)
      successCallback(data)
    }).catch(err => {
      errorCallback(err)
    })
  }
}
