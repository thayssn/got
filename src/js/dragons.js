window.addEventListener("load", () => {
  let banguela = document.querySelector("#dragons .banguela");

  setTimeout(function() {
    banguela.classList.add("fly");
  }, 2000);

  setTimeout(function() {
    banguela.classList.remove("fly");
  }, 21000);

  setInterval(function() {
    banguela.classList.add("fly");

    setTimeout(function() {
      banguela.classList.remove("fly");
    }, 21000);
  }, 23000);
});
