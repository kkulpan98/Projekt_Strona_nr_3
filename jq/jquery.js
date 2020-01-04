$(document).ready(function () {
    initTooltips();
    prepareImageLoader();
    applyFilter();
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

    for (var i = 0; i < 1 && i * 300 < image.height - 11; i += 0.04) {
        ctx.globalAlpha = i;
        ctx.fillRect(0, i * 300, i * 300, 10);
        // ctx.fillRect(0, image.width - i * 300,  image.height - i * 300, 10);
    }

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

            // canvas.width = img.width;
            // canvas.height = img.height;

            image.src = fReader.result;

            image.onload = function () {
                // var sourceWidth = this.width;
                // var sourceHeight = this.height;
                // var destX = canvas.width / 2 - this.width / 2;
                // var destY = canvas.height / 2 - this.height / 2;
                ctx.drawImage(this, 0, 0);

                // for (var i = 0; i < 1 && i * 300 < image.height - 11; i += 0.04) {
                //             ctx.globalAlpha = i;
                //             ctx.fillRect(0, i * 300, i * 300, 10);
                //             // ctx.fillRect(0, image.width - i * 300,  image.height - i * 300, 10);
                //         }

                var dataURL = canvas.toDataURL("image/png");


                localStorage.setItem("imgData", dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            };
        };

        fReader.readAsDataURL(file);
    });
}

// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//
//     var dataURL = canvas.toDataURL("image/png");
//
//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

