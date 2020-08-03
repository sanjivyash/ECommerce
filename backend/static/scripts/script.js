const forms = ["create", "edit", "delete", "read"];

document.querySelector("select").addEventListener("change", (e) => {
  const value = e.target.value;

  forms.forEach((id) => {
    if (id == value) {
      document.getElementById(id).style.display = "block";
    } else {
      document.getElementById(id).style.display = "none";
    }
  });
});
