$(document).ready(function () {
    initTooltips();
    prepareImageLoader();
    applyFilter();
    // prepareSliders();
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
    filterNr2();
    filterNr3();
    filterNr4()
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

// function prepareSliders() {
//     var slider = document.getElementById("filter1range");
//     var output = document.getElementById("demo");
//     output.innerHTML = slider.value; // Display the default slider value
//
//     slider.oninput = function() {
//         output.innerHTML = this.value;
//     }
// }

function filterNr1() { // filtr to takie schodki
    var use = $("#filter1toggle");

    if (use.prop("checked")) {
        var slider_value1 = document.getElementById("filter1range1").value;
        var slider_value2 = document.getElementById("filter1range2").value;
        var slider_value3 = document.getElementById("filter1range3").value;
        var slider_value4 = document.getElementById("filter1range4").value;

        for (var i = 0; i < 1 && i * slider_value1 < image.height - 11; i += 0.04) {
            ctx.globalAlpha = i;
            ctx.fillRect(0, i * slider_value1 + i * slider_value4, i * slider_value2, slider_value3);
        }
    }
}

function filterNr2() { // negatyw
    var use = $("#filter2toggle");

    if (use.prop("checked")) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var image_data = imageData.data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < image_data.length; i += 4) {
            image_data[i] = 255 - image_data[i];
            image_data[i + 1] = 255 - image_data[i + 1];
            image_data[i + 2] = 255 - image_data[i + 2];
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

function filterNr3() { // czarno-bialy
    var use = $("#filter3toggle");
    if (use.prop("checked")) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var image_data = imageData.data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < image_data.length; i += 4) {
            var brightness = 0.34 * image_data[i] + 0.5 * image_data[i + 1] + 0.16 * image_data[i + 2];
            image_data[i] = brightness;
            image_data[i + 1] = brightness;
            image_data[i + 2] = brightness;
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

function filterNr4() {
    var slider_value_1 = document.getElementById("filter4range1").value;
    slider_value_1 = parseInt(slider_value_1, 10);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var image_data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < image_data.length; i += 4) {
        image_data[i] += slider_value_1;
        image_data[i + 1] += slider_value_1;
        image_data[i + 2] += slider_value_1;
    }

    ctx.putImageData(imageData, 0, 0);
}