
var searchInput = document.getElementById("search_input");
var confirmSearchBtn = document.querySelector(".search-btn");

var dayName = document.querySelector(".day-name");
var dayDate = document.querySelector(".day-name");

var cityName = document.querySelector(".city_name");

var weatherDsgree = document.querySelector(".degree");

var conditionIcon = document.querySelector(".img-icon");

var conditionDescription = document.querySelector(".status_condition");

var cards_container = document.querySelector("#Data");

function getData(selectedLocation) {
  var myhttp = new XMLHttpRequest();
  myhttp.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=cc33e7388c414603b81180720240801&q==${selectedLocation}&days=3`
  );
  myhttp.send();
  myhttp.addEventListener("readystatechange", function () {
    if (myhttp.readyState == 4 && myhttp.status == 200) {
      console.log(JSON.parse(myhttp.response));
      displayData(JSON.parse(myhttp.response));
    }
  });
}
confirmSearchBtn.addEventListener("click", function () {
  console.log(searchInput.value);
  if (searchInput.value == "") {
    getData("Cairo");
  }
  getData(searchInput.value);
});

getData("Cairo");

function displayData(x) {
  var date1 = new Date(x.forecast.forecastday[0].date);
  var date2 = new Date(x.forecast.forecastday[1].date);
  var date3 = new Date(x.forecast.forecastday[2].date);
  var times = [];

  for (var i = 0; i < x.forecast.forecastday[0].hour.length; i++) {
    var dateString = x.forecast.forecastday[0].hour[i].time;
    var dateObject = new Date(dateString);
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();

     var formattedTime =
       (hours < 10 ? "0" : "") +
       hours +
       ":" +
       (minutes < 10 ? "0" : "") +
       minutes;

    times.push(formattedTime);
  }

 cols = `
  <div class="col-md-4 ">
   <div class="card">
     <div
       class="date-card d-flex justify-content-between align-items-center rounded">
       <span class="day-date text-capitalize bg-info rounded pe-1">${
        x.forecast.forecastday[0].date
      }</span>
       <span class="day_name text-uppercase">${date1.toLocaleString("en-us", { weekday: "long", })}
        
      </span>
     </div>
     <div class="city_name mt-2">${x.location.name}</div>
     <div
       class=" d-flex flex-column align-items-center justify-content-evenly py-1">
       <img src="https:${x.current.condition.icon}"class="img-icon">
       <h1 class="degree_td">${
         x.current.temp_c
       }<span class = "text-info">&degC</span></h1>
       
     </div>

     <div class="status_condition p-2 mt-2 rounded ">${
       x.current.condition.text
     }</div>

     <div
       class="weather_sammary d-flex justify-content-around align-items-center mt-5 p-2">
       <span><i class="fa-solid fa-umbrella me-2"></i> ${
         x.current.precip_mm * 100
       }% </span>
       <span><i class="fa-solid fa-wind me-2"></i> ${
         x.current.wind_kph
       } km/h</span>
       <span> <i class="fa-solid fa-compass me-2"></i> ${
         x.current.wind_dir
       }</span>
     </div>
   </div>
 </div>
 <div class="col-md-4 ">
   <div class="card ">
     <div
       class="date-card d-flex justify-content-center align-items-center  rounded">
       <span class="day_name text-uppercase">${date2.toLocaleString("en-us", {
         weekday: "long",
       })}</span>
       
     </div>

     <div
       class=" d-flex flex-column align-items-center justify-content-evenly py-4 mt-2">

       <img src="https:${x.forecast.forecastday[1].day.condition.icon}"
         class="img-icon">

         <h1 class="degree">${
           x.forecast.forecastday[1].day.maxtemp_c
         }<span class = "text-info">&degC</span></h1>
         <h5 class="degree_min">${
           x.forecast.forecastday[1].day.mintemp_c
         }&deg</h5>
     </div>

     <div class="status_condition p-2 mt-3">${
       x.forecast.forecastday[1].day.condition.text
     }
     </div>
   </div>
 </div>

 <div class="col-md-4 ">
   <div class="card">
     <div
       class="date-card d-flex justify-content-center align-items-center rounded">
       <span class="day_name text-uppercase">${date3.toLocaleString("en-us", {
         weekday: "long",
       })}</span>
       
     </div>
    
     <div
       class=" d-flex flex-column align-items-center justify-content-evenly py-4 mt-2">

       <img src="https:${x.current.condition.icon}" class="img-icon">

         <h1 class="degree">${
           x.forecast.forecastday[2].day.maxtemp_c
         }<span class = "text-info">&degC</span></h1>
         <h5 class="degree_ming">${
           x.forecast.forecastday[2].day.mintemp_c
         }&deg</h5>
     </div>

     <div class="status_condition p-2 mt-3">${
       x.forecast.forecastday[2].day.condition.text
     }
     </div>

   </div>
 </div>
 `;
  cards_container.innerHTML = cols;
}






