
let postsArray = []

const titleInput = document.getElementById('post-title')
const bodyInput = document.getElementById('post-body')
const form = document.getElementById('new-post')

function renderPosts() {
    let html = ''
        for(let post of postsArray) {
           html += `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <hr />
                    `
        }
        document.getElementById('blog-list').innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        // console.log(data.slice(0, 5)) 
        postsArray = data.slice(0, 5) //[{}, {}, {}, {} ,{}]
        renderPosts()
    })

form.addEventListener('submit' , (event) => {
    event.preventDefault()
    const data = {
        title: titleInput.value,
        body: bodyInput.value
    }
    // console.log(object)

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json" //can be lower case letters
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)  
        .then(response => response.json())
        .then(data => {   //can name the data as wish because it's a parameter
            postsArray.unshift(data)      
            renderPosts()                                   
            form.reset()
        })
})
