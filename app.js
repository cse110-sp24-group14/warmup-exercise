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