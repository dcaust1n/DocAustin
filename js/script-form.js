  // Function to handle form submission
  async function submitForm(event, formId, endpoint) {
    event.preventDefault();

    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the form.");
    }
  }

  document.getElementById("writer-form").addEventListener("submit", (event) =>
    submitForm(event, "writer-form", "writer-request")
  );

  document.getElementById("speaker-form").addEventListener("submit", (event) =>
    submitForm(event, "speaker-form", "speaker-request")
  );

  document.getElementById("newsletter-form").addEventListener("submit", (event) => 
    submitForm(event, "newsletter-form", "newsletter-request")
  );