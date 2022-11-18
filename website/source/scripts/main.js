import stadiums from "./stadiums.json" assert { type: "json" }

document.getElementById("submitButton")
  .addEventListener("click", async event => {
    document.getElementById("chart").innerHTML = ""

    const year = document.getElementById("year").value

    const apiResponse = await fetch("http://localhost:3000/police-data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year: year,
        stadiums
      })
    });

    const crimeData = await apiResponse.json()

    const chart = Plot.plot({
      color: {
        legend: true
      },
      x: {
        type: "band",
        tickFormat: d => new Date(d).toLocaleString("en", { month: "short" }),
        label: null
      },
      marks: [
        Plot.areaY(crimeData, { x: "month", y: "numberOfCrimes", fill: "stadiumName" }),
        Plot.ruleY([0])
      ]
    })

    document.getElementById("chart").append(chart)
  })
