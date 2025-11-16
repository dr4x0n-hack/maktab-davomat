// O'quvchilar ro'yxati
let students = [
  {name: "Ali", surname: "Aliyev"},
  {name: "Vali", surname: "Valiyev"},
  {name: "Gulbahor", surname: "Karimova"},
  {name: "Diyor", surname: "Toshboyev"}
];

// oldingi saqlangan davomatni olish
if(localStorage.getItem("attendance")) {
  students = JSON.parse(localStorage.getItem("attendance"));
}

const table = document.getElementById("attendanceTable");

// Jadvalga chiqarish
students.forEach((s, index) => {
  const row = table.insertRow();
  row.insertCell(0).innerText = s.name;
  row.insertCell(1).innerText = s.surname;

  const selectCell = row.insertCell(2);
  const select = document.createElement("select");
  ["Bor", "Yo'q", "Sababli"].forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.innerText = option;
    select.appendChild(opt);
  });
  selectCell.appendChild(select);
  s.selectElement = select; // keyin saqlash uchun
});

// Saqlash funksiyasi
function saveAttendance() {
  students.forEach(s => {
    s.status = s.selectElement.value;
    delete s.selectElement; // saqlash uchun elementni olib tashlash
  });
  localStorage.setItem("attendance", JSON.stringify(students));
  alert("Davomat saqlandi!");
}
