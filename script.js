(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            
            if (s < 10) {
                s = "0" + s;
            }

            if (h < 10) {
                h = "0" + h;
                s += " EL"
            }
            if (h > 12) {
                h -= 12;
                if (h < 10)
                    h = "0" + h;
                s += "PL"
            }

            if (m < 10) {
                m = "0" + m;
            }

            

            c.innerHTML = h + ":" + m + ":" + s ;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perekonnanimi = document.getElementById("lname");


        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
        }
        

        if (!kontrolliMakseviisiValik()) {
            alert("Palun valige maskeviis");
            return;
        }
        
        if(!kontrolliNimeAndmed(eesnimi, perekonnanimi)){
            alert("Valed eesnime ja perekonnanime andmed");
            return;
        }

        else {
            
            e.innerHTML = saaTarneHind(linn) + "&euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }

    function saaTarneHind(linn) {
        if (linn.value === "tln")
            return 0;
        else if (linn.value === "trt")
            return 2.5;
        else if (linn.value === "nrv")
            return 2.5;
        else if (linn.value === "prn")
            return 3;
    }

    function kontrolliMakseviisiValik() {
        if (document.getElementById("swd").checked)
            return true;
        if (document.getElementById("seb").checked)
            return true;
        if (document.getElementById("lhv").checked)
            return true;
        return false;
    }

    function kontrolliNimeAndmed(eesnimi, perekonnanimi) {
        if (eesnimi.value === "")
            return false;
        else if (perekonnanimi.value === "")
            return false;

        let numbrid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (let i = 0; i < eesnimi.value.length; i++) {
            if (numbrid.includes(eesnimi.value.charAt(i)))
                return false;
        }
        for (let i = 0; i < perekonnanimi.value.length; i++) {
            if (numbrid.includes(perekonnanimi.value.charAt(i)))
                return false;
        }
        return true;
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let tartu = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let paris = new Microsoft.Maps.Location(
        48.858093,
        2.294694
    );

    let centerPoint = new Microsoft.Maps.Location(
        53.38104, 
        14.71992
    );

    
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 4,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let infobox;
    
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);



    let pushpin1 = new Microsoft.Maps.Pushpin(tartu, {
        title: 'Tartu Ülikool',
    });
    
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        description: 'UT'
    }

    let pushpin2 = new Microsoft.Maps.Pushpin(paris, {
        title: 'Eiffel Tower'
    });

    pushpin2.metadata = {
        title: 'Eiffel Tower',
        //subTitle: 'Paris',
        description: 'Beautiful tower'
    }

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
}



//https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

