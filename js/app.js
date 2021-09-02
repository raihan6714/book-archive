const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const totalResult = document.getElementById('total-result');


searchBtn.addEventListener('click', function () {
    const serach = searchInput.value;
    // error handle
    if (serach == "") {
        errorDiv.innerText = "Search field cannot be empty!";
    }
    else {
        // clear
        bookContainer.innerHTML = '';
        const apiUrl = `https://openlibrary.org/search.json?q=${serach}`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => showData(data))
        // .finally(() => searchInput.value == '');
        // .then(data => console.log(data));
    }

});

// show data
const showData = bookArray => {
    if (bookArray.numFound === 0) {
        // clear total count
        totalResult.innerHTML = '';
        errorDiv.innerText = "No Result Found !"

    }
    else {
        errorDiv.innerText = "";
        // total result count
        totalResult.innerHTML = `<h1>Total ${bookArray.numFound} Books Found </h1>`;

        // foreach loop
        bookArray.docs.forEach(item => {
            const div = document.createElement('div');
            // dynamic div create 
            div.classList.add('col-md-3');
            div.innerHTML =
                `<div class="rounded overflow-hidden border p-2">
                        <img
                        src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"
                        class="w-100"
                        alt=""
                        />
                    </div>
                    <div
                        class="
                        py-2
                        d-flex
                        justify-content-between
                        align-items-center
                        d-md-block
                        text-md-center
                        "
                    >
                        <h4>${item.title}</h4>
                        <p>Author: ${item.author_name}</p>
                        <p>Publisher: ${item.publisher}</p>
                        <p>First Publish Year : ${item.first_publish_year}</p>
                </div>
            `;
            // append on main container
            bookContainer.appendChild(div);
        });

    }
}