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