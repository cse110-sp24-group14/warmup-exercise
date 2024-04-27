/**
 * function iterates over tasks from JSON file
 * Sortes the tasks by due date
 * returns an array of JSON objects sorted by due date
 * 
 */
function populate_table_by_date() {
  const parsed_dates = [];
  fetch("tasks.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => {
        parsed_dates.push({
          id_val: task.id,
          title_val: task.title,
          descriptions_val: task.descriptions,
          date_val: new Date(Date.parse(task.due_date)),
          completed_val: task.completed,
        });
      });
      parsed_dates.sort((a, b) => a.date_val - b.date_val);
    });
    return parsed_dates;
}

/**
 * Changes the visibility of elements based on the selected radio button value.
 * If the value is 'btnDate', displays the viewByDate element and hides viewByCompletion;
 * otherwise, displays viewByCompletion and hides viewByDate.
 * 
 * @param {HTMLInputElement} radio - The radio button element whose value determines the view.
 */
function showView(radio) {
  if (radio.value == 'btnDate') {
      document.getElementById('viewByDate').classList.remove('hidden');
      document.getElementById('viewByCompletion').classList.add('hidden');
  } else {
      document.getElementById('viewByDate').classList.add('hidden');
      document.getElementById('viewByCompletion').classList.remove('hidden');
  }
}

/**
 * Opens the link to GitHub team contact page.
 */
function openContactLink() {
  window.open('https://github.com/cse110-sp24-group14/cse110-sp24-group14/blob/main/admin/team.md', '_blank');
}

/**
 * Fetch data from json file and add to table
 * 
 * @param {String} file
 */
const fetchJson = (file) => {
  fetch(file)
      .then(data => data.json())
      .then(json => {
          populateTable(json);
      })
      .catch((err) => console.error(err));
}

/**
* Adds all the tasks to their corresponding table
* 
* @param {JSON} taskList
*/
const populateTable = (taskList) => {
  // go through each task and create a row

  const taskCount = {"incomplete": 0, "complete": 0};

  taskList.forEach((task) => {
      // gets table that the task belongs to
      const completeBool = task.completed ? "complete" : "incomplete";

      const tableId = `${completeBool}-table`;
      const table = document.getElementById(tableId);

      const row = createRow(task, task.completed);
      table.appendChild(row);

      // count number of each task
      taskCount[completeBool] += 1;
  })

  // update the count of both types of tasks
  for (let count in taskCount) {
      const title = document.getElementById(`${count}-title`);
      title.textContent += ` (${taskCount[count]})`;
  }
}

/**
* Creates a row with the input task's information
* 
* @param {Object} task
* @returns row element to be added to the table
*/
const createRow = (task, completed) => {
  // create a row element
  const row = document.createElement('tr');

  // date of task
  const date = document.createElement('td');
  // get in format MM/dd
  date.textContent = new Date(task.due_date).toLocaleString(undefined, {
      month: "numeric", day: "numeric"
  })

  // description of task
  const description = document.createElement('td');
  description.textContent = new Date(task.due_date).toLocaleString(undefined, {
      month: "numeric", day: "numeric"
  }) + " | " + task.description;

  // if completed, strikethrough
  if (completed) {
    if (completed) {
        description.style.textDecoration = "line-through";
        description.style.textDecoration = "line-through";
    }
  }

  row.appendChild(description);

  return row;
}

fetchJson('./tasks.json');