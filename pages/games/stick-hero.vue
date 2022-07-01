<template>
  <div class="d-flex align-center justify-center fill-height">
    <div ref="score" id="score">{{ score }}</div>
    <canvas ref="canvas" id="canvas"></canvas>
    <div ref="introduction" id="introduction">
      Hold down the mouse to stretch out a stick
    </div>
    <div ref="perfect" id="perfect">DOUBLE SCORE</div>
    <button ref="restart" id="restart">RESTART</button>
  </div>
</template>

<script>
import gamesMixin from "~/mixins/games";

let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle

export default {
  name: "StickHero",
  layout: "game",
  mixins: [gamesMixin],
  data() {
    return {
      phase: "waiting", // waiting | stretching | turning | walking | transitioning | falling
      platforms: [],
      sticks: [],
      hero: {
        x: undefined, // Changes when moving forward
        y: undefined, // Only changes when falling
        width: 17, // 24
        height: 30, // 40
        distanceFromEdge: 10, // While waiting
      },
      canvasHeight: 375,
      canvasWidth: 375,
      platformHeight: 100,
      paddingX: 100, // The waiting position of the hero in from the original canvas size
      perfectAreaSize: 10,
      speed: {
        stretching: 4, // Milliseconds it takes to draw a pixel
        turning: 4, // Milliseconds it takes to turn a degree
        walking: 4,
        transitioning: 2,
        falling: 2,
      },
    };
  },
  mounted() {
    // If space was pressed restart the game
    window.addEventListener("keydown", (e) => {
      if (e.key == " ") {
        e.preventDefault();
        this.resetGame();
        return;
      }
    });

    window.addEventListener("mousedown", () => {
      if (this.phase == "waiting") {
        lastTimestamp = undefined;
        this.$refs.introduction.style.opacity = 0;
        this.phase = "stretching";
        window.requestAnimationFrame(this.animate);
      }
    });

    window.addEventListener("mouseup", () => {
      if (this.phase == "stretching") {
        this.phase = "turning";
      }
    });

    this.$refs?.restart?.addEventListener("click", (e) => {
      e.preventDefault();
      this.resetGame();
      this.$refs.restart.style.display = "none";
    });

    // Load the game
    this.resetGame();
  },
  methods: {
    // Resets game variables and layouts but does not start the game (game starts on keypress)
    resetGame() {
      // Reset game progress
      this.phase = "waiting";
      lastTimestamp = undefined;
      this.sceneOffset = 0;
      this.score = 0;

      this.$refs.introduction.style.opacity = 1;
      this.$refs.perfect.style.opacity = 0;
      this.$refs.restart.style.display = "none";

      // The first platform is always the same
      // x + w has to match paddingX
      this.platforms = [{ x: 50, w: 50 }];
      this.generatePlatform();
      this.generatePlatform();
      this.generatePlatform();
      this.generatePlatform();

      this.sticks = [
        {
          x: this.platforms[0].x + this.platforms[0].w,
          length: 0,
          rotation: 0,
        },
      ];

      this.trees = [];
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();
      this.generateTree();

      this.hero.x =
        this.platforms[0].x + this.platforms[0].w - this.hero.distanceFromEdge;
      this.hero.y = 0;

      this.draw();
    },
    generatePlatform() {
      const minimumGap = 40;
      const maximumGap = 200;
      const minimumWidth = 20;
      const maximumWidth = 100;

      // X coordinate of the right edge of the furthest platform
      const lastPlatform = this.platforms[this.platforms.length - 1];
      let furthestX = lastPlatform.x + lastPlatform.w;

      const x =
        furthestX +
        minimumGap +
        Math.floor(Math.random() * (maximumGap - minimumGap));
      const w =
        minimumWidth +
        Math.floor(Math.random() * (maximumWidth - minimumWidth));

      this.platforms.push({ x, w });
    },
    animate(timestamp) {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        window.requestAnimationFrame(this.animate);
        return;
      }

      switch (this.phase) {
        case "waiting":
          return; // Stop the loop
        case "stretching": {
          this.sticks.last().length +=
            (timestamp - lastTimestamp) / this.speed.stretching;
          break;
        }
        case "turning": {
          this.sticks.last().rotation +=
            (timestamp - lastTimestamp) / this.speed.turning;

          if (this.sticks.last().rotation > 90) {
            this.sticks.last().rotation = 90;

            const [nextPlatform, perfectHit] = this.thePlatformTheStickHits();
            if (nextPlatform) {
              // Increase score
              this.score += perfectHit ? 2 : 1;

              if (perfectHit) {
                this.$refs.perfect.style.opacity = 1;
                setTimeout(() => (this.$refs.perfect.style.opacity = 0), 1000);
              }

              this.generatePlatform();
              this.generateTree();
              this.generateTree();
            }

            this.phase = "walking";
          }
          break;
        }
        case "walking": {
          this.hero.x += (timestamp - lastTimestamp) / this.speed.walking;

          const [nextPlatform] = this.thePlatformTheStickHits();
          if (nextPlatform) {
            // If hero will reach another platform then limit it's position at it's edge
            const maxHeroX =
              nextPlatform.x + nextPlatform.w - this.hero.distanceFromEdge;
            if (this.hero.x > maxHeroX) {
              this.hero.x = maxHeroX;
              this.phase = "transitioning";
            }
          } else {
            // If hero won't reach another platform then limit it's position at the end of the pole
            const maxHeroX =
              this.sticks.last().x +
              this.sticks.last().length +
              this.hero.width;
            if (this.hero.x > maxHeroX) {
              this.hero.x = maxHeroX;
              this.phase = "falling";
            }
          }
          break;
        }
        case "transitioning": {
          this.sceneOffset +=
            (timestamp - lastTimestamp) / this.speed.transitioning;

          const [nextPlatform] = this.thePlatformTheStickHits();
          if (
            this.sceneOffset >
            nextPlatform.x + nextPlatform.w - this.paddingX
          ) {
            // Add the next step
            this.sticks.push({
              x: nextPlatform.x + nextPlatform.w,
              length: 0,
              rotation: 0,
            });
            this.phase = "waiting";
          }
          break;
        }
        case "falling": {
          if (this.sticks.last().rotation < 180)
            this.sticks.last().rotation +=
              (timestamp - lastTimestamp) / this.speed.turning;

          this.hero.y += (timestamp - lastTimestamp) / this.speed.falling;
          const maxHeroY =
            this.platformHeight +
            100 +
            (window.innerHeight - this.canvasHeight) / 2;
          if (this.hero.y > maxHeroY) {
            this.$refs.restart.style.display = "block";
            return;
          }
          break;
        }
        default:
          throw Error("Wrong phase");
      }

      this.draw();
      window.requestAnimationFrame(this.animate);

      lastTimestamp = timestamp;
    },
    // Returns the platform the stick hit (if it didn't hit any stick then return undefined)
    thePlatformTheStickHits() {
      if (this.sticks.last().rotation != 90)
        throw Error(`Stick is ${this.sticks.last().rotation}°`);
      const stickFarX = this.sticks.last().x + this.sticks.last().length;

      const platformTheStickHits = this.platforms.find(
        (platform) =>
          platform.x < stickFarX && stickFarX < platform.x + platform.w
      );

      // If the stick hits the perfect area
      if (
        platformTheStickHits &&
        platformTheStickHits.x +
          platformTheStickHits.w / 2 -
          this.perfectAreaSize / 2 <
          stickFarX &&
        stickFarX <
          platformTheStickHits.x +
            platformTheStickHits.w / 2 +
            this.perfectAreaSize / 2
      )
        return [platformTheStickHits, true];

      return [platformTheStickHits, false];
    },
    draw() {
      this.ctx.save();
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      this.drawBackground();

      // Center main canvas area to the middle of the screen
      this.ctx.translate(
        (window.innerWidth - this.canvasWidth) / 2 - this.sceneOffset,
        (window.innerHeight - this.canvasHeight) / 2
      );

      // Draw scene
      this.drawPlatforms();
      this.drawHero();
      this.drawSticks();

      // Restore transformation
      this.ctx.restore();
    },
    drawPlatforms() {
      this.platforms.forEach(({ x, w }) => {
        // Draw platform
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(
          x,
          this.canvasHeight - this.platformHeight,
          w,
          this.platformHeight + (window.innerHeight - this.canvasHeight) / 2
        );

        // Draw perfect area only if hero did not yet reach the platform
        if (this.sticks.last().x < x) {
          this.ctx.fillStyle = "#30393f";
          this.ctx.fillRect(
            x + w / 2 - this.perfectAreaSize / 2,
            this.canvasHeight - this.platformHeight,
            this.perfectAreaSize,
            this.perfectAreaSize
          );
        }
      });
    },
    drawHero() {
      this.ctx.save();
      this.ctx.fillStyle = "black";
      this.ctx.translate(
        this.hero.x - this.hero.width / 2,
        this.hero.y +
          this.canvasHeight -
          this.platformHeight -
          this.hero.height / 2
      );

      // Body
      this.drawRoundedRect(
        -this.hero.width / 2,
        -this.hero.height / 2,
        this.hero.width,
        this.hero.height - 4,
        5
      );

      // Legs
      const legDistance = 5;
      this.ctx.beginPath();
      this.ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
      this.ctx.fill();

      // Eye
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
      this.ctx.fill();

      // Band
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        -this.hero.width / 2 - 1,
        -12,
        this.hero.width + 2,
        4.5
      );
      this.ctx.beginPath();
      this.ctx.moveTo(-9, -14.5);
      this.ctx.lineTo(-17, -18.5);
      this.ctx.lineTo(-14, -8.5);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(-10, -10.5);
      this.ctx.lineTo(-15, -3.5);
      this.ctx.lineTo(-5, -7);
      this.ctx.fill();

      this.ctx.restore();
    },
    drawRoundedRect(x, y, width, height, radius) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + radius);
      this.ctx.lineTo(x, y + height - radius);
      this.ctx.arcTo(x, y + height, x + radius, y + height, radius);
      this.ctx.lineTo(x + width - radius, y + height);
      this.ctx.arcTo(
        x + width,
        y + height,
        x + width,
        y + height - radius,
        radius
      );
      this.ctx.lineTo(x + width, y + radius);
      this.ctx.arcTo(x + width, y, x + width - radius, y, radius);
      this.ctx.lineTo(x + radius, y);
      this.ctx.arcTo(x, y, x, y + radius, radius);
      this.ctx.fill();
    },
    drawSticks() {
      this.sticks.forEach((stick) => {
        this.ctx.save();

        // Move the anchor point to the start of the stick and rotate
        this.ctx.translate(stick.x, this.canvasHeight - this.platformHeight);
        this.ctx.rotate((Math.PI / 180) * stick.rotation);

        // Draw stick
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -stick.length);
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();

        // Restore transformations
        this.ctx.restore();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#score {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 2em;
  font-weight: 900;
}

#introduction {
  width: 200px;
  height: 150px;
  position: absolute;
  font-weight: 600;
  font-size: 0.8em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  transition: opacity 2s;
}

#restart {
  width: 120px;
  height: 120px;
  position: absolute;
  border-radius: 50%;
  color: white;
  background-color: red;
  border: none;
  font-weight: 700;
  font-size: 1.2em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: none;
  cursor: pointer;
}

#perfect {
  position: absolute;
  opacity: 0;
  transition: opacity 2s;
}
</style>