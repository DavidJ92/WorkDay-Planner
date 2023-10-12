$(document).ready(function () {
    // Function to generate time slots from 9 AM to 5 PM
    function generateTimeSlots() {
        var container = $(".container-fluid");
        var currentHour = dayjs().hour();

        for (var hour = 9; hour <= 17; hour++) {
            var timeBlock = $("<div>").addClass("row time-block");
            if (hour < currentHour) {
                timeBlock.addClass("past");
            } else if (hour === currentHour) {
                timeBlock.addClass("present");
            } else {
                timeBlock.addClass("future");
            }

            var hourText = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("h A"));
            var description = $("<textarea>")
                .addClass("col-8 col-md-10 description")
                .attr("rows", "3")
                .attr("id", "description-" + hour);  // Add this line to set the id attribute

            var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>');

            timeBlock.attr("id", "hour-" + hour);
            timeBlock.append(hourText, description, saveBtn);
            container.append(timeBlock);
        }
    }

    // Call the function to generate time slots
    generateTimeSlots();

    // Load saved events from local storage
    $(".time-block").each(function () {
        var hour = parseInt($(this).attr("id").split("-")[1]);
        var savedEvent = localStorage.getItem("event-" + hour);
        if (savedEvent) {
            $(this).find(".description").val(savedEvent);
        }
    });

    // Save button click event
    $(".saveBtn").on("click", function () {
        var hour = parseInt($(this).closest(".time-block").attr("id").split("-")[1]);
        var eventText = $(this).closest(".time-block").find(".description").val();
        localStorage.setItem("event-" + hour, eventText);
        showSaveMessage(); // Call function to show save message
    });

    // Display current date in the header
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Function to show save message
    function showSaveMessage() {
        var saveMessage = $("<div>").addClass("alert alert-success mt-3").text("Changes have been saved!☑️");
        $("#currentDay").after(saveMessage);

        // Remove the message after 5 seconds (5000 milliseconds)
        setTimeout(function () {
            saveMessage.fadeOut("slow", function() {
                $(this).remove();
            });
        }, 5000);
    }
});
