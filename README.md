## Task: Build a Simple API Proxy Server


### Requirements:

1. Create a Node.js application using Express.js.
2. Implement a single endpoint that acts as a proxy to a public API of your choice (e.g.,
GitHub, Weather API).
3. Add rate limiting:

a. Limit requests to 5 per minute per IP address.

b. Return a 429 status code when the limit is exceeded.

4. Implement basic caching:

a. Cache successful API responses for 5 minutes.

b. Serve cached responses when available.

5. Add error handling for the external API calls.
6. Implement logging for each request, including timestamp, IP address, and rate limit
status.


#### Bonus:

1. Implement a simple authentication mechanism for the proxy endpoint.
2. Make the rate limit and cache duration configurable via environment variables.
