var limits = 15.0;

document.querySelectorAll('.card').forEach(function(card) {
  card.addEventListener('mousemove', function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top; 
    var offsetX = x / rect.width;
    var offsetY = y / rect.height;

    var rotateY = (offsetX) * (limits * 2) - limits;
    var rotateX = (offsetY) * (limits * 2) - limits;

    var shadowOffsetX = (offsetX) * 32 - 16;
    var shadowOffsetY = (offsetY) * 32 - 16;

    card.style.boxShadow =
      (1 / 6) * -shadowOffsetX + "px " + (1 / 6) * -shadowOffsetY + "px 3px rgba(0, 0, 0, 0.051), " +
      (2 / 6) * -shadowOffsetX + "px " + (2 / 6) * -shadowOffsetY + "px 7.2px rgba(0, 0, 0, 0.073), " +
      (3 / 6) * -shadowOffsetX + "px " + (3 / 6) * -shadowOffsetY + "px 13.6px rgba(0, 0, 0, 0.09), " +
      (4 / 6) * -shadowOffsetX + "px " + (4 / 6) * -shadowOffsetY + "px 24.3px rgba(0, 0, 0, 0.107), " +
      (5 / 6) * -shadowOffsetX + "px " + (5 / 6) * -shadowOffsetY + "px 45.5px rgba(0, 0, 0, 0.129), " +
      -shadowOffsetX + "px " + -shadowOffsetY + "px 109px rgba(0, 0, 0, 0.18)";

    card.style.transform = "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)";
  });

});
