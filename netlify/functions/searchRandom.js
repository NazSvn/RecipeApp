export const handler = async () => {
  try {
    // eslint-disable-next-line no-undef
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API response not ok:', response.status, errorData);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch recipes',
        details: error.message,
      }),
    };
  }
};
