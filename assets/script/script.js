const products = {
    1: { name: "Balo thời trang", price: 25, image: "image/balo.jpg" },
    2: { name: "Giày sneaker", price: 30, image: "image/giay_sneaker.jpg" },
    3: { name: "Tai nghe Bluetooth", price: 15, image: "image/tai_nghe.jpg" }
  };
  
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
  function addToCart(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).value) || 1;
    if (cart[id]) {
      cart[id] += qty;
    } else {
      cart[id] = qty;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    showToast("Đã thêm vào giỏ hàng!");
  }
  
  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let totalPrice = 0;
    let totalQty = 0;
  
    for (let id in cart) {
      const product = products[id];
      const quantity = cart[id];
      totalPrice += product.price * quantity;
      totalQty += quantity;
  
      const item = document.createElement("div");
      item.innerHTML = `
        <span>${product.name} (x${quantity})</span>
        <span>$${product.price * quantity}</span>
      `;
      cartItems.appendChild(item);
    }
  
    cartTotal.textContent = `Tổng: ${totalQty} sản phẩm - $${totalPrice}`;
  }
  
  function clearCart() {
    cart = {};
    localStorage.removeItem("cart");
    renderCart();
    showToast("Đã xoá giỏ hàng.");
  }
  
  function openModal() {
    document.getElementById("checkout-modal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("checkout-modal").style.display = "none";
  }
  
  function redirectPayment(method) {
    const fullname = document.getElementById("fullname").value;
    const address = document.getElementById("address").value;
    const otp = document.getElementById("otp").value;
  
    if (!fullname || !address || otp !== "123456") {
      alert("Vui lòng nhập đầy đủ thông tin và mã OTP hợp lệ.");
      return;
    }
  
    const url = method === "vnpay" ? "vnpay.html" : "paypal.html";
    window.location.href = url;
  }
  
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 2000);
  }
  
  renderCart();
  