import "./style.css";

// ELEMENTOS DEL DOM --------------------------------------------------

// Formulario.
const form = document.querySelector("form");

// Inputs y textarea con validación individual.
const inputs = document.querySelectorAll("[data-validar]");

// Mensaje de error del grupo de radios.
const queryTypeError = document.querySelector("#query-type-error");

// FUNCIONES --------------------------------------------------

// Valida inputs individuales.
function validateInput(input) {
  const errorMessage = input.nextElementSibling;
  errorMessage.classList.toggle("hidden", input.validity.valid);
}

// Valida el grupo de radios.
function validateRadioGroup() {
  // Busca si hay un radio button seleccionado dentro del grupo "query-type".
  const isValid = !!document.querySelector("input[name='query-type']:checked");

  // Muestra u oculta el mensaje de error:
  // - Si es válido (true) → oculta el error (hidden = true).
  // - Si NO es válido (false) → muestra el error (hidden = false).
  queryTypeError.classList.toggle("hidden", isValid);

  // Devuelve si el grupo es válido o no.
  return isValid;
}

// EVENTO SUBMIT --------------------------------------------------

form.addEventListener("submit", (e) => {
  // Evita que el formulario se envíe inmediatamente.
  e.preventDefault();

  // Comprueba si todos los campos cumplen con las validaciones HTML.
  const isFormValid = form.checkValidity();

  if (!isFormValid) {
    // Muestra mensajes de error para los inputs inválidos.
    inputs.forEach(validateInput);

    // Valida que se haya seleccionado una opción del grupo de radios.
    validateRadioGroup();
  } else {
    // Obtiene el mensaje de éxito y lo hace visible.
    const successMessage = document.querySelector("#success-message");
    successMessage.style.opacity = "1";

    // Espera 2 segundos para que el usuario vea el mensaje
    // y luego envía el formulario.
    setTimeout(() => {
      form.submit();
    }, 2000);
  }
});

// VALIDACIÓN EN TIEMPO REAL (INPUTS) --------------------------------------------------

inputs.forEach((input) => {
  // Para cada input del formulario, agregamos un listener de tipo "input".
  input.addEventListener("input", () => {
    // Cuando el usuario escribe en este input, se ejecuta la validación.
    validateInput(input);
  });
});

// VALIDACIÓN EN TIEMPO REAL (RADIOS) --------------------------------------------------

document.addEventListener("change", (e) => {
  // Escucha cualquier cambio en el documento.

  // Verifica si el elemento que cambió pertenece al grupo de radios "query-type".
  if (e.target.name === "query-type") {
    // Ejecuta la validación del grupo de radio buttons.
    validateRadioGroup();
  }
});
