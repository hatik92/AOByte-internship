import './App.css';
import React from 'react';
import FormCustom from './form_validator/FormCustom';
import Posts from './components/Posts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DragDrop/DragDrop";

class App extends React.Component {

  render() {
    return <>
      {/* <Posts />
      <FormCustom /> */}
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <DragDrop />
        </div>
      </DndProvider>
    </>;
  };
}

export default App;
