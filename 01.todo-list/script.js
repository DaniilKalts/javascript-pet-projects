const newItemBtn = document.querySelector(".notebook__item-add");
const newItemField = document.getElementById("newItemField");

let todoItems = [];
let lastTodoItemIndex = 1;

// Initialize rows of a notebook
for (let index = 1; index < 10; index++) {
  addNewNotebookItem(index);
}

// Get todo items from local storage
document.addEventListener("DOMContentLoaded", function () {
  todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  for (let index = 0; index < todoItems.length; index++) {
    const item = todoItems[index];
    if (todoItems[index].value.length < 5) {
      todoItems.splice(index, 1);
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
      continue;
    }
    addNewTask(item.value, item.isChecked);
  }
});

function addNewNotebookItem(index) {
  const notebookList = document.querySelector(".notebook__list");
  const li = document.createElement("li");
  li.className = "notebook__item";
  li.dataset.itemId = index;
  notebookList.appendChild(li);
}

function reassignItemIds() {
  const notebookItems = document.querySelectorAll(".notebook__item");
  for (let index = 0; index < notebookItems.length; index++) {
    notebookItems[index].dataset.itemId = index;
    if (notebookItems[index].innerHTML) {
      lastTodoItemIndex = index + 1;
    }
  }
}

function addNewTask(value, isChecked) {
  if (value.length >= 5) {
    const itemFields = document.querySelectorAll(".notebook__item-field");
    for (let index = 1; index < itemFields.length; index++) {
      if (itemFields[index].value === value) {
        console.log(itemFields[index]);
        alert("The task with this name already exists!");
        return;
      }
    }
    const notebookItems = document.querySelectorAll(".notebook__item");

    // Checkbox of a new task
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "notebook__item-checkbox";
    checkbox.checked = isChecked;
    if (isChecked) {
      notebookItems[itemFields.length].classList.add("is-checked");
    }
    checkbox.addEventListener("click", (e) => {
      const notebookItems = document.querySelectorAll(".notebook__item"); // The scope is functional, so we initialize a new variable
      const itemIndex = parseInt(e.target.parentNode.dataset.itemId);
      notebookItems[itemIndex].classList.toggle("is-checked");
      todoItems[itemIndex - 1].isChecked = e.target.checked;
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    });

    // textInput with text content of a new task
    const textInput = document.createElement("input");
    textInput.className = "notebook__item-field";
    textInput.value = value;
    textInput.placeholder = "Todo...";
    textInput.minLength = 5;
    textInput.maxLength = 40;
    textInput.addEventListener("focusin", (e) => {
      const removeItemButtons = document.querySelectorAll(
        ".notebook__item-remove"
      );
      const itemIndex = parseInt(e.target.parentNode.dataset.itemId) - 1;
      removeItemButtons[itemIndex].hidden = false;
    });
    textInput.addEventListener("focusout", (e) => {
      const removeItemButtons = document.querySelectorAll(
        ".notebook__item-remove"
      );
      const itemIndex = parseInt(e.target.parentNode.dataset.itemId) - 1;
      setTimeout(() => {
        removeItemButtons[itemIndex].hidden = true;
      }, 500); // A small pause, to let user click on remove button
    });
    textInput.addEventListener("input", () => {
      const itemIndex = parseInt(textInput.parentNode.dataset.itemId) - 1;
      todoItems[itemIndex].value = textInput.value;
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    });

    // Delete button to remove a new task
    const removeButton = document.createElement("button");
    removeButton.className = "notebook__item-remove";
    removeButton.innerHTML += `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 6.00012L11.71 1.71012C11.8983 1.52182 12.0041 1.26643 12.0041 1.00012C12.0041 0.733823 11.8983 0.478428 11.71 0.290124C11.5217 0.101821 11.2663 -0.00396729 11 -0.00396729C10.7337 -0.00396729 10.4783 0.101821 10.29 0.290124L6 4.59012L1.71 0.290124C1.5217 0.101821 1.2663 -0.00396729 1 -0.00396729C0.733698 -0.00396728 0.478304 0.101821 0.29 0.290124C0.101696 0.478428 -0.00409174 0.733823 -0.00409174 1.00012C-0.00409174 1.26643 0.101696 1.52182 0.29 1.71012L4.59 6.00012L0.29 10.2901C0.196272 10.3831 0.121877 10.4937 0.0711088 10.6155C0.0203401 10.7374 -0.00579834 10.8681 -0.00579834 11.0001C-0.00579834 11.1321 0.0203401 11.2628 0.0711088 11.3847C0.121877 11.5066 0.196272 11.6172 0.29 11.7101C0.382963 11.8039 0.493564 11.8782 0.615423 11.929C0.737282 11.9798 0.867988 12.0059 1 12.0059C1.13201 12.0059 1.26272 11.9798 1.38458 11.929C1.50644 11.8782 1.61704 11.8039 1.71 11.7101L6 7.41012L10.29 11.7101C10.383 11.8039 10.4936 11.8782 10.6154 11.929C10.7373 11.9798 10.868 12.0059 11 12.0059C11.132 12.0059 11.2627 11.9798 11.3846 11.929C11.5064 11.8782 11.617 11.8039 11.71 11.7101C11.8037 11.6172 11.8781 11.5066 11.9289 11.3847C11.9797 11.2628 12.0058 11.1321 12.0058 11.0001C12.0058 10.8681 11.9797 10.7374 11.9289 10.6155C11.8781 10.4937 11.8037 10.3831 11.71 10.2901L7.41 6.00012Z" fill="#999999" />
      </svg>
    `;
    removeButton.hidden = true;
    removeButton.addEventListener("click", () => {
      const notebookItems = document.querySelectorAll(".notebook__item"); // The scope is functional, so this is a complete new variable
      const itemIndex = parseInt(removeButton.parentNode.dataset.itemId);
      const removeItem = notebookItems[itemIndex];
      removeItem.remove();
      todoItems.splice(itemIndex - 1, 1);

      if (todoItems.length) {
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
      } else {
        localStorage.removeItem("todoItems");
      }

      reassignItemIds(); // Reassign data item ids
      if (notebookItems.length < 11) {
        addNewNotebookItem(notebookItems.length - 1);
      }
    });

    // Add these nodes to a new task
    if (lastTodoItemIndex + 1 === notebookItems.length) {
      addNewNotebookItem(lastTodoItemIndex + 1);
    }

    notebookItems[lastTodoItemIndex].append(checkbox);
    notebookItems[lastTodoItemIndex].append(textInput);
    notebookItems[lastTodoItemIndex].append(removeButton);
    if (!Object.keys(todoItems).find((key) => todoItems[key].value === value)) {
      todoItems.push({
        value: value,
        isChecked: false,
      });
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }

    // Reset styles of new item field and button
    lastTodoItemIndex += 1;
    newItemField.value = "";
    newItemBtn.style.color = "#666";
  } else if (newItemField.value.length < 5) {
    alert("The task should be at least 5 characters long.");
  } else {
    alert("You should fill in the text for a new task.");
  }
}

// Change color of a new task button
newItemField.addEventListener("input", () => {
  if (newItemField.value.length) {
    newItemBtn.style.color = "#000";
  } else {
    newItemBtn.style.color = "#666";
  }
});

// Add a new task when press enter on upper field
newItemField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask(newItemField.value, false);
  }
});

// Add a new task when click on plus button
newItemBtn.addEventListener("click", () => {
  addNewTask(newItemField.value, false);
});
