// Function to handle navigation
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

// Define routes
const router = async () => {
    const routes = [
        { path: "/", view: "/views/home.html" },
        { path: "/about", view: "/views/about.html" },
        { path: "/projects", view: "/views/projects.html" },
        { path: "/contact", view: "/views/contact.html" },
        { path: "/skills", view: "/views/contact.html" },
    ];

    // Match the current route
    const match = routes.find((route) => location.pathname === route.path) || routes[0];

    // Fetch and inject the matched route's content
    try {
        const response = await fetch(match.view);
        if (response.ok) {
            const html = await response.text();
            document.getElementById("app").innerHTML = html;
        } else {
            document.getElementById("app").innerHTML = `<h1>404</h1><p>Page not found! 123456</p>`;
        }
    } catch (error) {
        document.getElementById("app").innerHTML = `<h1>Error</h1><p>Could not load page!</p>`;
    }
};

// Add event listeners
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
