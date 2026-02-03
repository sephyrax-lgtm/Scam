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
        @touchstart="moveNo" 
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
        <p class="response">Ps: Samy a pris ma play du coup je n'ai rien a faire bref je t'aime 💕</p>
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
      noLeft: 200,
      windowWidth: 0
    };
  },
  mounted() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    clickYes() {
      this.showLove = true;
      this.yesScale = 1.5;
      setTimeout(() => { this.yesScale = 1; }, 300);
    },
    clickNo() {
      this.yesScale += 0.2;
      this.showLove = true;
    },
    moveNo() {
      // Position responsive selon écran
      const width = Math.max(200, this.windowWidth - 120);
      const height = Math.max(300, window.innerHeight - 100);
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
/* Reset et base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Fond photo */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/IMG_3699.jpeg') center/cover no-repeat;
  filter: brightness(0.6);
  z-index: -1;
}

/* Container principal */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  text-align: center;
  font-family: 'Arial', sans-serif;
  position: relative;
}

/* Texte animé RESPONSIVE */
.title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  color: white;
  margin-bottom: clamp(20px, 5vw, 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.2;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(-20px);
  animation: floatIn 0.5s forwards;
}

@keyframes floatIn {
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Boutons container */
.buttons {
  position: relative;
  height: clamp(60px, 15vw, 80px);
  width: clamp(250px, 60vw, 400px);
  margin-bottom: 20px;
}

/* Boutons base */
.btn {
  padding: clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px);
  border-radius: 30px;
  border: none;
  font-size: clamp(1rem, 4vw, 1.3rem);
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  font-weight: bold;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation; /* Optimisation tactile */
}

.yes {
  background: linear-gradient(45deg, #ff2d55, #ff6b9d);
  color: white;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 8px 25px rgba(255, 45, 85, 0.4);
}

.no {
  background: linear-gradient(45deg, #888, #666);
  color: white;
  right: 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Effets hover/tap */
.btn:hover, .btn:active {
  transform: scale(1.05) !important;
}

/* Message */
.message-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 90vw;
}

.response {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  line-height: 1.4;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Cœurs tombants RESPONSIVE */
.heart {
  position: fixed;
  top: -50px;
  background: #ff2d55;
  transform: rotate(45deg);
  border-radius: 10%;
  animation: fall linear infinite;
  pointer-events: none;
  z-index: 10;
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

.heart::before { 
  top: -50%; 
  left: 0; 
}
.heart::after { 
  top: 0; 
  left: -50%; 
}

@keyframes fall {
  0% { 
    transform: translateY(-50px) rotate(45deg); 
    opacity: 1; 
  }
  100% { 
    transform: translateY(120vh) rotate(720deg); 
    opacity: 0; 
  }
}

/* Media queries pour optimisation mobile */
@media (max-width: 480px) {
  .container {
    padding: 15px;
  }
  
  .btn {
    min-height: 45px;
  }
  
  .no {
    position: static !important;
    margin-top: 15px;
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (hover: none) {
  /* Optimisations tactile */
  .btn:active {
    transform: scale(0.95);
  }
}
</style>
