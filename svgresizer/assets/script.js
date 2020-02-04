var fileUpload = document.getElementById("file_upload");
var xmlDoc;
fileUpload.addEventListener("change", function(){
	var fileSvg = fileUpload.files[0];
	var reader = new FileReader();
	reader.readAsText(fileSvg);	
	reader.onload = function(){
		
		if(fileSvg.type == "text/xml"){
 			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(reader.result,"text/xml");
			var vector = xmlDoc.getElementsByTagName("vector")[0];
			var width = vector.getAttribute("android:viewportWidth");
			var height = vector.getAttribute("android:viewportHeight");
			var childs = vector.innerHTML;
			var svgImage = "<svg viewBox=\"0 0 " + width + " " + height + "\">" + childs + "</svg>";
			svgImage = svgImage.replace(/android:fillColor=/g,"fill=");
			svgImage = svgImage.replace(/android:pathData=/g,"d=");
			svgImage = svgImage.replace(/android:fillType=/g,"fill-rule=");
			
			console.log("value : "+svgImage);
			document.getElementById("svg_preview").innerHTML = svgImage;	
		}
		else{
			document.getElementById("svg_preview").innerHTML = reader.result;	
		}
		document.getElementById("svg_form").style.display = "block";
	}
});

var playGround = function(){
	var resizeValue = document.getElementById("resize_value").value;
	document.getElementsByTagName("svg")[0].setAttribute("id","svg_resize");
	document.getElementsByTagName("svg")[0].setAttribute("width", resizeValue);
	document.getElementsByTagName("svg")[0].setAttribute("height", resizeValue);
	//document.getElementById("download_wrapper").style.display = "block";
	var fileRename = "icon-" + resizeValue + "px.png";
	document.getElementById("data").setAttribute("download", fileRename);
	
}

function exportResizedSvg() {
				playGround();
                var svg = document.getElementById("svg_resize");
				var img = document.getElementById("fromcanvas");
				svg.toDataURL("image/png", {
					callback: function(data) {
						img.setAttribute("src", data)
						var a = document.querySelector("#data")
						a.href = data;
						a.click()
					}
				})
			}
