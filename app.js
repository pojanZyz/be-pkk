document.addEventListener("DOMContentLoaded", () => {
    // Login
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        alert(data.message || "Login successful");
    });

    // Register
    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        alert(data.message || "Registration successful");
    });

    // Create Article
    document.getElementById("create-article-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", document.getElementById("article-name").value);
        formData.append("price", document.getElementById("article-price").value);
        formData.append("stock", document.getElementById("article-stock").value);
        formData.append("description", document.getElementById("article-description").value);
        formData.append("image", document.getElementById("article-image").files[0]);
        formData.append("categoryId", document.getElementById("article-categoryId").value);

        const response = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        alert(data.message || "Article created");
    });

    // Get Articles
    async function fetchArticles() {
        const response = await fetch("/api/product");
        const articles = await response.json();
        const articleList = document.getElementById("article-list");
        articleList.innerHTML = "";
        articles.forEach((article) => {
            const li = document.createElement("li");
            li.textContent = `${article.name} - ${article.price}`;
            articleList.appendChild(li);
        });
    }

    // Fetch articles on page load
    fetchArticles();
});
