// Check if the user is logged in
const token = localStorage.getItem('token');
const addArticleSection = document.getElementById('add-article-section');
const logoutButton = document.getElementById('logout-button');

if (token) {
    // User is logged in, show the "Add Article" section and logout button
    addArticleSection.style.display = 'block';
    logoutButton.style.display = 'block';
}
// else {
//     window.location.href = "/pages/login.html";
// }

// Logout functionality
logoutButton.addEventListener('click', function () {
    localStorage.removeItem('token'); // Remove the token
    window.location.href = '/pages/login.html'; // Redirect to the login page
});

// Handle form submission
document.getElementById('article-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;

    // Create a new article element
    const newArticle = document.createElement('article');
    newArticle.classList.add('feed-item');
    newArticle.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <a href="#${title.replace(/\s+/g, '-').toLowerCase()}" class="read-more">Read More</a>
    `;

    // Add the new article to the newsletter feed
    document.getElementById('new-articles').appendChild(newArticle);

    // Create a full article section
    const newFullArticle = document.createElement('article');
    newFullArticle.id = title.replace(/\s+/g, '-').toLowerCase();
    newFullArticle.classList.add('article');
    newFullArticle.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
    `;

    // Add the full article to the articles section
    document.getElementById('new-full-articles').appendChild(newFullArticle);

    // Clear the form
    document.getElementById('article-form').reset();
    });

// // Handle form submission for adding articles using backend
// document.getElementById('article-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const title = document.getElementById('article-title').value;
//     const content = document.getElementById('article-content').value;

//     // Send the new article to the backend
//     fetch('/add-article', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // Include the token for authentication
//         },
//         body: JSON.stringify({ title, content }),
//     })
//         .then(response => response.json())
//         .then(data => {
//         if (data.success) {
//             alert('Article published successfully!');
//             // Optionally, refresh the page or update the article list
//         } else {
//             alert('Failed to publish article.');
//         }
//         })
//         .catch(error => {
//         console.error('Error:', error);
//         });
//     });