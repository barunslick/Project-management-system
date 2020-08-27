/**
 * Checks if the respone from an api is valid and returns parsed data.
 *
 * @param {*} response
 */
export default function (response) {
  return response.text().then((result) => {
    const data = result && JSON.parse(result);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
