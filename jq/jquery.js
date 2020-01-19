$(document).ready(function () {
    initTooltips();
    prepareImageLoader();
    applyFilter();
    prepareDownloadImage();
});

var image = new Image();
var ctx;
var canvas;
var image_x;
var image_y;

function initTooltips() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function applyFilter() {
    image_x = parseInt(document.getElementById("image_x").value, 10);
    image_y = parseInt(document.getElementById("image_y").value, 10);
    var opacity = parseInt(document.getElementById("filter7range1").value, 10);


    ctx.globalAlpha = opacity / 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, image_x, image_y);

    filterNr1();
    filterNr2();
    filterNr3();
    filterNr4();
    filterNr5();
    filterNr6();
    filterNr7();
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


                console.log("image_height" + image.height);
                console.log("image_width" + image.width);

                canvas.height = image.height + 410;
                canvas.width = image.width + 410;

                applyFilter();

                var dataURL = canvas.toDataURL("image/png");
                localStorage.setItem("imgData", dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            };
        };

        fReader.readAsDataURL(file);
    });
}

function filterNr1() { // filtr to takie schodki
    var use = $("#filter1toggle");

    if (use.prop("checked")) {
        var slider_value1 = document.getElementById("filter1range1").value;
        var slider_value2 = document.getElementById("filter1range2").value;
        var slider_value3 = document.getElementById("filter1range3").value;
        var slider_value4 = document.getElementById("filter1range4").value;

        ctx.fillStyle = document.getElementById("filter1color1").value;

        for (var i = 0; i < 1 && i * slider_value1 < image.height - 11; i += 0.04) {
            ctx.globalAlpha = i;
            ctx.fillRect(image_x, image_y + i * slider_value1 + i * slider_value4, i * slider_value2, slider_value3);
        }
    }

    ctx.globalAlpha = 1;
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
    var slider_value_1 = parseInt(document.getElementById("filter4range1").value, 10);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var image_data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < image_data.length; i += 4) {
        image_data[i] += slider_value_1;
        image_data[i + 1] += slider_value_1;
        image_data[i + 2] += slider_value_1;
    }

    ctx.putImageData(imageData, image_x, image_y);
}

function filterNr5() {
    var input_value_1 = parseFloat(document.getElementById("filter5input1").value);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var image_data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < image_data.length; i += 4) {
        image_data[i] = Math.pow(image_data[i], 1 / input_value_1);
        image_data[i + 1] = Math.pow(image_data[i + 1], 1 / input_value_1);
        image_data[i + 2] = Math.pow(image_data[i + 2], 1 / input_value_1);
    }

    ctx.putImageData(imageData, image_x, image_y);
}

function filterNr6() { // manipulacja poziomami kolorow
    var slider_value_1 = parseInt(document.getElementById("filter6range1").value, 10);
    var slider_value_2 = parseInt(document.getElementById("filter6range2").value, 10);
    var slider_value_3 = parseInt(document.getElementById("filter6range3").value, 10);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var image_data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < image_data.length; i += 4) {
        image_data[i] += slider_value_1;
        image_data[i + 1] += slider_value_2;
        image_data[i + 2] += slider_value_3;
    }

    ctx.putImageData(imageData, image_x, image_y);
}

function filterNr7() {
    var use = $("#filter8toggle");
    if (use.prop("checked")) {
        var pomidor = new Image();
        pomidor.src = "img/pomidorek.png";
        drawImageBorderType1(pomidor);
    }
}

function drawImageBorderType1(input_image) {
    var slider_value_1 = parseInt(document.getElementById("filter8range1").value, 10);

    input_image.onload = function () {

        image_width = input_image.width * 50 / (101 - slider_value_1);
        image_height = input_image.height * 50 / (101 - slider_value_1);

        ctx.drawImage(input_image, 0, 0, image_width, image_height);
        ctx.drawImage(input_image, canvas.width / 2 - image_width / 2, 0, image_width, image_height);
        ctx.drawImage(input_image, canvas.width - image_width, 0, image_width, image_height);

        ctx.drawImage(input_image, 0, canvas.height / 2 - image_height / 2, image_width, image_height);
        ctx.drawImage(input_image, canvas.width - image_width, canvas.height / 2 - image_height / 2, image_width, image_height);

        ctx.drawImage(input_image, 0, canvas.height - image_height, image_width, image_height);
        ctx.drawImage(input_image, canvas.width / 2 - image_width / 2, canvas.height - image_height, image_width, image_height);
        ctx.drawImage(input_image, canvas.width - image_width, canvas.height - image_height, image_width, image_height);
    }
}

function prepareDownloadImage() {
    var link = document.getElementById("download_image_button");
    link.addEventListener('click', function (ev) {
        link.href = canvas.toDataURL();
        link.download = "canvas_output.png";
    }, false);
    document.body.appendChild(this);
}

