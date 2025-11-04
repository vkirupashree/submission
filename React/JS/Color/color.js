document.addEventListener("DOMContentLoaded", () => {
    const colors = [
        "aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque",
        "black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue",
        "chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan",
        "darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki",
        "darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon",
        "darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet",
        "deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite",
        "forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray",
        "green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki",
        "lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral",
        "lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink",
        "lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue",
        "lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine",
        "mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue",
        "mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue",
        "mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive",
        "olivedrab","orange","orangered","orchid","palegoldenrod","palegreen",
        "paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum",
        "powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon",
        "sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue",
        "slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato",
        "turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"
    ];

    const container = document.getElementById("colorContainer");
    const showBtn = document.getElementById("showBtn");
    const removeBtn = document.getElementById("removeBtn");
    const darkModeBtn = document.getElementById("darkModeBtn");
    let darkMode = false;

    // Show Colors
    showBtn.addEventListener("click", () => {
        try {
            container.innerHTML = "";
            colors.forEach(color => {
                const div = document.createElement("div");
                div.classList.add("box");
                div.style.backgroundColor = color;

                // Adjust text color for dark backgrounds
                const darkBg = ["black", "blue", "darkblue", "navy", "indigo", "darkgreen",
                                "darkslategray", "midnightblue", "darkred", "purple"];
                if (darkBg.includes(color)) div.style.color = "white";

                div.textContent = color;
                container.appendChild(div);
            });
        } catch (error) {
            console.error("Error showing colors:", error);
            alert("Something went wrong while displaying colors!");
        }
    });

    // Remove Colors
    removeBtn.addEventListener("click", () => {
        try {
            container.innerHTML = "";
        } catch (error) {
            console.error("Error removing colors:", error);
            alert("Could not remove colors!");
        }
    });

    // Dark Mode Toggle
    darkModeBtn.addEventListener("click", () => {
        try {
            darkMode = !darkMode;
            document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#f5f5f5";
            const boxes = document.querySelectorAll(".box");

            boxes.forEach(box => {
                const bgColor = box.style.backgroundColor;
                // Change outline if background matches the page background
                if (darkMode && bgColor === "rgb(245, 245, 245)") {
                    box.style.border = "2px solid white";
                } else if (darkMode) {
                    box.style.border = "2px solid #fff";
                } else {
                    box.style.border = "2px solid transparent";
                }
            });
        } catch (error) {
            console.error("Error toggling dark mode:", error);
            alert("Something went wrong while toggling dark mode!");
        }
    });
});
