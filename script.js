/* =====================================================
   ELEMENTS
===================================================== */

const scenes =
    document.querySelectorAll(
        ".scene"
    );


const products =
    document.querySelectorAll(
        ".product-scene"
    );


const menuButton =
    document.getElementById(
        "menuButton"
    );


const closeMenu =
    document.getElementById(
        "closeMenu"
    );


const sideMenu =
    document.getElementById(
        "sideMenu"
    );


const oilButton =
    document.getElementById(
        "oilButton"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


/* =====================================================
   MENU
===================================================== */

menuButton.addEventListener(
    "click",
    () => {

        sideMenu.classList.add(
            "open"
        );

    }
);


closeMenu.addEventListener(
    "click",
    () => {

        sideMenu.classList.remove(
            "open"
        );

    }
);


/* =====================================================
   CATEGORY BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".category-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".category-button"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                if (
                    category === "oils"
                ) {

                    document
                        .getElementById(
                            "oilSwitch"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                } else {

                    document
                        .getElementById(
                            "nutsCatalog"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                }

            }
        );

    });


/* =====================================================
   JUMP TO PRODUCT
===================================================== */

document
    .querySelectorAll(
        "[data-jump]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.jump;


                const target =
                    document.querySelector(
                        `[data-product="${id}"]`
                    );


                if (target) {

                    sideMenu.classList.remove(
                        "open"
                    );


                    target.scrollIntoView({
                        behavior:
                            "smooth"
                    });

                }

            }
        );

    });


/* =====================================================
   OIL BUTTON
===================================================== */

oilButton.addEventListener(
    "click",
    () => {

        document
            .getElementById(
                "oilCatalog"
            )
            .scrollIntoView({
                behavior:
                    "smooth"
            });

    }
);


/* =====================================================
   EASING
===================================================== */

function ease(t) {

    return t * t *
        (3 - 2 * t);

}


/* =====================================================
   SCENE ANIMATION
===================================================== */

function animateScene(
    element
) {

    const rect =
        element.getBoundingClientRect();


    const height =
        window.innerHeight;


    const progress =
        1 -
        (
            rect.bottom /
            (rect.height + height)
        );


    const p =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    const smooth =
        ease(p);


    const image =
        element.querySelector(
            "img"
        );


    if (!image)
        return;


    /* -------------------------------------
       INTRO LOGOS
    ------------------------------------- */

    image.style.transform =
        `scale(${1 + smooth * 6})`;


    element.style.opacity =
        p < 0.5

            ? 1

            : 1 -
              ((p - 0.5) * 2);

}


/* =====================================================
   PRODUCT ANIMATION
===================================================== */

function animateProduct(
    product
) {

    const rect =
        product.getBoundingClientRect();


    const height =
        window.innerHeight;


    /*
       0 = product entering
       1 = product leaving
    */

    const progress =
        (
            height -
            rect.top
        ) /
        (
            height +
            rect.height
        );


    const p =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    const image =
        product.querySelector(
            "img"
        );


    const info =
        product.querySelector(
            ".product-info"
        );


    const smooth =
        ease(p);


    /* -------------------------------------
       IMAGE ZOOM
    ------------------------------------- */

    image.style.transform =
        `scale(${1.05 + smooth * 1.7})`;


    /* -------------------------------------
       INFORMATION APPEARS
    ------------------------------------- */

    let infoOpacity;


    if (p < 0.18) {

        infoOpacity =
            p / 0.18;

    }

    else if (p < 0.72) {

        infoOpacity =
            1;

    }

    else {

        infoOpacity =
            1 -
            (
                (p - 0.72) /
                0.28
            );

    }


    infoOpacity =
        Math.max(
            0,
            Math.min(
                1,
                infoOpacity
            )
        );


    info.style.opacity =
        infoOpacity;


    /* -------------------------------------
       TEXT MOVEMENT
    ------------------------------------- */

    const movement =
        40 -
        (
            infoOpacity * 40
        );


    info.style.transform =
        `translateY(-50%)
         translateX(${movement}px)`;

}


/* =====================================================
   MAIN SCROLL ANIMATION
===================================================== */

function animate() {

    scenes.forEach(
        animateScene
    );


    products.forEach(
        animateProduct
    );

}


/* =====================================================
   SCROLL PERFORMANCE
===================================================== */

let ticking =
    false;


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                () => {

                    animate();

                    ticking = false;

                }
            );


            ticking = true;

        }

    }
);


/* =====================================================
   SEARCH DATABASE
===================================================== */

const searchItems = [

    "Hazelnut",
    "Chestnut",
    "Acorn",
    "Macadamia",
    "Walnut",
    "Almond",
    "Pecan",
    "Pistachio",
    "Cashew",
    "Brazil Nut",
    "Pine Nut",

    "Soybean Oil",
    "Canola Oil",
    "Corn Oil",
    "Sunflower Oil",
    "Cottonseed Oil",
    "Grapeseed Oil",
    "Rice Bran Oil",
    "Peanut Oil",
    "Sesame Oil",
    "Flaxseed Oil",
    "Hemp Seed Oil",
    "Chia Seed Oil",
    "Pumpkin Seed Oil",
    "Black Cumin Oil",
    "Pomegranate Oil",
    "Camelina Oil",
    "Raspberry Seed Oil",
    "Cranberry Seed Oil",
    "Watermelon Seed Oil"

];


const productIDs = {

    "hazelnut": "hazelnut",
    "chestnut": "chestnut",
    "acorn": "acorn",
    "macadamia": "macadamia",
    "walnut": "walnut",
    "almond": "almond",
    "pecan": "pecan",
    "pistachio": "pistachio",
    "cashew": "cashew",
    "brazil nut": "brazil",
    "pine nut": "pine",

    "soybean oil": "soybean",
    "canola oil": "canola",
    "corn oil": "corn",
    "sunflower oil": "sunflower",
    "cottonseed oil": "cottonseed",
    "grapeseed oil": "grapeseed",
    "rice bran oil": "ricebran",
    "peanut oil": "peanut",
    "sesame oil": "sesame",
    "flaxseed oil": "flaxseed",
    "hemp seed oil": "hemp",
    "chia seed oil": "chia",
    "pumpkin seed oil": "pumpkin",
    "black cumin oil": "blackcumin",
    "pomegranate oil": "pomegranate",
    "camelina oil": "camelina",
    "raspberry seed oil": "raspberry",
    "cranberry seed oil": "cranberry",
    "watermelon seed oil": "watermelon"

};


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        searchResults.innerHTML =
            "";


        if (!query) {

            searchResults.style.display =
                "none";

            return;

        }


        const matches =
            searchItems.filter(
                item =>
                    item
                        .toLowerCase()
                        .includes(query)
            );


        matches
            .slice(0, 6)
            .forEach(item => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.textContent =
                    item;


                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            productIDs[
                                item.toLowerCase()
                            ];


                        const target =
                            document.querySelector(
                                `[data-product="${id}"]`
                            );


                        if (target) {

                            target.scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                        }


                        searchResults.style.display =
                            "none";


                        searchInput.value =
                            "";

                    }
                );


                searchResults.appendChild(
                    button
                );

            });


        searchResults.style.display =
            matches.length
                ? "block"
                : "none";

    }
);


/* =====================================================
   INITIAL
===================================================== */

animate();