AFRAME.registerComponent("markerhandler", {
  init: async function () {

    var dishes = await this.getDishes()

    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;
      this.handleMarkerFound(dishes, markerId);
  
    });

    this.el.addEventListener("markerLost", () => {

      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function (dishes, markerId) {

    var today = new Date();
    var currentDay = today.getDay();
    // Sunday - Saturday : 0 - 6

    var dish = dishes.filter(dish => dish.id === markerId)[0];

    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

   

    if (dish.unavailable_days.includes(days[currentDay])) {
      swal({
        icon: "warning",
        title: dish.dishname,
        text: "This dish is not available....HAVE FUNNN HUNGRRRYYYYY!!!!!!!!!!!!!",
        timer: 2000,
        buttons: false
      });
    }
    else {

      var model = document.querySelector(`#model-${dish.id}`);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);
      model.setAttribute("visible", true);
    }

 
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButtton = document.getElementById("order-button");

    ratingButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Rate Dish",
        text: "Work In Progress"
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order!",
        text: "Your order will be served soon at your table!"
      });
    });
  },

  handleMarkerLost: function () {

    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },




  getDishes: async function (){
    return await firebase.firestore().collection("Dishes").get()
    .then(snapshot => {
        return snapshot.docs.map(doc=>
            doc.data()
        )
    })

  }


});