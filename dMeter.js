;
(function () {

    "use strict"

    var numbers = (function () {

        function createRandNum(index) {
            return ~~Math.floor(Math.random() * index);
        }

        Array.prototype.shuffle = function () {
            var i = this.length;

            this[1] = createRandNum(i);

            while (i) {
                var j = createRandNum(i);
                var t = this[--i];
                this[i] = this[j];
                this[j] = t;
            }

            this[1] = 10;

            return this;
        }

        var numList = [];
        for (var i = 0; i < 8; i++) {
            numList.push(createRandNum(10));
        }
        numList[1] = 10;

        return numList;
    })();

    var dMeterCanvas = (function () {
        var canvas = document.getElementById("dMeter");

        canvas.width = 350;
        canvas.height = 150;

        return canvas;
    })();

    var img = (function () {
        var img = new Image();

        img.src = "numbers.png";

        return img;
    })();

    function createCanvas() {
        var canvas = document.createElement("canvas");

        canvas.width = 350;
        canvas.height = 135;

        return canvas;
    }

    function drawNixieTubes(canvas, arr, isHighlighted) {

        var context = canvas.getContext("2d");
        var sy = canvas.height * (isHighlighted ? 1 : 0);

        for (var i = 0; i < arr.length; i++) {
            context.drawImage(img, 45 * arr[i], sy, 45, canvas.height, canvas.width / 8 * i, 0, 45, canvas.height);
        }

        return canvas;
    }

    function findWorldLine() {
        var loop = setInterval(function () {
            numbers.shuffle();
            drawNixieTubes(dMeterCanvas, numbers, false);
        }, 10);

        return loop;
    }

    function blink(canvas, isShiny) {

        canvas = drawNixieTubes(canvas, numbers, isShiny);

        var context = dMeterCanvas.getContext("2d");
        context.globalAlpha = 0;

        var shine = setInterval(function () {
            context.drawImage(canvas, 0, 0);
            context.globalAlpha += 0.02;
        }, 50);

        return shine;
    }

    function determined() {
        var lighting = createCanvas();
        var shine = blink(lighting, true);

        setTimeout(function () {
            clearInterval(shine);

            var unShine = blink(lighting, false);

            setTimeout(function () {
                clearInterval(unShine);
                clicked = false;
            }, 1000);

        }, 1000);
    }

    function changeWorldLine() {

        var loop = findWorldLine();

        setTimeout(function () {
            clearInterval(loop);
            determined();
        }, 1000);
    }

    var clicked = false;
    if (null != document.getElementById("dMail")) {
        document.getElementById("dMail").addEventListener("click", function () {
            if (clicked === false) {
                clicked = true;
                changeWorldLine();
            }
        }, false);
    }

    //main
    changeWorldLine();

})();
