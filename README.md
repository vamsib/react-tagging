# React tagging/analytics example using higher-order components

[This example is based on todo example from the redux repository]

Tagging related calls mostly get spread throughout the code whereever a tracking call needs to be made. Tagging being a cross-cutting concern and not actually impacting the actual functionality it is desirable to segregate these calls in a place where they can be maintained better. React higher-order component can be used to shadow any component whose behavior needs to be tracked and tagging calls can be added to this high-order component.

Example: Instead of exporting a TodoItem directly we can wrap it in a tagged higher-order component and export it. the `tag` function takes a set of tag handlers as input. Each handler in this set maps to a function prop of the wrapped component and tracks the behavior defined in that function prop. The tag handlers also get a copy of the wrapped component's props along with the arguments that the function prop itself receives.

```
export default tag({
  deleteTodo(props, id) {
    console.log("TRACK: Delete todo", id)
  },

  editTodo(props, id, text) {
    console.log("TRACK: Edit todo", props.todo.text, id, text)
    if (props.todo.text !== text) {
      console.log("TRACK: Actually edit todo", props.todo.text, id, text)
    }
  },

  completeTodo(props, id) {
    if (props.todo.completed) {
      console.log("Track: un-complete todo", id)
    } else {
      console.log("Track: complete todo", id)
    }
  }
})(TodoItem);

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
# react-tagging
