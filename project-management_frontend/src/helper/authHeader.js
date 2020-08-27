/**
 * Returns required Authorization header for making requests.
 *
 */
export default function () {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
