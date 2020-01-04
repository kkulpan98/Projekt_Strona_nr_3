$(document).ready(function () {
    initTooltips();
    prepareImageLoader();
    applyFilter();
    prepareSliders();
});

var image = new Image();
var ctx;
var canvas;

function initTooltips() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function applyFilter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    filterNr1();
}

function prepareImageLoader() {
    var uploadImg = document.getElementById('uploadImg');
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    uploadImg.addEventListener('change', function () {
        var file = this.files[0];
        if (file.type.indexOf('image') < 0) {
            return;
        }

        var fReader = new FileReader();

        fReader.onload = function () {

            image.src = fReader.result;
            image.onload = function () {
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                localStorage.setItem("imgData", dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            };
        };

        fReader.readAsDataURL(file);
    });
}

function prepareSliders() {
    var slider = document.getElementById("filter1range");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}

function filterNr1() {

    var slider_value1 = document.getElementById("filter1range1").value;
    var slider_value2 = document.getElementById("filter1range2").value;
    var slider_value3 = document.getElementById("filter1range3").value;
    var slider_value4 = document.getElementById("filter1range4").value;

    for (var i = 0; i < 1 && i * slider_value1 < image.height - 11; i += 0.04) {
        ctx.globalAlpha = i;
        ctx.fillRect(0, i * slider_value1 + i * slider_value4, i * slider_value2, slider_value3);
    }
}
