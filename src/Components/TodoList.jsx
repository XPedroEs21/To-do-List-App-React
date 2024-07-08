import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);                       // An array of todo items. Initialize it with an empty array [], indicating that there are no todo items initially
  const [headingInput, setHeadingInput] = useState ('');        //Array to represent the value entered by user into an input field for adding a new heading for a todo item. Initialize it as an empty string 
  const [listInput, setListInput] = useState ('');              //Create an empty string representing the value entered into an input field to add a new list item within a todo item

  const handleAddTodo = () => {
    if (headingInput.trim() !==''){                             //Checks if the headingInput variable, a piece of text input from the user, is empty after trimming any whitespace characters from the beginning and end. This condition ensures that the user has entered some content before proceeding.
      setTodos([...todos, {heading: headingInput, lists: []}]); //If the condition in the if statement is met, this line updates the state variable todos. It spreads the existing todos array (todos) into a new array using the spread syntax (…todos) and appends a new object to it. The new object contains a heading property set to the value of headingInput and a lists property initialized as an empty array.
      setHeadingInput('');                                      //After adding a new todo item, this line clears the headingInput state variable, resetting the text input field for the user to enter a new todo item heading.
    }
  };

  const handleAddList = (index) => {                            //Declares a constant named handleAddList and assigns it an arrow function that takes an index parameter.
    if (listInput.trim() !=='') {                               //Checks if the listInput variable, a piece of text input from the user for adding a new list item, is empty after trimming any leading or trailing whitespace. This condition ensures that the user has entered some content before proceeding.
      const newTodos = [...todos];                              //Creates a shallow copy of the todos array using the spread syntax (…todos). The copy is made to avoid directly mutating the state, which is a best practice in React.
      newTodos[index].lists.push(listInput);                    //Accesses the todo item at the specified index in the newTodos array and pushes the value of listInput into its lists array. This push assumes that each todo item has a lists property, an array containing the items within that todo.
      setTodos(newTodos);                                       //After updating the newTodos array with the new list item, the setTodos function, a state updater function provided by React's useState hook, updates the state variable todos with the modified array.
      setListInput('');                                         //Finally, this function resets the listInput state variable, clearing the text input field for adding new list items.
    }
  };

  const handleDeleteTodo = (index) => {                         //Declares a constant named handleDeleteTodo that has an arrow function which takes an index parameter, indicating the index of the todo item to be deleted.
    const newTodos = [...todos];                                // Creates a shallow copy of the todos array using the spread syntax (…todos). This step is crucial to avoid directly mutating the original state.
    newTodos.splice(index,1);                                   //The splice method is called on the newTodos array to remove one element at the specified index.
    setTodos(newTodos);                                         //Finally, the setTodos function, provided by React's useState hook, is called with the updated newTodos array as an argument. This updates the state variable todos with the modified array, removing the todo item specified by the index from the UI and re-rendering the component accordingly.
  };
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>

        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}                                  //Binds the value of the 'input' field to the 'headingInput' state variable.
            onChange={(e) => {setHeadingInput(e.target.value);}}  //Add onChange event handler to update headingInput state
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>

      <div className="todo_main">
        {todos.map((todo, index) => (                             //Maps over the todos array, which contains todo items.The map() function executes the specified function for each todo item in the array.
          <div key={index} className='todo-card'>                 {/*For each todo item, a div element with the class todo-card is rendered. The key attribute is set to index to identify each to-do item within the list uniquely.*/}
            <div className='heading-todo'>
              <h3>{todo.heading}</h3>                             {/*Within each todo-card div, the heading of the current todo item is displayed using an <h3> element. The heading text is retrieved from the heading property of the todo object. */}
              <button className='delete-button-heading' onClick={handleDeleteTodo}>Delete Heading</button>   {/*Each todo item is accompanied by a "Delete Heading" button. When clicked, this button triggers the handleDeleteTodo function, passing the index of the current todo item as an argument. The index allows the function to identify and delete the corresponding todo item from the todos array. */}
            </div>
            <ul>
            {todo.lists.map((list, listIndex)=> (                 //This JSX code snippet renders a list of items within a todo item. It utilizes the map function to iterate over the lists array of the todo object (representing a todo item
              <li key={listIndex} className='todo_inside_list'>   {/*For each item in the lists array, it generates a <li> element with a unique key attribute set to listIndex to ensure proper rendering and performance optimization. */}
                <p>{list}</p>                                     {/*Inside each <li> element, it displays the list item' content wrapped in a <p> element. */}
              </li>
            ))}
            </ul>    
              <div className='add-list'>
                <input                                             //for entering the text of the new list item, with its value bound to the listInput state variable.
                type='text'
                className='list input'
                placeholder='Add List'
                value={listInput}
                onChange={(e)=>setListInput(e.target.value)}       //includes an onChange event handler for an input element. When the value of the input changes, the event (e) is captured, and the setListInput function is called with the new value obtained from e.target.value, updating the state variable listInput with the new value.
                />
                <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button> {/*In addition, there is a <button> labeled “Add List” that triggers the handleAddList function with the current index value as its parameter on click, to add the entered list item to the todo item at the specified index in the todos array. */}
              </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default TodoList;
