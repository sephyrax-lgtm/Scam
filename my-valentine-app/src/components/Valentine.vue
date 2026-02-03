<template>
  <div class="container">
    <!-- Fond photo -->
    <div class="background"></div>

    <!-- Texte principal animé -->
    <h1 class="title">
      <span
        v-for="(letter, index) in letters"
        :key="index"
        class="letter"
        :style="{ 'animation-delay': index * 0.1 + 's' }"
      >
        {{ letter }}
      </span>
    </h1>

    <!-- Boutons -->
    <div class="buttons">
      <!-- Yes -->
      <button
        class="btn yes"
        :style="{ transform: 'scale(' + yesScale + ')' }"
        @click="clickYes"
      >
        Yes 💖
      </button>

      <!-- No -->
      <button
        class="btn no"
        @click="clickNo"
        @mouseover="moveNo"
        :style="{ top: noTop + 'px', left: noLeft + 'px' }"
      >
        No 😢
      </button>
    </div>

    <!-- Message qui apparaît -->
    <transition name="fade">
      <div v-if="showLove" class="message-container">
        <p class="response">You just made my heart smile 💕</p>
        <p class="response">Ps: Samy a pris ma play du coup je n'ai rien faire bref je t'aime 💕</p>
      </div>
    </transition>

    <!-- Cœurs tombants -->
    <div
      v-for="n in 20"
      :key="'fall' + n"
      class="heart"
      :style="randomHeartStyle()"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Valentine",
  data() {
    return {
      showLove: false,
      letters: "Will you be my Valentine?".split(''),
      yesScale: 1,
      noTop: 0,
      noLeft: 200
    };
  },
  methods: {
    clickYes() {
      this.showLove = true;
      // Agrandir brièvement le bouton Yes
      this.yesScale = 1.5;
      setTimeout(() => { this.yesScale = 1; }, 300);
    },
    clickNo() {
      // Chaque fois qu'on clique sur No, le bouton Yes grossit un peu
      this.yesScale += 0.2;
      this.showLove = true;
    },
    moveNo() {
      // Déplace le bouton No à une position aléatoire
      const width = window.innerWidth - 100;
      const height = window.innerHeight - 50;
      this.noLeft = Math.random() * width;
      this.noTop = Math.random() * height;
    },
    randomHeartStyle() {
      const left = Math.random() * 100 + "%";
      const duration = 3 + Math.random() * 2 + "s";
      const size = 10 + Math.random() * 20 + "px";
      return {
        left,
        animationDuration: duration,
        width: size,
        height: size
      };
    }
  }
};
</script>

<style scoped>
/* Fond photo */
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('/IMG_3699.jpeg') center/cover no-repeat;
  filter: brightness(0.6);
  z-index: -1;
}

/* Container */
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  font-family: 'Arial', sans-serif;
  position: relative;
}

/* Texte animé */
.title {
  font-size: 3rem;
  color: white;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(-20px);
  animation: floatIn 0.5s forwards;
}
@keyframes floatIn {
  to { opacity: 1; transform: translateY(0); }
}

/* Boutons */
.buttons {
  position: relative;
  height: 60px;
  margin-bottom: 20px;
}
.btn {
  padding: 12px 24px;
  border-radius: 30px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s;
  position: absolute;
}
.yes {
  background: #ff2d55;
  color: white;
  left: 0;
}
.no {
  background: #888;
  color: white;
}

/* Message */
.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.response {
  font-size: 1.5rem;
  color: white;
  margin-top: 10px;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Cœurs tombants */
.heart {
  position: absolute;
  top: -50px;
  background: #ff2d55;
  transform: rotate(45deg);
  border-radius: 10%;
  animation: fall linear infinite;
}
.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ff2d55;
  border-radius: 50%;
}
.heart::before { top: -50%; left: 0; }
.heart::after { top: 0; left: -50%; }

@keyframes fall {
  0% { transform: translateY(-50px) rotate(45deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(45deg); opacity: 0; }
}
</style>
