<template>
  <div class="bg-primary pb-3 min-vh-100 d-flex flex-column" id="header">
    <LinesAnimation />
    <canvas id="animation-canvas" class="position-absolute"></canvas>
    <Nav dark />
    <h1 class="logo text-white mb-0 pt-5 pb-3 d-flex justify-content-center align-items-center">
      Simpl<fa-icon :icon="['far', 'circle']" class="rounded-circle mx-1" style="font-size: 3rem" />r
    </h1>
    <p class="lead text-center text-white-50 mt-3 font-weight-bold">
      Simple, flexible and autonomous Oracle Service<br>for Ethereum Smart Contracts.
    </p>
    <div class="text-center py-5 d-flex flex-column mx-auto">
      <a @click="$store.commit('showModal', 'ModalRequestData')" class="btn btn-light btn-lg my-2 shadow-sm d-flex justify-content-start align-items-center">
        <fa-icon :icon="['fas', 'file-import']" class="mr-3" />
        <div class="d-flex flex-column flex-fill">
          Get Real World Data
          <small class="text-muted">Simple. Low cost. Dezentralized. Any data.</small>
        </div>
      </a>
      <a href="#" class="btn btn-light btn-lg my-2 shadow-sm d-inline-flex justify-content-center align-items-center">
        <fa-icon :icon="['fas', 'genderless']" class="mr-3 fa-2x" />
        <div class="d-flex flex-column flex-fill">
          Become an Oracle
          <small class="text-muted">Install, run and earn in less than 5 minutes!</small>
        </div>
      </a>
      <a @click="$store.commit('showModal', 'ModalCreateAdapter')" class="btn btn-light btn-lg my-2 shadow-sm d-inline-flex justify-content-center align-items-center">
        <fa-icon :icon="['fas', 'code']" class="mr-3" />
        <div class="d-flex flex-column flex-fill">
          Create an Adapter
          <small class="text-muted">Implement any API and earn with every request!</small>
        </div>
      </a>
      <small class="d-flex flex-column py-3 justify-content-center text-white" style="opacity: 0.3">
        Experimental v{{ version }}
        <a class="text-white font-weight-bold" href="https://github.com/mktcode/simplor-website/blob/master/docs/WHITEPAPER.md">
          <fa-icon :icon="['far', 'file']" class="mr-1" />
          <u>Whitepaper</u>
        </a>
      </small>
    </div>
    <a href="#content" class="text-white-50 font-weight-bold d-flex flex-column align-items-center mx-auto mt-auto scroll-link">
      Learn more
      <fa-icon :icon="['fas', 'chevron-down']" class="fa-2x" />
    </a>
  </div>
</template>

<style lang="sass">
  #header
    position: relative
    width: 100%
    overflow: hidden
    background-size: cover
    background-position: center center
    z-index: 1
    background: rgb(0,29,41)
    background: linear-gradient(90deg, rgba(0,29,41,1) 0%, rgba(0,79,112,1) 50%, rgba(0,29,41,1) 100%)
    > *
      position: relative
      z-index: 3
    canvas
      z-index: 2
    .logo
      text-shadow: 0 0 25px rgba(0, 0, 0, 1)
      svg
        width: 3rem
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.35), 0 0 20px inset rgba(0, 0, 0, 0.35)
    .scroll-link
      svg
        transition: top 0.1s ease
        position: relative
        top: 0
      &:hover
        svg
          top: 5px
</style>

<script>
import packageInfo from "@/package.json"

export default {
  computed: {
    version() {
      return packageInfo.version
    }
  },
  mounted() {
    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = {
        x: width / 2,
        y: height / 2
      };

      largeHeader = document.getElementById('header');
      largeHeader.style.height = height + 'px';

      canvas = document.getElementById('animation-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // create points
      points = [];
      for (let x = 0; x < width; x = x + width / 10) {
        for (let y = 0; y < height; y = y + height / 10) {
          let px = x + Math.random() * width / 5;
          let py = y + Math.random() * height / 5;
          let p = {
            x: px,
            originX: px,
            y: py,
            originY: py
          };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (let i = 0; i < points.length; i++) {
        let closest = [];
        let p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          let p2 = points[j]
          if (!(p1 == p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (let i in points) {
        let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.1)');
        points[i].circle = c;
      }
    }

    // Event handling
    function addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
      let posx = 0;
      let posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    }

    // animation
    function initAnimation() {
      animate();
      for (let i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.05;
            points[i].circle.active = 0.15;
          } else if (Math.abs(getDistance(target, points[i])) < 200000) {
            points[i].active = 0.01;
            points[i].circle.active = 0.05;
          } else if (Math.abs(getDistance(target, points[i])) < 400000) {
            points[i].active = 0.005;
            points[i].circle.active = 0.025;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      TweenLite.to(p, 6 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.ease,
        onComplete: function() {
          shiftPoint(p);
        }
      });
    }

    // Canvas manipulation
    function drawLines(p) {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(255,255,255,' + p.active + ')';
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      let _this = this;

      // constructor
      (function() {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
      })();

      this.draw = function() {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255,255,255,' + _this.active + ')';
        ctx.fill();
      };
    }

    // Util
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
  }
}
</script>
