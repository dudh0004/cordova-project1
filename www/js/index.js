const app = {
    reviews: {},
    a:{},
    KEY:"dudh0004-reviewer-",
    init: () => {
        app.getReviews();
        app.addListeners();
    },
    getReviews: () => {
        let str = localStorage.getItem(app.KEY);
        app.a = JSON.parse(str);
        let ul = document.querySelector(".review-list");
        ul.innerHTML = "";
        if(app.a == null){
            app.a = [],
            localStorage.setItem(app.KEY, JSON.stringify(app.a));
            document.getElementById('message').textContent = "Please click on Add to take a picture";
        }
        else{
            document.getElementById('message').textContent = "";

            for(let i = 0; i < localStorage.length; i++){
                let k = localStorage.key(i);
                let d = localStorage.getItem(k);
                app.a = d;
                let list = document.createElement('li');
                ul.appendChild(list);
                let obj = JSON.parse(app.a);
                list.setAttribute('id', obj.id);
                list.textContent = obj.title;
                list.addEventListener('click', app.details);
        }
    }
    },
    addListeners: () => {
        document.getElementById("btnAdd").addEventListener("click", app.nav);
        document
            .getElementById("btnDetailsBack")
            .addEventListener("click", app.nav);
        document.getElementById("btnAddBack").addEventListener("click", app.nav);
    },
    nav: ev => {
        let btn = ev.target;
        let target = btn.getAttribute("data-target");
        console.log("Navigate to", target);
        let options = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
    };

    navigator.camera.getPicture(app.success, app.failure, options);

    },
    success: (imgURI) => {
        document.querySelector(".page.active").classList.remove("active");
        document.getElementById('add').classList.add("active");
        document.getElementById('add').classList.add("hasPhoto");

        app.reviews["img"] = imgURI;
        document.getElementById('imgAdd').src = imgURI;
        
        document.getElementById('btnSave').addEventListener('click', app.nav2);
        document.getElementById('delete').addEventListener('click', app.addToHome);
        document.getElementById('btnAddBack').addEventListener('click', app.addToHome);
},

failure: (error) => {
    console.log(error)
},

nav2: ev => {
    let name = document.getElementById('name').value;
    app.reviews["title"] = name;
    let id = Date.now();
    app.reviews["id"] = id;
    document.getElementById('name').textContent = name;
    let rating = document.getElementById('rating').value;
    if(rating > 5){
        alert('Please give rating from 1 - 5');
        return;
    };
    app.reviews["rating"] = rating;
    document.getElementById('rating').textContent = rating;

    document.getElementById('add').classList.remove("active");
    document.getElementById("home").classList.add("active");

    localStorage.setItem(app.KEY + app.reviews.title, JSON.stringify(app.reviews));
    app.getReviews();
},

details: ev => {
    let target = ev.target;
    document.getElementById("home").classList.remove("active");
    document.getElementById("details").classList.add("active");
    let l = document.getElementById('list');
    let titleValue = target.textContent;
    let reviewTitle = document.getElementById('imgTitle');
    reviewTitle.textContent = titleValue;
    let data = localStorage.getItem(app.KEY + titleValue);
    let data2 = JSON.parse(data);
    let reviewImage = document.getElementById('imgDetails');
    reviewImage.src = data2.img;
    let ratingImage = document.getElementById('ratingDisplay');
    ratingImage.textContent = `Ratings: ${data2.rating}`;

    document.getElementById('btnDelete').addEventListener('click', app.deleteData);
    document.getElementById('btnDetailsBack').addEventListener('click', app.detailsToHome);
},

detailsToHome:ev =>{
    document.getElementById("details").classList.remove('active');
    document.getElementById("home").classList.add('active');
    
},

addToHome: ev =>{
    document.getElementById("add").classList.remove('active');
    document.getElementById("home").classList.add('active');
},

deleteData: ev => {
    let target = ev.target;
    let reviewTitle = document.getElementById('imgTitle');
    console.log(app.KEY + reviewTitle.textContent);
    localStorage.removeItem(app.KEY + reviewTitle.textContent);
    app.getReviews();
    document.getElementById('details').classList.remove('active');
    document.getElementById('home').classList.add('active');
}

}
    const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
    document.addEventListener(ready, app.init);