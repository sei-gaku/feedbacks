## Feedbacks - Server

The server is built in TypeScript using [nest.js](https://nestjs.com/).

### Wording

The repo tries to stay as close as possible to the proper wording used by Nest.js.

Here are some keywords:

- _Entities_ represent the SQL Tables
- _DTOs_ represent the incoming (input)/outgoing payloads
- _Models_ are linked to the resolvers, they are used to generate the types in the GraphQL schema
- _Interfaces_ are simple TS interfaces, not meant to be used outside the application
- _Resolvers_ will allow linking the GraphQL schema and the data in the db
- _Services_ are mainly used to deal with the DB
- _Modules_ will group all of the above when needed, and allow for simple encapsulation

### Pros and cons so far:

- `+` Full featured
- `+` Organization of the code
- `+` Wording
- `+` Scalable
- `+` Easy to test (partly thanks to the dependency injections)

- `-` Can be complex
- `-` Might look hacky sometimes (decorators, dependency injection, etc...)
