const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
