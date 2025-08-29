# GoDaddyRepos
Displays details of public repos at GoDaddy

## Demo
https://github.com/user-attachments/assets/0f38a864-25bc-4158-b4e2-b3a72a2cf70e

## Installation
### Node environment
- [Install node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Check node and npm versions post installation
  ```
  node -v
  ```
  This project was built on v18.16.1
  ```
  npm -v
  ```
  This project was built on npm 9.5.1
- Alternatively, install yarn

### Project setup
- Clone Repo: `git clone https://github.com/Priyamvada/GoDaddyRepos.git`
- Navigate to project root and install dependencies
  ```
  cd godaddy-repos-client
  npm install
  ```
- Start the node server. This may take a few minutes the first time
  ```
  npm start
  ```

### Launch Project
Navigate to http://localhost:3000/ . The following 2 pages exist:
1. **Main Page**
This enlists all the GoDaddy public repos in a clickable tabular format

| Success | Error |
| --- | --- |
| <img width="1989" height="1339" alt="image" src="https://github.com/user-attachments/assets/1df9ba1f-34af-4b69-bcc6-d4be14bf0d8a" /> | <img width="1244" height="876" alt="image" src="https://github.com/user-attachments/assets/88ad8875-3f1f-4b00-b51e-284af9fa342a" /> |



3. **Repo Details Page**
This can be navigated to in 2 different ways:
- **Click** on the desired repo on the Main page -- provides a way to navigate to main page to view all repositories, in the header section
- As a **Deep Link** with the format `http://localhost:3000/repoDetails/<repo_name>`. (Eg: http://localhost:3000/repoDetails/gdapi-ui) -- with this option, there is no quick link to navigate back to main page

| Success | Error |
| --- | --- |
| <img width="1246" height="765" alt="image" src="https://github.com/user-attachments/assets/d4823457-d3f8-4c81-9126-81bb7c2a9043" /> | <img width="1246" height="670" alt="image" src="https://github.com/user-attachments/assets/2592132b-493d-4126-81b8-f5914db4988c" /> |



## Design Decisions
### Languages and Libraries
- **Typescript** with jsx (tsx) is chosen as opposed to Javascript based react, to maintain cleaner and more type-safe code. Files that do not use jsx such as styling, typing, data provider and utils files are of extension type `.ts`.
- **react-router-dom** - standard library for performing routing within react applications
- **react-hooks** - Provide a clean way of writing less, achieving more, via functional react components rather than older class based explicit state managed components. Hooks used in this project include useState, useEffect, useNavigate, useLocation and useParams
- **axios** - This was chosen to make API calls to api.github.com in a clean async way.
- **moment** - This was chosen to safely parse UTC date-timezone fields in the API responses to a more readable format. An alternative would be to use native Date objects in javascript. But moment is more robust in terms of strings it can parse, provides more formats and better cross-browser compatibility

### Code architecture
Router scope and routes are defined in App.tsx .
The source code is bundled under various modules under *src*
1. **components** contains the UI widgets used in the application.
   - `ListView` - A stateless list view component to render objects of user defined type `ListItem`. It supports custom cell rendering as well as styling of header and normal cells. Internally it uses the `<table>` HTML tag. The header row `<th>` is sticky, allowing user to to scroll through long lists without losing sight of the header
   - `PageHeader` - A stateless component rendering title and subtitle of the current page with `display: sticky` to ensure it stays at top during scroll.
   - `Toast` - A simple stateless component to render toasts. In the project, it is being used purely to render error states.
   - `LoadingSpinner` - A simple stateless loading spinner. This component is contained within a single LoadingSpinner.tsx file. (Unlike the other components which are within their individual modules)
2. **data** contains data providers that make API calls for the application and return data in typed consumable format. In this case, `fetchRepoList` and `fetchRepoByName` for the Main and repo details pages respectively. The providers return data in objects of type `RepoList` which maps all the fields sent from server to `RepoItem` objects (snake case -> camel case)
3. **pages** contains the various navigational end points of the project.
   - The **MainPage** renders the list of repositories through a wrapper around `ListView` called `ReposListView`. The default route of the app `/` routes to this page
     - **ReposListView** - makes *aync* API call through repoListDataProvider and converts the items from `RepoItem` -> `ListItem`. Custom fields are added as key value pairs to each `listItem.data` It also contains a few style overrides and column definitions for fields of `listItem.data` that need to be rendered
   - The **RepoDetailsPage** can act in a both stateful and stateless manner. It is invoked as a stateless component when called by clicking repository list items on the Main page. Since the details page can also be accessed via deep link route: `/repoDetails/:repoName`, this page is eqipped to also fetch data via the data provider API call. This page consumes `RepoItem` object directly to present infomation in flex columns
4. **assets** - contains icons (for various programming languages) and generic fonts and colour constants
5. **utils** - data parsing and date utils

#### Modularisation
Each *component* and *page* exists in its own folder. Typical files within each `Component` folder include
1. `ComponentName.tsx` - the actual react exported component
2. `componentName.types.ts` - the various user defined types and props to be used in the component. `ComponentNameProps` interfaces are declared here
3. `componentName.styles.ts` - the various styles to be included in the component. No specific library has been used for styling as the project is fairly simple and we don't need over-engineering. Styles are exported as `React.CSSProperties` that cn be directly consumed as `styles` in the corresponding jsx
4. `index.ts` - exports only `ComponentName` and other essential classes/interfaces as module exports to keep clean and regulated external consumption. (Encapsulation)
5. `componentName.test.tsx` - jest test cases for the component

### Testing
- **jest** is the framework of choice for testing simply because I am familiar with it. Following third party dev dependencies are used to support jest with typescript:
  @babel/preset-react, @babel/preset-typescript, @jest/globals, @testing-library/jest-dom, @testing-library/react, ts-node, ts-jest
- jest comes with its own mocker that helps mock 'axios'
- Basic data validation testcases written are only for the high level components (pages) - Main Page and Repo Details Page
#### How to run?
```
npm test
```

### Aspects Skipped due to time constraints
1. Search box, sorting and filtering logic in the list view
2. Better error messages displayed in case of failure
3. Adoption of redux or react context for storing API response of the master API
4. Writing more detailed test cases at the individual widget component level
5. Using flex columns and rows instead of HTML `<table></table>` for the `ListView`. This provides greater precision and control over aspects such as column widths, virtualization, etc
6. Virtualization of master list of repos. If reponse size of API is too large, absence of virtualization will make the DOM significantly slower
7. More consolidated styling with better style constant names
8. Better rules followed while defining styles
9. Non hacky method for keeping header row of table floating
