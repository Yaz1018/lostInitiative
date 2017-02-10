// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average scripting time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  // called the .movers by class as opposed to an allselector
  var items = document.getElementsByClassName('mover');
  // pulled the meat of the math out of the loop to avoid redundancies
  var sin = document.body.scrollTop / 1250;
  // you'll see most my loops count down; that is due to this liesure reading http://stackoverflow.com/questions/1340589/are-loops-really-faster-in-reverse

    var phase = [];
  
    for (var g = 3; g--;) {
      phase.push(Math.sin(sin + g) * 1125.2);
    }

    for (var i = items.length; i--;) {
      // items[i].style.left = items[i].basicLeft + phase [i % 3] + 'px';
    // it took me a long while to figure out for to both style.transform & 'phase' the .movers
      var shift = items[i].basicLeft + phase [i % 3] + 'px';
        items[i].style.transform = "translateX("+shift+") translateZ(0)";
              // console.log('shift = ', shift);
    }
}

// runs updatePositions on scroll
window.addEventListener('scroll', function() {
// optimized the eventListener to pull all .movers as a requestAnimationFrame
    window.requestAnimationFrame(updatePositions);
});

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  // reduced the numberof columns to the total that can be seen on screen
  var cols = 8;
  var s = 256;
  var height = self.innerHeight;
  var numberOfPizzas = height / s * cols;
  // reduced the number of .movers to the total you can see on screen
  for (var i = 0; i < numberOfPizzas; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    // Made the image smaller to not waste load time
    elem.src = "img/d20.png";
    // recentered the 18 .movers after i optimized the code
    elem.basicLeft = 950 - (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  updatePositions();
});

$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel").carousel({interval: 2000});
    
    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel").carousel(2);
    });
    $(".item4").click(function(){
        $("#myCarousel").carousel(3);
    });
    
    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel").carousel("next");
    });
});
