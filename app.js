/**
 * function iterates over tasks from JSON file
 * Sortes the tasks by due date
 * returns an array of JSON objects sorted by due date
 * 
 return data type example: [{},{},{},{},{},{}]
 0: {id_val: 1, title_val: '110 homework 1', descriptions_val: 'Refer to Canvas', date_val: Tue Apr 09 2024 03:03:00 GMT-0700 (Pacific Daylight Time), completed_val: true}
 1: {id_val: 2, title_val: '110 homework 2', descriptions_val: 'Refer to Canvas', date_val: Tue Apr 09 2024 13:43:00 GMT-0700 (Pacific Daylight Time), completed_val: false}
 2: {id_val: 3, title_val: '110 homework 3', descriptions_val: 'Refer to Canvas', date_val: Wed Apr 10 2024 03:03:00 GMT-0700 (Pacific Daylight Time), completed_val: true}
 3: {id_val: 5, title_val: '110 homework 5', descriptions_val: 'Refer to Canvas', date_val: Sat Apr 13 2024 03:03:00 GMT-0700 (Pacific Daylight Time), completed_val: true}
 4: {id_val: 6, title_val: '110 homework 6', descriptions_val: 'Refer to Canvas', date_val: Sat Apr 13 2024 13:43:00 GMT-0700 (Pacific Daylight Time), completed_val: false}
 5: {id_val: 4, title_val: '110 homework 4', descriptions_val: 'Refer to Canvas', date_val: Mon Apr 15 2024 13:43:00 GMT-0700 (Pacific Daylight Time), completed_val: false}
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
      console.log("sorted parsed dates", parsed_dates);
      return parsed_dates;
    });
}