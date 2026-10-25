
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registroForm");
  const result = document.querySelector("#resultado");
  const programSelect = document.querySelector("#programa");
  const phone = document.querySelector("#telefono");
  const year = document.querySelector("#year");

  // Actualizar automáticamente el año del pie de página.
  year.textContent = new Date().getFullYear();

  // Seleccionar automáticamente el programa elegido.
  document.querySelectorAll("[data-program]").forEach((link) => {
    link.addEventListener("click", () => {
      const selectedProgram = link.dataset.program;

      const optionExists = [...programSelect.options].some(
        (option) =>
          option.value === selectedProgram ||
          option.text === selectedProgram
      );

      if (optionExists) {
        programSelect.value = selectedProgram;
      }
    });
  });

  // Validación adicional del teléfono.
  phone.addEventListener("input", () => {
    const validCharacters = /^[0-9+() -]*$/.test(phone.value);

    phone.setCustomValidity(
      validCharacters
        ? ""
        : "Usa números y los símbolos + ( ) - o espacios."
    );
  });

  // Procesamiento demostrativo del formulario.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    result.hidden = true;
    result.classList.remove("error");

    // Verificar campos obligatorios y formatos.
    if (!form.checkValidity()) {
      form.classList.add("was-validated");

      result.hidden = false;
      result.classList.add("error");
      result.textContent =
        "Revisa los campos marcados y completa la información obligatoria.";

      const firstInvalid = form.querySelector(":invalid");

      if (firstInvalid) {
        firstInvalid.focus();
      }

      return;
    }

    // Recoger los datos del formulario.
    const formData = new FormData(form);

    const applicant = {
      nombre: String(formData.get("nombre")).trim(),
      correo: String(formData.get("correo")).trim(),
      telefono: String(formData.get("telefono")).trim(),
      programa: String(formData.get("programa")),
      modalidad: String(formData.get("modalidad"))
    };

    // Simulación local: no se envían datos a un servidor.
    result.hidden = false;
    result.textContent =
      `¡Gracias, ${applicant.nombre}! ` +
      `Tu solicitud de información sobre ${applicant.programa} ` +
      "se registró en esta demostración. " +
      "No se enviaron datos a un servidor.";

    // Limpiar el formulario después de mostrar el mensaje.
    form.reset();
    form.classList.remove("was-validated");
  });
});
