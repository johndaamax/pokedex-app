const BASE_GQL_API = 'https://beta.pokeapi.co/graphql/v1beta';

export async function pokeApiGraphQLFetch(query, variables = {}) {
    const response = await fetch(
        BASE_GQL_API,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Method-Used': 'graphiql'
            },
            body: JSON.stringify({ query, variables })
        }
    )
    const data = await response.json()
    return data
}