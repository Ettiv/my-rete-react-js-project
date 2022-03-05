import React, { useState, useEffect, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import NumComponent from "../Components/NumComponent/NumComponent";
import CompareComponent from "../Components/CompareComponent/CompareComponent";
import FlashlightComponent from "../Components/FlashlightComponent/FlashlightComponent";
import ContextMenuPlugin from 'rete-context-menu-plugin';
import DelayCpmponent from "../Components/DelayCpmponent/DelayCpmponent";

export const createEditor = async (container) => {
  const components = [new NumComponent(), new CompareComponent(), new FlashlightComponent(), new DelayCpmponent()];

  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin);

  const engine = new Rete.Engine("demo@0.1.0");

  components.map((component) => {
    editor.register(component);
    engine.register(component);
  });

  const jsonEditor = JSON.parse(localStorage.getItem('jsonEditor'));
  await editor.fromJSON(jsonEditor);

  // const number1 = await components[0].createNode();
  // const number2 = await components[0].createNode();
  // const compare = await components[1].createNode();
  // const flashlight = await components[2].createNode();


  // number1.position = [200,200];
  // number2.position = [200,400];
  // compare.position = [600,300];
  // flashlight.position = [1000,300];

  // editor.addNode(number1);
  // editor.addNode(number2);
  // editor.addNode(compare);
  // editor.addNode(flashlight);

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
      const jsonEditor = JSON.stringify(editor.toJSON());
      localStorage.setItem('jsonEditor', jsonEditor);
    }
  );

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);

  return editor;
}

export const useRete = () => {
  const [container, setContainer] = useState();
  const editorRef = useRef();

  useEffect(() => {
    if (container) {
      createEditor(container).
        then((editor) => {
          console.log('Editor created');
          editorRef.current = editor;
        })
    }
  }, [container]);

  useEffect(()=>{
    return ()=> {
      if(editorRef.current){
        console.log('Editor destoyed');
        editorRef.current.destroy();
      }
    }
  }, []);

  return [setContainer];
}