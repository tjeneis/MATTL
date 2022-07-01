// Extend the base functionality of JavaScript
Array.prototype.last = function () {
  return this[this.length - 1];
};

// A sinus function that acceps degrees instead of radians
Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

export default {
  data() {
    return {
      playing: false,
      highscore: 0,
      score: 0,
      trees: [],
      sceneOffset: undefined, // Moves the whole game
      backgroundSpeedMultiplier: 0.2, // The background moves slower than the hero
      hill1: {
        baseHeight: 100,
        amplitude: 10,
        stretch: 1,
      },
      hill2: {
        baseHeight: 70,
        amplitude: 20,
        stretch: 0.5,
      },
    }
  },
  computed: {
    canvas() {
      return this.$refs?.canvas;
    },
    ctx() {
      return this.canvas?.getContext("2d");
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    // Set canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  methods: {
    generateTree() {
      const minimumGap = 30;
      const maximumGap = 150;

      // X coordinate of the right edge of the furthest tree
      const lastTree = this.trees[this.trees.length - 1];
      let furthestX = lastTree ? lastTree.x : 0;

      const x =
        furthestX +
        minimumGap +
        Math.floor(Math.random() * (maximumGap - minimumGap));

      const treeColors = ["#FFFFFF", "#EAEAEA", "#DCE9EF"];
      const color = treeColors[Math.floor(Math.random() * 3)];

      this.trees.push({ x, color });
    },
    drawBackground() {
      // Draw sky
      var gradient = this.ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, "#8BA9B9");
      gradient.addColorStop(1, "#B1C5D3");
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw hills
      this.drawHill(
        this.hill1.baseHeight,
        this.hill1.amplitude,
        this.hill1.stretch,
        "#FFFFFF"
      );
      this.drawHill(
        this.hill2.baseHeight,
        this.hill2.amplitude,
        this.hill2.stretch,
        "#DCE9EF"
      );

      // Draw trees
      this.trees.forEach((tree) => this.drawTree(tree.x, tree.color));
    },
    // A hill is a shape under a stretched out sinus wave
    drawHill(baseHeight, amplitude, stretch, color) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, window.innerHeight);
      this.ctx.lineTo(0, this.getHillY(0, baseHeight, amplitude, stretch));
      for (let i = 0; i < window.innerWidth; i++) {
        this.ctx.lineTo(i, this.getHillY(i, baseHeight, amplitude, stretch));
      }
      this.ctx.lineTo(window.innerWidth, window.innerHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    },
    drawTree(x, color) {
      this.ctx.save();
      this.ctx.translate(
        (-this.sceneOffset * this.backgroundSpeedMultiplier + x) *
        this.hill1.stretch,
        this.getTreeY(x, this.hill1.baseHeight, this.hill1.amplitude)
      );

      const treeTrunkHeight = 5;
      const treeTrunkWidth = 2;
      const treeCrownHeight = 25;
      const treeCrownWidth = 10;

      // Draw trunk
      this.ctx.fillStyle = "#231F20";
      this.ctx.fillRect(
        -treeTrunkWidth / 2,
        -treeTrunkHeight,
        treeTrunkWidth,
        treeTrunkHeight
      );

      // Draw crown
      this.ctx.beginPath();
      this.ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
      this.ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
      this.ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();

      this.ctx.restore();
    },
    getHillY(windowX, baseHeight, amplitude, stretch) {
      const sineBaseY = window.innerHeight - baseHeight;
      return (
        Math.sinus(
          (this.sceneOffset * this.backgroundSpeedMultiplier + windowX) *
          stretch
        ) *
        amplitude +
        sineBaseY
      );
    },
    getTreeY(x, baseHeight, amplitude) {
      const sineBaseY = window.innerHeight - baseHeight;
      return Math.sinus(x) * amplitude + sineBaseY;
    },
  }
}