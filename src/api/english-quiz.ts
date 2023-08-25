export async function fetchData() {
  try {
    const proxyUrl = process.env.REACT_APP_PROXY_URL || 'http://localhost:8001/';
    const response = await fetch(proxyUrl + 'proxy/interview.mock.data/payload.json');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error fetching data');
  }
}
