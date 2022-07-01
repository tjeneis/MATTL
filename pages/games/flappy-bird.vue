<template>
  <div class="d-flex align-center justify-center fill-height">
    <div v-if="!playing" class="game-overlay" @click="playing = true">
      {{ $t("startGame") }}
    </div>
    <canvas ref="canvas" id="canvas" />
  </div>
</template>

<script>
import gamesMixin from "~/mixins/games";
import flappyBirdSprite from "~/assets/games/flappy-bird/sprite.png";

export default {
  name: "FlappyBird",
  layout: "game",
  mixins: [gamesMixin],
  data() {
    return {
      sprite: undefined,
      gravity: 0.5,
      speed: 6.2,
      jumpSize: -10,
      birdSize: [51, 36],
      pipes: [],
      pipeWidth: 78,
      pipeGap: 270,
      flight: 0,
      flyHeight: 0,
    };
  },
  computed: {
    cTenth() {
      return this.canvas?.width / 2 - this.birdSize[0] / 2;
    },
  },
  mounted() {
    // Bind event listeners
    window.addEventListener("click", (e) => {
      e.preventDefault();
      const { jumpSize } = this;
      if (this.playing) this.flight = jumpSize;
    });

    // Load the game
    this.resetGame();

    // Load sprite
    this.sprite = new Image();
    this.sprite.src = flappyBirdSprite;
    this.sprite.onLoad = this.render();
  },
  methods: {
    resetGame() {
      const { pipeWidth, pipeGap, birdSize, jumpSize } = this;

      // Set initial flyHeight (middle of screen - size of the bird)
      this.flight = jumpSize;
      this.flyHeight = canvas.height / 2 - birdSize[1] / 2;

      // Reset game progress
      this.sceneOffset = 0;
      this.score = 0;

      // Setup trees
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

      // Setup first 3 pipes
      this.pipes = Array(3)
        .fill()
        .map((a, i) => [
          canvas.width + i * (pipeGap + pipeWidth),
          this.pipeLoc(),
        ]);
    },
    render() {
      let index = 0;
      const {
        canvas,
        ctx,
        sprite,
        cTenth,
        playing,
        gravity,
        speed,
        birdSize,
        pipeWidth,
        pipeGap,
        flight,
        flyHeight,
      } = this;

      // make the pipe and bird moving
      index++;

      this.drawBackground();

      // pipe display
      if (playing) {
        this.pipes.map((pipe) => {
          // pipe moving
          pipe[0] -= speed;

          // top pipe
          ctx.drawImage(
            sprite,
            432,
            588 - pipe[1],
            pipeWidth,
            pipe[1],
            pipe[0],
            0,
            pipeWidth,
            pipe[1]
          );

          // bottom pipe
          ctx.drawImage(
            sprite,
            432 + pipeWidth,
            108,
            pipeWidth,
            canvas.height - pipe[1] + pipeGap,
            pipe[0],
            pipe[1] + pipeGap,
            pipeWidth,
            canvas.height - pipe[1] + pipeGap
          );

          // give 1 point & create new pipe
          if (pipe[0] <= -pipeWidth) {
            this.score++;
            // check if it's the highscore
            this.highscore = Math.max(this.highscore, this.score);

            // remove & create new pipe
            this.pipes = [
              ...this.pipes.slice(1),
              [
                this.pipes[this.pipes.length - 1][0] + pipeGap + pipeWidth,
                this.pipeLoc(),
              ],
            ];
          }

          // if hit the pipe, end
          if (
            [
              pipe[0] <= cTenth + birdSize[0],
              pipe[0] + pipeWidth >= cTenth,
              pipe[1] > flyHeight ||
                pipe[1] + pipeGap < flyHeight + birdSize[1],
            ].every((elem) => elem)
          ) {
            this.playing = false;
            this.resetGame();
          }
        });
      }

      // draw bird
      if (playing) {
        ctx.drawImage(
          sprite,
          432,
          Math.floor((index % 9) / 3) * birdSize[1],
          ...birdSize,
          cTenth,
          flyHeight,
          ...birdSize
        );
        this.flight += gravity;
        this.flyHeight = Math.min(
          flyHeight + flight,
          canvas.height - birdSize[1]
        );
      } else {
        ctx.drawImage(
          sprite,
          432,
          Math.floor((index % 9) / 3) * birdSize[1],
          ...birdSize,
          canvas.width / 2 - birdSize[0] / 2,
          flyHeight,
          ...birdSize
        );
        this.flyHeight = canvas.height / 2 - birdSize[1] / 2;
      }

      // tell the browser to perform anim
      window.requestAnimationFrame(this.render);
    },
    start() {
      this.playing = true;
    },
    pipeLoc() {
      const { canvas, pipeWidth, pipeGap } = this;

      return (
        Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
        pipeWidth
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

header {
  text-align: center;
  font-family: "Press Start 2P", cursive;
  margin: 0 auto;
  width: 431px;

  h1 {
    background: url("~assets/games/flappy-bird/sprite.png") 0% 340px;
    padding: 1.2rem 0;
    margin: 0;
  }

  .score-container {
    display: flex;
    justify-content: space-between;
    padding: 8px 6px;
    background: #2c597a;
    color: white;
  }
}
</style>