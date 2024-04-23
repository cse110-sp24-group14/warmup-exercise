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
    description.textContent = task.description;

    // if completed, strikethrough
    if (completed) {
        description.style.textDecoration = "line-through";
    }

    // append to row
    row.appendChild(date);
    row.appendChild(description);

    return row;
}

fetchJson('./tasks.json');