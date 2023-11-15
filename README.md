We want to build a project from scratch like Jira. There, we will have the entity 'task.' The requirements for this entity are as follows:

In a task, there can be static fields (that users cannot remove or add, e.g., id, name, description, status) and 'custom-fields' that users can add as many as they want.

Custom fields can have different types: text, int, date, links to users, etc.

Users will perform CRUD operations, especially listing tasks and filtering them by combinations of static/custom fields.

We may have 1 million or more tasks in one company.

We opted for Elasticsearch as our database solution due to its ability to efficiently handle a large volume of tasks—up to one million, to be precise—each equipped with multiple custom fields. To streamline data retrieval and circumvent the need for repetitive joins between the task and custom fields tables, we leveraged a non-relational database approach.

We can leverage Elasticsearch's powerful search query capabilities to enhance our functionality. To run locally, initiating the command `docker-compose up -d` is essential. This command not only starts Elasticsearch but also launches the Kibana service, allowing us to monitor the data.


To initiate the backend, utilize the `launch.json` within the VSCode file, specifically tailored for the VSCode editor. Meanwhile, executing `npm run dev` brings the frontend to life. It's imperative to copy the `.env-example` file to the project's root, renaming it as `.env` for proper configuration.