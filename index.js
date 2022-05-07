import { getInformation } from "./src/getInformation.js";

const input = document.querySelector("#country");
const container = document.querySelector("#img__container");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        setInformation();
        container.style.opacity = 0;
    }
});

const setInformation = async () => {
    if (input.value !== "") {
        const information = await getInformation(input.value);
        if (information.error !== undefined) {
            container.style.opacity = 1;
            if (information.error.code === 1006) {
                container.innerHTML =
                    '<span style="color: red; margin-top: 30px;">Invalid name of country</span>';
            } else {
                container.innerHTML =
                    '<span style="color: red; margin-top: 30px;">Server error</span>';
            }
            return;
        }
        const { location, current } = information;
        const { name } = location;
        const {
            temp_c,
            temp_f,
            condition,
            wind_mph,
            wind_dir,
            pressure_mb,
            cloud,
        } = current;
        const { icon } = condition;
        container.innerHTML = `<img id="condition" src="${icon}" />
                        <div id="p__container">
                            <p class="information green">${name}</p>
                            <p class="information">
                                ${temp_c}<sup>o</sup>C / ${temp_f}<sup>o</sup>F
                            </p>
                            <p class="information">
                                <span class="green">Wind:</span> Direction: ${wind_dir}, Speed:
                                ${wind_mph} mph
                            </p>
                            <p class="information">
                                <span class="green">Pressure:</span> ${pressure_mb} hPa
                            </p>
                            <p class="information">
                                <span class="green">Cloudy</span> (in '%'): ${cloud}
                            </p>
                        </div>`;
        container.style.animation = "append .2s both";
    }
};
