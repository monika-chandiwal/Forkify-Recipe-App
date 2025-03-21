const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData) {
  try {
    //console.log('sendJSON', url);
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(5)]);
    console.log('res : ', res);
    // const res = await fetch(
    //   'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );

    const data = await res.json();
    console.log(' data  : ', data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //console.log(data);
    return data;
  } catch (err) {
    console.log('sendJson', err);
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    console.log('getJSON', url);
    const res = await Promise.race([fetch(url), timeout(5)]);
    console.log('res : ', res);
    // const res = await fetch(
    //   'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );
    const data = await res.json();
    console.log(' data  : ', data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    console.log('sendJSON', url);
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(5)]);
    console.log('res : ', res);
    // const res = await fetch(
    //   'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );

    const data = await res.json();
    console.log(' data  : ', data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //console.log(data);
    return data;
  } catch (err) {
    console.log('sendJson', err);
    throw err;
  }
};
*/
