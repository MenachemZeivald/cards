/**
 * It creates an HTML element and returns it.
 * @param [properties] - an object containing the following properties:
 * @returns A function that takes an object as an argument.
 */
let buildElement = (properties = {
    tag: null,
    cls: null,
    id: null,
    text: null,
    html: null,
    parent: null,
    src: null
}) => {
    if (typeof (properties.tag) == "string") {
        let t = document.createElement(properties.tag);
        if (Array.isArray(properties.cls)) {
            properties.cls.forEach((c) => {
                t.classList.add((typeof (c) == "string") ? c : "");
            });
        } else if (typeof (properties.cls) == "string") {
            t.classList.add(properties.cls);
        }
        t.id = (typeof (properties.id) == "string") ? properties.id : "";
        if (typeof (properties.text) == "string") {
            t.textContent = properties.text.replace("null", "");
        } else if (typeof (properties.html) == "string") {
            t.innerHTML = properties.html;
        }
        if (typeof (properties.parent) == "object") {
            properties.parent.appendChild(t);
        }
        if (properties.tag == "img" && typeof (properties.src) == "string") {
            t.src = properties.src;
        }
        return t;
    } else {
        return null;
    }
};

let options = document.querySelector("#options")
let main = document.querySelector("#main")

/**
 * It takes the value of the dropdown menu and uses it to fetch a JSON file from an API. It then takes
 * the data from the JSON file and creates a card for each drink.
 */
function createCards() {
    main.innerHTML = ""
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + options.value)
        .then((data) => data.json())
        .then((data) => {
            let current = Object.values(data)[0]
            for (let i = 0; i < current.length; i++) {
                let card = buildElement({
                    tag: "div",
                    cls: "card",
                    id: current[i].strDrink,
                    parent: main
                });
                // let card = document.getElementById(current[i].strDrink)
                buildElement({
                    tag: "div",
                    text: current[i].strDrink,
                    parent: card
                });
                buildElement({
                    tag: "img",
                    parent: card,
                    src: current[i].strDrinkThumb
                });
                buildElement({
                    tag: "div",
                    text: current[i].strInstructions,
                    parent: card
                });
                buildElement({
                    tag: "button",
                    cls: "collapsible",
                    id: "addClick" + i,
                    text: "Instructions",
                    parent: card
                });
                document.getElementById("addClick" + i).addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                })
                buildElement({
                    tag: "div",
                    cls: "content",
                    parent: card
                })
                let j = 17
                while (Object.values(current[i])[j] != null) {
                    buildElement({
                        tag: "div",
                        text: Object.values(current[i])[j] + " " + Object.values(current[i])[j + 15],
                        parent: document.querySelectorAll(".content")[i]
                    })
                    j++;
                }

            }

        })
        .catch((error) => console.log("ERROR", error))
}