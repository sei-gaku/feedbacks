Entities are representations of the SQL Table (or any other db)
DTOs are representations of the incoming/outgoing payloads
Models are linked to the resolvers, they are used to generate the types in the GraphQL schema
Resolvers will allow linking the GraphQL schema and the data in the db
Services are mainly used to deal with the DB
Modules will group all of the above when needed, and allow for simple encapsulation
