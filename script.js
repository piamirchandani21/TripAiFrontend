console.log("TripAI JavaScript is working!");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const navButtons = document.querySelector(".nav-buttons");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
    navButtons.classList.toggle("mobile-active");
});
// ==========================================
// TripAI - Frontend JavaScript
// ==========================================


// ==========================================
// MOBILE MENU
// ==========================================

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        const navLinks = document.querySelector(".nav-links");

        if (navLinks) {
            navLinks.classList.toggle("active");
        }

    });

}


// ==========================================
// PLANNER PAGE
// ==========================================

const tripForm = document.getElementById("tripForm");

if (tripForm) {

    // ------------------------------
    // Budget Quick Buttons
    // ------------------------------

    const budgetButtons =
        document.querySelectorAll(".budget-options button");

    const budgetInput =
        document.getElementById("budget");


    budgetButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedBudget =
                button.dataset.budget;

            budgetInput.value = selectedBudget;

        });

    });


    // ------------------------------
    // Form Submission
    // ------------------------------

    tripForm.addEventListener("submit", (event) => {

        event.preventDefault();


        // Get form values

        const destination =
            document.getElementById("destination").value.trim();

        const startDate =
            document.getElementById("startDate").value;

        const endDate =
            document.getElementById("endDate").value;

        const travelers =
            document.getElementById("travelers").value;

        const budget =
            document.getElementById("budget").value;


        // Travel type

        const travelTypeElement =
            document.querySelector(
                'input[name="travelType"]:checked'
            );

        const travelType =
            travelTypeElement
                ? travelTypeElement.value
                : "solo";


        // Interests

        const selectedInterests =
            Array.from(
                document.querySelectorAll(
                    'input[name="interests"]:checked'
                )
            ).map(input => input.value);


        // ------------------------------
        // Validation
        // ------------------------------

        if (!destination ||
            !startDate ||
            !endDate ||
            !travelers ||
            !budget) {

            alert("Please complete all required fields.");

            return;
        }


        // Check dates

        if (new Date(endDate) < new Date(startDate)) {

            alert("End date cannot be before the start date.");

            return;
        }


        // ------------------------------
        // Create Trip Object
        // ------------------------------

        const tripData = {

            destination: destination,

            startDate: startDate,

            endDate: endDate,

            travelers: travelers,

            budget: budget,

            travelType: travelType,

            interests: selectedInterests

        };


        // ------------------------------
        // Save Data
        // ------------------------------

        localStorage.setItem(
            "tripAIData",
            JSON.stringify(tripData)
        );


        // ------------------------------
        // Go to Itinerary
        // ------------------------------

        window.location.href =
            "itinerary.html";

    });

}


// ==========================================
// ITINERARY PAGE
// ==========================================

const tripTitle =
    document.getElementById("tripTitle");

if (tripTitle) {

    // Get saved data

    const savedTrip =
        localStorage.getItem("tripAIData");


    // If no data exists

    if (!savedTrip) {

        window.location.href =
            "planner.html";

    } else {

        const trip =
            JSON.parse(savedTrip);


        // ------------------------------
        // Format Dates
        // ------------------------------

        const start =
            new Date(trip.startDate);

        const end =
            new Date(trip.endDate);


        // Calculate duration

        const difference =
            end - start;

        const days =
            Math.round(
                difference / (1000 * 60 * 60 * 24)
            ) + 1;


        // ------------------------------
        // Update Page
        // ------------------------------

        tripTitle.textContent =
            trip.destination;


        const tripSubtitle =
            document.getElementById("tripSubtitle");

        if (tripSubtitle) {

            tripSubtitle.textContent =
                `${days} day trip • ${trip.travelType} travel`;

        }


        // Destination

        const summaryDestination =
            document.getElementById(
                "summaryDestination"
            );

        if (summaryDestination) {

            summaryDestination.textContent =
                trip.destination;

        }


        // Duration

        const summaryDuration =
            document.getElementById(
                "summaryDuration"
            );

        if (summaryDuration) {

            summaryDuration.textContent =
                `${days} Days`;

        }


        // Travelers

        const summaryTravelers =
            document.getElementById(
                "summaryTravelers"
            );

        if (summaryTravelers) {

            summaryTravelers.textContent =
                `${trip.travelers} ${
                    Number(trip.travelers) === 1
                        ? "Person"
                        : "People"
                }`;

        }


        // Budget

        const summaryBudget =
            document.getElementById(
                "summaryBudget"
            );

        if (summaryBudget) {

            summaryBudget.textContent =
                `₹${Number(trip.budget).toLocaleString("en-IN")}`;

        }

// ====================================
// UPDATE ITINERARY FOR DESTINATION
// ====================================

const dayCards = document.querySelectorAll(".day-card");

if (dayCards.length > 0 && trip.destination) {

    const destination = trip.destination;

    const itineraryData = [
        {
            title: `${destination} Exploration`,
            description: `Discover the highlights, local culture and popular places in ${destination}.`,
            activities: [
                ["Explore the City", `Start your trip by exploring some of the most popular places in ${destination}.`],
                ["Local Food", `Enjoy delicious local food and experience the flavours of ${destination}.`],
                ["Sightseeing", `Visit a famous attraction and discover what makes ${destination} special.`]
            ]
        },
        {
            title: `Discover ${destination}`,
            description: `Experience more of the culture, attractions and local experiences.`,
            activities: [
                ["Morning Experience", `Enjoy a relaxing morning exploring ${destination}.`],
                ["Local Culture", `Discover the traditions, markets and culture of ${destination}.`],
                ["Evening", `Spend your evening enjoying the atmosphere and local highlights.`]
            ]
        },
        {
            title: `${destination} Leisure Day`,
            description: `Relax and enjoy some of the best experiences ${destination} has to offer.`,
            activities: [
                ["Nature", `Spend some time enjoying the natural beauty around ${destination}.`],
                ["Local Experience", `Try a memorable local experience in ${destination}.`],
                ["Relax & Explore", `Relax and explore anything you may have missed during your trip.`]
            ]
        }
    ];

    dayCards.forEach((card, index) => {

        const data = itineraryData[index % itineraryData.length];

        const title = card.querySelector(".day-header h3");
        const description = card.querySelector(".day-header p");

        if (title) {
            title.textContent = data.title;
        }

        if (description) {
            description.textContent = data.description;
        }

        const activities = card.querySelectorAll(".activity");

        activities.forEach((activity, activityIndex) => {

            const activityTitle = activity.querySelector("h4");
            const activityDescription = activity.querySelector("p");

            const activityData =
                data.activities[activityIndex % data.activities.length];

            if (activityTitle) {
                activityTitle.textContent = activityData[0];
            }

            if (activityDescription) {
                activityDescription.textContent = activityData[1];
            }
        });
    });
}
// ====================================
// SAVE TRIP BUTTON
// ====================================

const saveTripBtn = document.getElementById("saveTripBtn");

if (saveTripBtn) {
    saveTripBtn.addEventListener("click", () => {

        // Get the current trip information
        const savedTrip = {
            destination: trip.destination,
            duration: trip.duration,
            travelers: trip.travelers,
            budget: trip.budget,
            savedAt: new Date().toISOString()
        };

        // Save trip in browser
        localStorage.setItem("tripAI_savedTrip", JSON.stringify(savedTrip));

        // Change button appearance
        saveTripBtn.textContent = "♥ Saved";
        saveTripBtn.style.color = "#2563eb";

        alert("Your trip has been saved! ✈️");
    });
}
}
}