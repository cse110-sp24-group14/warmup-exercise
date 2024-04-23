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
    taskList.forEach((task) => {
        // gets table that the task belongs to
        const tableId = (task.completed ? "" : "in") + "complete-table";
        const table = document.getElementById(tableId);

        const row = createRow(task);
        table.appendChild(row);
    })
}

/**
 * Creates a row with the input task's information
 * 
 * @param {Object} task
 * @returns row element to be added to the table
 */
const createRow = (task) => {
    // create a row element
    const row = document.createElement('tr');

    // title of task
    // const title = document.createElement('td');
    // title.textContent = task.title;

    // description of task
    const description = document.createElement('td');
    description.textContent = task.description;

    // date of task
    const date = document.createElement('td');
    date.textContent = new Date(task.due_date).toLocaleString();

    // append to row
    // row.appendChild(title);
    row.appendChild(description);
    row.appendChild(date);

    return row;
}

fetchJson('./tasks.json');