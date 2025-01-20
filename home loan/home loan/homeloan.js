// Attach click event listeners to all "Apply" buttons
document.querySelectorAll("table tbody tr").forEach((row) => {
    const button = row.querySelector("button");
    const link = row.querySelector("a");

    button.addEventListener("click", () => {
        window.open(link.href, "_blank");
    });
});

  