/*
* Lelala JS, by Lelala team (https:/www.lelala.de) - last changed: 01.04.2016
* - our highly optimized lowlevel JS code used for our apps on mobile & desktop
* - feel free to copy, modify and use whereever you want
* - comments & critics are highly appreciated!
* 
*/



/*
* GetElementByID() / GetByID(): helper function to save some chars in your code: instead of "document.GetElementById()" just call "GetByID"
*/
function GetElementByID(name) {
    return document.getElementById(name);
}
function GetByID(name) {
    return document.getElementById(name);
}



/*
* GetXHR(): highly efficient function to get a new XHR in your browser; compatible with IE, Firefox, Chrome, Safari etc.
* - if no IE support is required, just remove the lines for Internet Explorer
*/
function GetXHR() {
    if (window.XMLHttpRequest) { // FF&co
        try {
            req = new XMLHttpRequest();
        }
        catch (e) {
            req = false;
        }
    }
    else if (window.ActiveXObject) { //IE
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                req = false;
            }
        }
    }
    if (req) return req;
    else return null;
}


/*
* FetchURLasync(): helper function to fetch the content from a given URL by using GET with a XHR object and its asyncronous modus.
* - the content is put in the OutputElement
* - attention: this function is requesting the content as "text/xml" - if you want to have different output encoding/MIME type, just change the line
* - the call adds an additional "math.random()" call to prevent cache usage, if not required/desired, just remove the code lines
*/
function FetchURLasync(FullTargetURL, OutputElement) {
    var req = GetXHR();
    var fullurl = "";
    if (FullTargetURL.indexOf('?') >= 0) fullurl = FullTargetURL + "&r=" + Math.random().toString();    
    else fullurl = FullTargetURL + "?r=" + Math.random().toString();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText.length > 0) {
                var target = GetByID(OutputElement);
                if (target != null) target.innerHTML = req.responseText;
                return req.responseText;
            }
            else GetByID(OutputElement).innerHTML = "Error: FetchURLasync()";
        }
    }
    req.open("GET", fullurl, true); // ASNYC!
    req.setRequestHeader("Content-Type", "text/xml; charset=UTF-8"); // attention: we are requesting as XML, means we have a outer/mother sibbling around all the stuff!
    req.send(null);
    return GetByID(OutputElement).innerHTML;
}




/*
* ShowElement() helper function: simple way to turn visbility ON by switching the style attribute
*/
function ShowElement(name) {
    var element = GetElementByID(name);
    if (element != null) element.style.visibility = 'visible';
}

/*
* HideElement() helper function: simple way to turn visbility *OFF* by switching the style attribute to "hidden"
*/
function HideElement(name) {
    var element = GetElementByID(name);
    if (element != null) element.style.visibility = 'hidden';
}

/*
* ToggleVisibility() helper function: simple way to TOGGLE the visbility for an element, meaning this function always sets the "opposite" status, like hidden->visible and vice versa
*/
function ToggleVisibility(name) {
    var element = GetElementByID(name);
    if (element != null) {
        if (element.style.visibility == 'hidden') {
            element.style.visibility = 'visible';
            return;
        }
        else if (element.style.visibility == 'visible') {
            element.style.visibility = 'hidden';
            return;
        }
    }
}

/*
* SetClass() helper function: efficient way to set the CSS class for a given objectname
*/
function SetClass(objectname, classname) {
    var obj = GetElementByID(objectname);
    if (obj) obj.className = classname;
}