const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('resolved');
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(Math.random() * 5)]);

    // const res = await fetch(
    //   'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
