export async function fetchRecipeFromBackend(input: string): Promise<string> {
  const backendUrl = 'http://localhost:3001/api/generate'; // The default port from generate.mjs
  
  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to fetch recipe from server.';
    try {
      const errorData = await response.json();
      if (errorData.error) errorMsg = errorData.error;
    } catch {
      // Ignore JSON parse error for error response
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data.data; // Server returns { data: "JSON_STRING" }
}
