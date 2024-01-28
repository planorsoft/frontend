# frontend

Frontend application for planorsoft. React, Redux and Shadcn UI used for project. Every component is abstracted into its own folder into containers. in components folder, there are reusable components that are used in multiple places. constants folder responsible for storing constants. hooks folder contains custom hooks.

### Development

If your first time running the app, you need to install the dependencies first.

```bash

cd frontend
npm install

```

After that, you can run the app with the following command.

```bash

npm run dev

```


### Deployment

Deployed using [Render](https://render.com/), when a commit is pushed to the `main` branch, the app is automatically deployed.