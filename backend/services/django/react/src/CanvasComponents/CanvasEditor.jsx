import { Stage, Layer } from "react-konva";
import { useState, useRef, useEffect, useMemo } from "react";
import { useUndoRedo } from "../hook/useUndoRedo";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import CanvasRectangleWithText from "./CanvasRectangleWithText";
import CanvasRectangle from "./CanvasRectangle";
import CanvasCircle from "./CanvasCircle";
import CanvasElementForm from "./CanvasElementForm";
import CanvasClippedImage from "./CanvasClippedImage";
import { dataURLtoFile } from "../utils";
import { useCreateTemplate, usePatchTemplate } from "../hook/useTemplate";
import { CiText, CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight, CiImageOn, CiUndo, CiRedo } from "react-icons/ci";
import { CgShapeCircle, CgShapeSquare } from "react-icons/cg";
import { RiBringToFront, RiSendToBack } from "react-icons/ri";
import Navigation from "../components/Navigation";
import Modal from "../components/Modal";

// Canvas Editor
const CanvasEditor = ({ template, mode = 'edit' }) => {
  const [elements, setElements, undo, redo] = useUndoRedo([]);
  const [selectedId, setSelectedId] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const stageRef = useRef();
  const [templateCategory, setTemplateCategory] = useState('regular');
  const { mutate: patchMutate } = usePatchTemplate()
  const { mutate: createMutate } = useCreateTemplate()
  const [show, setShow] = useState(false);

  const mutate = mode === 'edit' ? patchMutate : createMutate

  const dimensions = useMemo(() => {
    if (templateCategory === 'product') {
      return { width: 500, height: 700 }
    } else {
      return { width: 600, height: 600 }
    }
  }, [templateCategory])

  useEffect(() => {
    // Load initial elements from template prop
    if (template?.elements) {
      setElements(template.elements);
      setTemplateName(template.name);
      setTemplateCategory(template.category);
    } else {
      setElements([]);
    }
  }, [template])

  const handleSelect = (id) => setSelectedId(id);

  const handleChange = (newAttrs) => {
    setElements(elements.map(el => (el.id === newAttrs.id ? newAttrs : el)));
  };

  const handleStageClick = (e) => {
    // Deselect if clicking on empty space
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const bringToFront = () => {
    if (selectedId) {
      const updatedElements = elements.filter(el => el.id !== selectedId);
      const selectedElement = elements.find(el => el.id === selectedId);
      updatedElements.push(selectedElement);
      setElements(updatedElements);
    }
  };

  const sendToBack = () => {
    if (selectedId) {
      const updatedElements = elements.filter(el => el.id !== selectedId);
      const selectedElement = elements.find(el => el.id === selectedId);
      updatedElements.unshift(selectedElement);
      setElements(updatedElements);
    }
  };

  const addTextElement = () => {
    setElements([
      ...elements,
      {
        id: `text-${Date.now()}`,
        type: "text",
        content: "New Text",
        x: 50,
        y: 50,
        fontSize: 14,
        textColor: "black",
        textAlign: "center",
        slug: "{{text}}"
      }
    ]);
  };

  const addTextBoxElement = () => {
    setElements([
      ...elements,
      {
        id: `text-box-${Date.now()}`,
        type: "text-box",  // ✅ New type for linked Text & Rectangle
        content: "New Text Box",
        x: 50,
        y: 50,
        width: 150,
        height: 50,
        fontSize: 20,
        align: 'left',
        radius: 0,
        padding: 0,
        bgColor: "#ffffff", // ✅ Background color of rectangle
        textColor: "#000000", // ✅ Text color
        slug: "{{text-box}}"
      },
    ]);
  };

  const addImageElement = () => {
    setElements([
      ...elements,
      {
        id: `image-${Date.now()}`,
        type: "image",
        src: "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg",
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        slug: "{{image}}"
      }
    ]);
  };

  const addRectangle = () => {
    setElements([
      ...elements,
      {
        id: `rect-${Date.now()}`,
        type: "rectangle",
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        radius: 0,
        bgColor: "#444",
        opacity: 50,
        slug: "{{rect}}"
      }
    ]);
  };

  const addCircle = () => {
    setElements([
      ...elements,
      {
        id: `circle-${Date.now()}`,
        type: "circle",
        x: 200,
        y: 200,
        width: 100,
        height: 100,
        bgColor: "#444",
        opacity: 50,
        slug: "{{circle}}"
      }
    ]);
  };

  const addClipImage = () => {
    setElements([
      ...elements,
      {
        id: `image-${Date.now()}`,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        src: "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg",
        radius: 0,
        opacity: 100,
        type: 'clip-image',
        slug: "{{clip-image}}",
        bgColor: '#444',
      },
    ]);
  };

  const saveTemplate = async () => {
    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 0.5 // double resolution
    });
    const file = dataURLtoFile(dataURL, `${templateName}.png`);
    const formdata = new FormData();
    formdata.append('name', templateName);
    formdata.append('image', file);
    formdata.append('elements', JSON.stringify(elements));
    formdata.append('category', templateCategory);
    mutate({ payload: formdata })
    alert("Template saved successfully!");
  };

  const updateTemplate = async () => {
    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 1 // double resolution
    });
    const file = dataURLtoFile(dataURL, `${templateName}.png`);
    const formdata = new FormData();
    formdata.append('name', templateName);
    formdata.append('image', file);
    formdata.append('elements', JSON.stringify(elements));
    formdata.append('category', templateCategory);
    mutate({ payload: formdata, id: template._id })
    alert("Template updated successfully!");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      setElements(
        elements.map((el) =>
          el.id === selectedId ? { ...el, src: reader.result } : el
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    setTemplateCategory(e.target.value)
  }

  return (
    <>

      <Navigation onClick={mode === 'edit' ? updateTemplate : saveTemplate} mode={mode} />

      <div className="layout">
        <div className="toolbar">
          {/* <button onClick={addTextElement}><CiText /></button> */}
          <button onClick={addTextBoxElement}><CiText /></button>

          {/* Text Alignments - wil move to properties*/}


          {/* Shapes */}
          <button onClick={addRectangle}><CgShapeSquare /></button>
          <button onClick={addCircle}><CgShapeCircle /></button>

          {/* Image */}
          <button onClick={addClipImage}><CiImageOn /></button>

          {/* Action - wil move to properties*/}
          {/* <button onClick={undo}><CiUndo /></button>
          <button onClick={redo}><CiRedo /></button>

           */}

        </div>

        <div className="canvas-container">
          <Stage
            ref={stageRef}
            width={dimensions.width}
            height={dimensions.height}
            onMouseDown={handleStageClick}  // 👈 Click anywhere to deselect
            onTouchStart={handleStageClick} // 👈 Works on touch devices too
          >
            <Layer>
              {elements.map(el => {
                if (el.type === "image") {
                  return <CanvasImage key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
                } else if (el.type === "text") {
                  return <CanvasText key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
                } else if (el.type === "text-box") {
                  return <CanvasRectangleWithText key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
                } else if (el.type === "rectangle") {
                  return <CanvasRectangle key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
                } else if (el.type === "circle") {
                  return <CanvasCircle key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
                } else if (el.type === "clip-image") {
                  return <CanvasClippedImage key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />
                }
                return null;
              })}
            </Layer>
          </Stage>
        </div >

        <div className="form-container">
          <CanvasElementForm
            element={elements?.find((el) => el.id === selectedId)}
            onChange={handleChange}
            templateCategory={templateCategory} 
            handleCategoryChange={handleCategoryChange}
            templateName={templateName || template?.name} 
            setTemplateName={setTemplateName}
          />
        </div>
      </div>

      {/* <Modal show={show} title='Template Properties' onClose={() => setShow(false)}>
        <div className="modal-form-container">
          <div className="form-group">
            <label>Replace selected Image</label>
            <input type="file" onChange={handleImageChange} disabled={!selectedId} />
          </div>
          <div className="form-group">
            <label>Template Name</label>
            <input type="text" placeholder="Your template name..." value={templateName || template?.name} onChange={(e) => setTemplateName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" id="category" value={templateCategory} onChange={handleCategoryChange}>
              <option value="regular">Regular</option>
              <option value="product">Product</option>
              <option value="political">Political</option>
            </select>
          </div>
          <div className="button-container">
            {
              mode === 'edit' ?
                <button onClick={updateTemplate}>Update Template</button> :
                <button onClick={saveTemplate}>Save Template</button>
            }
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default CanvasEditor;
