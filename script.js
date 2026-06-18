const quantityInput = document.getElementById("quantity");
const estimateOutput = document.getElementById("estimate");
const form = document.getElementById("orderForm");

function unitPrice(quantity) {
  if (quantity >= 100) return 5.95;
  if (quantity >= 50) return 6.95;
  return 9.95;
}

function updateEstimate() {
  const qty = Math.max(1, Number(quantityInput.value || 1));
  const total = qty * unitPrice(qty);
  estimateOutput.textContent = `$${total.toFixed(2)}`;
}

quantityInput.addEventListener("input", updateEstimate);
updateEstimate();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(form);
  const qty = Math.max(1, Number(data.get("quantity") || 1));
  const price = unitPrice(qty);
  const total = qty * price;

  const body = [
    "Blue Zebra Officials Prep Card Order Request",
    "",
    `Name: ${data.get("name")}`,
    `Organization: ${data.get("organization")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Quantity: ${qty}`,
    `Unit price: $${price.toFixed(2)}`,
    `Estimated card total: $${total.toFixed(2)} before shipping`,
    `Payment preference: ${data.get("payment")}`,
    "",
    "Shipping address:",
    data.get("address"),
    "",
    "Notes:",
    data.get("notes"),
  ].join("\n");

  const subject = encodeURIComponent("Blue Zebra Officials Prep Card Order");
  const mailBody = encodeURIComponent(body);
  window.location.href = `mailto:rick@olypen.com?subject=${subject}&body=${mailBody}`;
});
