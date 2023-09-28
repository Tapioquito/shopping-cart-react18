import "./App.css";
import groceryCartImage from "./assets/images/grocery-cart.png";
import { useState, useEffect } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems]);
  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];

        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue
        );

        if (itemIndex === -1) {
          updatedGroceryList.push({
            id: groceryItems.length + 1,
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }
        setGroceryItems(updatedGroceryList);

        setInputValue("");
        determineCompletedStatus();
      }
    }
  };

  const mapGroceries = () => {
    return groceryItems.map((g, idx) => (
      <li key={g.id}>
        <div className="container">
          <input
            type="checkbox"
            value={g.completed}
            checked={g.completed}
            onChange={(event) => {
              handleUpdateCompleteStatus(event.target.checked, idx);
            }}
          />
          <p>
            {g.name} {g.quantity > 1 && <span>x {g.quantity}</span>}
          </p>
        </div>
        <div>
          <button
            className="remove-button"
            onClick={() => handleDeleteItem(g.id)}
          >
            X
          </button>
        </div>
      </li>
    ));
  };
  const handleDeleteItem = (id) => {
    const updatedGroceryList = [...groceryItems];
    const itemIndex = updatedGroceryList.findIndex((item) => item.id === id);
    if (updatedGroceryList[itemIndex].quantity > 1) {
      updatedGroceryList[itemIndex].quantity--;
    } else {
      updatedGroceryList.splice(itemIndex, 1);
    }
    setGroceryItems(updatedGroceryList);
  };
  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
    determineCompletedStatus();
  };
  const determineCompletedStatus = () => {
    if (!groceryItems.length) {
      setIsCompleted(false);
    }
    let isAllCompleted = true;
    groceryItems.forEach((item) => {
      if (!item.completed) {
        isAllCompleted = false;
      }
      setIsCompleted(isAllCompleted);
    });
  };
  return (
    <main className="App">
      <div>
        {isCompleted && <h4 className="success"> You're done!</h4>}

        <div>
          <h1 className="header">Shopping List</h1>
          <img src={groceryCartImage} alt="Shopping Cart" />
          <input
            className="item-input"
            type="text"
            placeholder="Type your products"
            onChange={handleChangeInputValue}
            onKeyDown={handleAddGroceryItem}
            value={inputValue}
          />

          <ul>{mapGroceries()}</ul>
        </div>
      </div>
    </main>
  );
}

export default App;
