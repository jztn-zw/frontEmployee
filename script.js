const content = document.querySelector("#content");
const submit = document.querySelector("#add");
const update = document.querySelector("#upt");
const recordCount = document.querySelector("#recordCount");

//POST API
submit.addEventListener("click", () => {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let email = document.querySelector("#email").value;
  let gender = document.querySelector("#gender").value;
  let formData = { fname, lname, email, gender };

  fetch("https://backendemployee-v9ps.onrender.com/api/users", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Check if response is OK before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("User Added Successfully");
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to add user. Please try again.");
    });
});

window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  let html = "";
  //FETCH API
  fetch("https://backendemployee-v9ps.onrender.com/api/users", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      recordCount.textContent = `${data.length} Records`;

      data.forEach((element) => {
        html += `
            <tr>
                <td class="ps-4 fw-bold text-primary">${element.id}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                            <i class="bi bi-person text-primary"></i>
                        </div>
                        <div>
                            <div class="fw-semibold">${element.first_name} ${element.last_name}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <a href="mailto:${element.email}" class="text-decoration-none text-dark">
                        <i class="bi bi-envelope me-1 text-muted"></i>${element.email}
                    </a>
                </td>
                <td>
                    <span class="badge ${element.gender === "Male" ? "bg-info" : element.gender === "Female" ? "bg-danger" : "bg-secondary"} bg-opacity-75">
                        ${element.gender}
                    </span>
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning me-2" onclick="searchMember(${element.id})" title="Edit">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMember(${element.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
      recordCount.textContent = "0 Records";
      content.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    <i class="bi bi-exclamation-circle display-6 d-block mb-2"></i>
                    No records found or server not running
                </td>
            </tr>`;
    });
}

function deleteMember(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch("https://backendemployee-v9ps.onrender.com/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    alert("User Deleted Successfully");
    location.reload();
  }
}

function searchMember(id) {
  fetch(`https://backendemployee-v9ps.onrender.com/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#fname").value = data[0].first_name;
      document.querySelector("#lname").value = data[0].last_name;
      document.querySelector("#email").value = data[0].email;
      document.querySelector("#gender").value = data[0].gender;
      document.querySelector("#ID").value = data[0].id;

      // Scroll to form
      document
        .querySelector("#fname")
        .scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelector("#fname").focus();
    })
    .catch((error) => {
      console.log(error);
    });
}

update.addEventListener(`click`, () => {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let email = document.querySelector("#email").value;
  let gender = document.querySelector("#gender").value;
  let ID = document.querySelector("#ID").value;
  let formData = { fname, lname, email, gender, id: ID };

  if (confirm("Are you sure you want to update this user?")) {
    fetch(`https://backendemployee-v9ps.onrender.com/api/users`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    alert("User Updated Successfully");
    location.reload();
  }
});


