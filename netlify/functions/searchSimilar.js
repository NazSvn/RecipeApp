export const handler = async (event) => {
  try {
    const { query, number = 10 } = event.queryStringParameters;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Recipe ID (query) is required' }),
      };
    }

    // eslint-disable-next-line no-undef
    const url = `https://api.spoonacular.com/recipes/${query}/similar?number=${number}&apiKey=${process.env.SPOONACULAR_API_KEY}`;

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
        error: 'Failed to fetch similar recipes',
        details: error.message,
      }),
    };
  }
};
