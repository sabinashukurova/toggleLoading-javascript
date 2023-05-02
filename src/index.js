const PAGE_SIZE = 20;
let row = document.querySelector('#row');
let btn = document.querySelector('#btn');
const pagination = document.querySelector('#pagination');
const prog = document.querySelector('#prog')

let page = 0;
let loading = false;
let allImages = [];

function images(page = 0) {
    toggleLoading(true);
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            allImages = data;
            prog.value = PAGE_SIZE * 100 / data.length;
            pagination.innerHTML = `${PAGE_SIZE} / ${data.length}`

            for (let i = 0 + page * 20; i < 20 + page * 20; i++) {
                row.innerHTML += `<div class='col-lg-3'>
                    <img src=${data[i].url}/>
                    <p>${data[i].id}</p>
                    <p>${data[i].title}</p>
                    </div>`
            }
        })
        .finally(() => toggleLoading(false))
}


function incrementPage(page = 0) {
    prog.value = (PAGE_SIZE + PAGE_SIZE * page) * 100 / allImages.length;
    pagination.innerHTML = `${PAGE_SIZE + PAGE_SIZE * page} / ${allImages.length}`


    for (let i = 0 + page * PAGE_SIZE; i < PAGE_SIZE + page * PAGE_SIZE; i++) {


        row.innerHTML += `
        <div class='image-data'>
            <img src=${allImages[i].url}/>
            <p><span style="font-weight:bold">ID: </span>${allImages[i].id}</p>
            <div style="width: 300px">
                <p><span style="font-weight:bold">Desc: </span>${allImages[i].title}</p>
            </div>
        </div>`

    }

}

btn.addEventListener('click', function() {
    incrementPage(++page);
    btn.scrollIntoView({ behavior: "smooth" })
})

function toggleLoading(isLoading) {
    btn.disabled = isLoading;
}
images();