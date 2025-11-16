let students = {
  "1A": [{name:"Ali", surname:"Aliyev"}],
  "2A": [{name:"Vali", surname:"Valiyev"}],
  "3A": [{name:"Gulbahor", surname:"Karimova"}],
  ...
  "11A": []
};

function loadClass() {
  const className = document.getElementById("classSelect").value;
  const classStudents = students[className] || [];
  renderTable(classStudents);
}

function renderTable(classStudents){
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "<tr><th>Ism</th><th>Familiya</th><th>Davomat</th></tr>";
  classStudents.forEach((s, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = s.name;
    row.insertCell(1).innerText = s.surname;

    const selectCell = row.insertCell(2);
    const select = document.createElement("select");
    ["Bor","Yo'q","Sababli"].forEach(opt=>{
      const option = document.createElement("option");
      option.value = opt;
      option.innerText = opt;
      select.appendChild(option);
    });
    selectCell.appendChild(select);
    s.selectElement = select;
  });
}

function saveAttendance(){
  for(let className in students){
    students[className].forEach(s=>{
      if(s.selectElement) s.status = s.selectElement.value;
      delete s.selectElement;
    });
  }
  localStorage.setItem("attendance", JSON.stringify(students));
  alert("Davomat saqlandi!");
}

// LocalStorage dan oldingi ma'lumotni yuklash
if(localStorage.getItem("attendance")){
  students = JSON.parse(localStorage.getItem("attendance"));
}
