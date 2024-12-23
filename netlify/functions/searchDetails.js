export const handler = async (event) => {
  try {
    // Log to help debug
    console.log('Request parameters:', event.queryStringParameters);

    const { recipeId } = event.queryStringParameters;

    if (!recipeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Recipe ID (query) is required' }),
      };
    }

    // eslint-disable-next-line no-undef
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    console.log(
      'Fetching from URL:',
      // eslint-disable-next-line no-undef
      url.replace(process.env.SPOONACULAR_API_KEY, 'HIDDEN'),
    );

    const response = await fetch(url);

    // Check if the response is ok
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
