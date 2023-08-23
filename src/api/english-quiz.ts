export async function fetchData() {
  try {
    const response = await fetch('http://172.27.27.82:8001/proxy/interview.mock.data/payload.json');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error fetching data');
  }
}
  