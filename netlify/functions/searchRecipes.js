export const handler = async (event) => {
  try {
    const { query = '', number = 18 } = event.queryStringParameters;

    const response = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}&number=${number}`,
    );

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
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipes' }),
    };
  }
};
