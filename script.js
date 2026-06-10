const imageInput = document.querySelector("#imageInput");
const dropZone = document.querySelector("#dropZone");
const preview = document.querySelector("#preview");
const previewImage = document.querySelector("#previewImage");
const fileName = document.querySelector("#fileName");
const removeButton = document.querySelector("#removeButton");
const message = document.querySelector("#message");

const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
let imageUrl = "";

function showImage(file) {
  message.textContent = "";

  if (!file || !allowedTypes.includes(file.type)) {
    message.textContent = "Vui lòng chọn ảnh PNG, JPG hoặc WEBP.";
    return;
  }

  if (imageUrl) {
    URL.revokeObjectURL(imageUrl);
  }

  imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;
  fileName.textContent = file.name;
  preview.hidden = false;
}

function clearImage() {
  if (imageUrl) {
    URL.revokeObjectURL(imageUrl);
    imageUrl = "";
  }

  imageInput.value = "";
  previewImage.removeAttribute("src");
  preview.hidden = true;
  message.textContent = "";
}

imageInput.addEventListener("change", () => showImage(imageInput.files[0]));
removeButton.addEventListener("click", clearImage);

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
  });
});

dropZone.addEventListener("drop", (event) => {
  showImage(event.dataTransfer.files[0]);
});
