const weather_api_key = "896543c1ef440c8646ff2f6578234427";
const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

const gallery_images = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

//open_menu and close_menu

function menu_handler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//temperature conversion
function celsius_to_fahr(temperature_celsius) {
    let fahr = (temperature_celsius * 9 / 5) + 32;
    return fahr;
}

//Greeting Section
function greeting_handler() {
    current_hour = new Date().getHours();
    let greeting_text;

    if (current_hour < 12) {
        greeting_text = "Good Morning!";
    } else if (current_hour < 19) {
        greeting_text = "Good Afternoon!";
    } else if (current_hour < 24) {
        greeting_text = "Good Evening!";
    } else {
        greeting_text = "Welcome to my Site!";
    }
    document.querySelector("#greeting").innerHTML = greeting_text;
    
}

// Weather Section
function weather_handler() {
    
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weather_url
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weather_api_key,)
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            const temperature_celsius = data.main.temp;

            let celsius_text = `The weather is ${condition} in ${location} and it's ${(temperature_celsius).toFixed(2)}°C outside.`;
            let fahr_text = `The weather is ${condition} in ${location} and it's ${celsius_to_fahr(temperature_celsius).toFixed(2)}°F outside.`;

        
            document.querySelector("p#weather").innerHTML = celsius_text;
            
            //Temperature Switch
            document.querySelector(".weather-group").addEventListener("click", function(e){
                
                if (e.target.id == "celsius") {
                    document.querySelector("p#weather").innerHTML = celsius_text;
                } else if (e.target.id == "fahr") {
                    document.querySelector("p#weather").innerHTML = fahr_text;
                }
            });
            
            
        }).catch((err) => {
            document.querySelector("p#weather").innerHTML = "Unable to get the weather info. Try again later.";
            
        });

    });
    
}

//Local Time
function clock_handler() {
    setInterval(function () {
    let local_time = new Date();
    document.querySelector("span[data-time=hours]").textContent = local_time.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent = local_time.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent = local_time.getSeconds().toString().padStart(2,"0");
    }, 1000);
}

//Gallery Section
//src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"

// for (let i in gallery_images){
//     console.log(gallery_images[i]);
// }
function gallery_handler() {
    
    let main_image = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    main_image.src = gallery_images[0].src;
    main_image.alt = gallery_images[0].alt;


    //<img src="./assets/gallery/image1.jpg"
    //  alt="Thumbnail Image 1"
    //  data-array-index="0"
    //  data-selected="true">

    gallery_images.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
        
        thumb.addEventListener("click", function (e) {
            let selected_index = e.target.dataset.arrayIndex;
            let selected_image = gallery_images[selected_index];
            main_image.src = selected_image.src;  //selected image will now be assign to main image
            main_image.alt = selected_image.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });

            e.target.dataset.selected = true;
        });


        thumbnails.appendChild(thumb);
    });
}

//Product Section

/* <div class="product-item">
    <img src="./assets/products/img6.png" alt="AstroFiction">
    <div class="product-details">
        <h3 class="product-title">AstroFiction</h3>
        <p class="product-author">John Doe</p>
        <p class="price-title">Price</p>
        <p class="product-price">$ 49.90</p>
    </div>
</div> */


//Products Section

function populate_products(products_list) {

     // we created a production section element
    let product_section = document.querySelector(".products-area");
    product_section.textContent = "";
    
    // for each iteration we created a new product elements
    products_list.forEach(function (product, index) {
        let product_eml = document.createElement("div");
        product_eml.classList.add("product-item");

        // for each new product element we created a picture element

        let product_image = document.createElement("img");
        product_image.src = product.image;
        product_image.alt = "Image for" + product.title;

        // create a product details (tag) element
        let product_details = document.createElement("div");
        product_details.classList.add("product-details");


        // create product title, author, price-title and price
        let product_title = document.createElement("h3");
        product_title.classList.add("product-title");
        product_title.textContent = product.title;

        let product_author = document.createElement("p");
        product_author.classList.add("product-author");
        product_author.textContent = product.author;

        let price_title = document.createElement("p");
        price_title.classList.add("price-title");
        price_title.textContent = "Price";

        let product_price = document.createElement("p");
        product_price.classList.add("product-price");
        product_price.textContent = product.price > 0 ? "GHS " + product.price.toFixed(2) : "Free"; 
       

        // add all product details child
        product_details.append(product_title);
        product_details.append(product_author);
        product_details.append(price_title);
        product_details.append(product_price);
       
        // add all child elements to the the product elements
        product_eml.append(product_image);
        product_eml.append(product_details);

        // add individaul element ie product to the product section
        product_section.append(product_eml);


    });
}

function products_handler() {

    let free_products = products.filter( item => !item.price || item.price <= 0 );

    let paid_products = products.filter( item => item.price > 0);

    populate_products(products)    

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paid_products.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = free_products.length;

    let product_filter = document.querySelector(".products-filter");
    product_filter.addEventListener("click", function (e) { 
        if (e.target.id === "all") {
            populate_products(products);
        } else if (e.target.id === "paid") {
            populate_products(paid_products);
        } else if (e.target.id === "free") {
            populate_products(free_products);
        }
    });

}

function footer_handler() {
    let current_year = new Date().getFullYear();
    document.querySelector("footer").textContent = ` ${current_year} - All rights reserved`;
}

products_handler();
menu_handler();
greeting_handler();
weather_handler();
clock_handler();
gallery_handler();
footer_handler();

