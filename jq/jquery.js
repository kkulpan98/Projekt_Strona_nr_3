$(document).ready(function () {
    initTooltips();
    prepareImageLoader();
});

function initTooltips() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function prepareImageLoader() {
    var uploadImg = document.getElementById('uploadImg');
    var outputImg = document.getElementById('outputImg');

    uploadImg.addEventListener('change', function() {
        var file = this.files[0];
        if (file.type.indexOf('image') < 0) {
            return;
        }

        var fReader = new FileReader();

        fReader.onload = function() {
            outputImg.src = fReader.result;

            localStorage.setItem("imgData", getBase64Image(outputImg));
        };

        fReader.readAsDataURL(file);
    });
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

