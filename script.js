/* ============================
   PART 1 – DATA + VARIABLES
============================ */

const workshopTopics = [
  "Beginner’s Sewing Essentials",
  "Accessory Creation",
  "Advanced Techniques"
];

const workshopSchedule = [
  { name: "Beginner Essentials", date: "Sept 10", duration: "3h", fee: 200000 },
  { name: "Accessory Creation", date: "Sept 17", duration: "4h", fee: 250000 },
  { name: "Advanced Techniques", date: "Sept 24", duration: "5h", fee: 300000 }
];


/* ============================
   PART 2 – DOM POPULATION
============================ */

// Loop 1 — Fill topics list
const topicsList = document.getElementById("topicsList");
workshopTopics.forEach(topic => {
  let li = document.createElement("li");
  li.textContent = topic;
  topicsList.appendChild(li);
});

// Loop 2 — Fill schedule table
const scheduleTable = document.getElementById("scheduleTable");
workshopSchedule.forEach(ws => {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${ws.name}</td>
    <td>${ws.date}</td>
    <td>${ws.duration}</td>
    <td>${ws.fee} BIF</td>
  `;
  scheduleTable.appendChild(row);
});


/* ============================
   PART 3 – INTERACTIVE FEATURES
============================ */

// Feature 1: Collapse/Expand About Text
document.getElementById("toggleAboutBtn").addEventListener("click", () => {
  const aboutSection = document.querySelector("#about p");
  if (aboutSection.style.display === "none") {
    aboutSection.style.display = "block";
    document.getElementById("toggleAboutBtn").textContent = "Hide Description";
  } else {
    aboutSection.style.display = "none";
    document.getElementById("toggleAboutBtn").textContent = "Show Description";
  }
});

// Feature 2: Highlight Cheapest Workshop
document.getElementById("highlightBtn").addEventListener("click", () => {
  const cheapest = Math.min(...workshopSchedule.map(w => w.fee));
  const rows = scheduleTable.getElementsByTagName("tr");

  for (let row of rows) {
    const fee = parseInt(row.children[3].textContent);
    row.classList.toggle("highlight", fee === cheapest);
  }
});


/* ============================
   PART 4 – CUSTOM FORM VALIDATION
============================ */

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop default behavior

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const workshop = document.getElementById("workshopSelect").value.trim();
  const exp = document.getElementById("experience").value.trim();
  const message = document.getElementById("formMessage");

  let errors = [];

  // Custom validation rules
  if (name.length < 3) errors.push("Full name must be at least 3 characters.");
  if (!email.includes("@") || !email.includes(".")) errors.push("Invalid email format.");
  if (!phone.startsWith("+257") || phone.length < 10) errors.push("Invalid phone number.");
  if (workshop === "") errors.push("Please select a workshop.");
  if (isNaN(exp) || exp < 0) errors.push("Experience must be a valid number.");

  if (errors.length > 0) {
    message.className = "error";
    message.innerHTML = errors.join("<br>");
    return;
  }

  // Success message
  message.className = "success";
  message.textContent = "Registration successful! 🎉 Thank you for joining Xil'Art.";

  // Reset form
  this.reset();
});
