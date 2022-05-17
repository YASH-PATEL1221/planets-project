const { parse } = require("csv-parse");
const fs = require("fs");

const HabitablePlanets = [];

function isHabitablePlanet(planets) { 
    return planets["koi_disposition"] == "CONFIRMED"
    && planets["koi_insol"] > 0.36 && planets["koi_insol"] < 1.11
    && planets["koi_prad"] < 1.6
}

fs.ReadStream("kepler_data.csv")
    .pipe(parse({
        comment:'#',
        columns:true
    }))
    .on("data",(data) => {
        if(isHabitablePlanet(data)){
            HabitablePlanets.push(data);
        }
    })
    .on("error",(error) => {
        console.log(error);
    })
    .on("end",() => {
        console.log(`${HabitablePlanets.length} habitable palnets found!`);
        console.log(HabitablePlanets.map(palnet => {
            return palnet["kepler_name"];
        }));
    });

