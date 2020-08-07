console.log("This is client side JS");

const getWeather = async (address) => {
    const res = await fetch(`http://localhost:3000/weather?address=${address}`)
    const data = await res.json()
    return data
}

const input = document.querySelector("form");
const address = document.querySelector("input");
const result = document.querySelector("#result");
const info = document.querySelector("#info");

input.addEventListener("submit", async (i) => {
    i.preventDefault();
    result.textContent = "Loading";
    info.textContent = "";
    const a = address.value;
    const res = await getWeather(a);
    if (!res.forecast) {
        result.textContent = res.type;
        info.textContent = res.message;
    }
    else {
        result.textContent = res.location;
        info.textContent = res.forecast; 
    }
});