import React, { useState } from "react";
import Images from "../asset/images.png";
import "./Todo.css";

const Todo = () => {
  const [inputData, setInputData] = useState();
  const [item, setItem] = useState([]);
  const [checklist, setCheckList] = useState(false);
  const [tooglebtn, settooglebtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState();
  const addItem = (e) => {
    if (!inputData) {
      alert("please fill data");
    } else if (inputData && !tooglebtn) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setInputData("");
      settooglebtn(true);
      setIsEditItem("");
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItem([...item, allInputData]);

      setInputData("");
    }
  };
  const onCheck = () => {
    setCheckList(!checklist);
  };
  const deleteItem = (id) => {
    console.log(id);
    const updateItem = item.filter((elem) => {
      return elem.id !== id;
    });
    console.log(updateItem);
    setItem(updateItem);
  };
  const remove = () => {
    setItem([]);
  };
  const editItem = (id) => {
    const updatedItems = item.find((elem) => {
      return elem.id === id;
    });
    console.log(updatedItems);
    setInputData(updatedItems.name);
    settooglebtn(false);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img className="imgs" src={Images} alt="file"></img>
            <figcaption className="fig">ADD Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              onChange={(e) => {
                setInputData(e.target.value);
              }}
              value={inputData}
            />
            {tooglebtn ? (
              <i
                className="fa fa-plus add-btn"
                title="Add item"
                onClick={addItem}
                onDoubleClick={remove}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Edit item"
                onClick={addItem}
              ></i>
            )}
          </div>
          {checklist && (
            <div className="showItems">
              {item.map((val) => {
                return (
                  <div className="eachItem" key={val.id}>
                    <h3>{val.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        title="Edit item"
                        onClick={(e) => {
                          editItem(val.id);
                        }}
                      ></i>

                      <i
                        className="far fa-trash-alt add-btn"
                        title="Delete item"
                        onClick={(e) => {
                          deleteItem(val.id);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="check List"
              onClick={onCheck}
            >
              <span>Hello</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
