## Feedbacks

Monorepo for the Feedbacks project, more information regarding the client can be found [here](https://github.com/gaku-sei/feedbacks/blob/master/packages/client/README.md).
The server's readme is [here](https://github.com/gaku-sei/feedbacks/blob/master/packages/server/README.md).

### Assumptions

The whole project is an mvp, with a minimal set of meaningful features.
It allows the employees to login, and to check the reviews they wrote, additionally to the reviews
other employees wrote about them.
The admins can manage the employees, and the reviews.

#### Business

- An admin is a superset of an employee (i.e. an admin has the same rights as an employee + employee management)
- Admins can, also, create admins
- It's possible to write several reviews for one employee
- It's possible to have several feedbacks for one review
- The project is a profesional project used mainly at work with a desktop...

#### Technical

- ... responsive is, therefore, not a must have (but a very nice to have) feature

### Technical choices

The schedule being a bit tight, I tried to choose tools I am comfortable with, allowing me to implement the features quickly and properly.
That being said, I also wanted to challenge myself a bit, and went for some more "exotic" tools (like [Nest.js](https://nestjs.com/))!
Scalability was also a key word for this project, since this kind of application have to be bootstrapped quickly, but might grow in the future.

Here is the stack:

#### Back-end

- _SQLite_ very simple to scaffold project, and most (if not all) of the SQL queries in this project are compatible with MySql/PostgreSql
- _TypeScript_ even though the typings are far from being perfect in TypeScript, it's a good compromise between simplicity, safety, and "very close to the Node.js ecosystem"
- _Node.js + nest.js_ for such a project, there is no need for an heavy framwork, so I focused on mainly Go or Node.js.
  Even if I'm accustomed to Express, I wanted to learn a new framework, and I really liked what Nest.js had to offer:
  rich ecosystem, good integration with both the db ([typeorm](https://typeorm.io/)) and GraphQL ([type-graphql](https://typegraphql.ml/)) out of the box,
  scalability, good practices, etc...
  I added some review in the [server](https://github.com/gaku-sei/feedbacks/blob/master/packages/server/README.md)'s readme.
- _GraphQL_ I tend to see GraphQL as a very simple, and well organized implementation of the RPC pattern.
  I will not list the benefits of GraphQL (smaller payloads, dead simple API for the clients, etc...), but will focus on how, and why I chose it:
  - Schema (and types) is a very effective way to ease and strengthen the communication between the server and its clients (à la proto, thrift, etc...)
  - Code generation for both the back-end and the front-end
  - The exposed queries and mutations are extremely close to the business, and will lower the amount of errors.
    For instance, what if I wanted to get all the reviews written about me?
    In rest it could look like this: `/review?target_id=[my_id or a magic keyword like "me"]`,
    in GraphQL it's as simple as: `reviewsAboutMe`.
    Simpler and safer.

#### Front-end

- _React_ I like what Svelte has to offer, I would consider using Vue, Angular, or Marko one day, and I like super small
  projects like Mint or Imba... But React still has my preference
- _TypeScript_ for consistency with the server
  (I was planning to use ReasonMl but it's harder to use within a team used to JavaScript, and it takes more time to defined the bindings)
- _Ant_ because it's not material! All jokes aside, it offers a lot of nice components (even though I'm not a huge of some component's API)
- _Hooks_ which offer a simple way to interact with the "outside world" (side effects in general like the requests, the dom, etc...),
  and help me to manage the state
- _No Redux_ the application is small enough for now and. If one day a bigger state manager is needed, with one state, etc...
  Redux would integrate nicely with the current architecture thanks to the hooks exposed by React Redux
- _Navi_ offers some handy hooks (for consistency), and it's a good opportunity to try it a bit!

### Improvements

- More unit and integration tests. End to end testing is extremely useful to validate the workflows, but will not
  ensure that the business logic is properly implemented
- Security. I mean, an admin, when creating an other employee/admin, will have to fill both the email _and_ the password.
  A proper sign up/sign in system with emails, etc... will be needed soon.
- JWT is fine and allows some simple stateless (on the server side) "session" management, but it's a bit unsafe
- Implement custom UI components
