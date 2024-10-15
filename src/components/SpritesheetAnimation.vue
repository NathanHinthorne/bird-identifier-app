<template>
  <div class="sprite-animator-container">
    <div 
      class="sprite-animator" 
      :style="{ 
        backgroundImage: `url(${spritesheetUrl})`,
        backgroundPosition: `${-currentFrame * frameWidth}px 0px`,
        backgroundSize: `${frameWidth * frameCount}px ${frameHeight}px`
      }"
    ></div>
  </div>
</template>

<script>
import spritesheetImage from '../assets/backgrounds/journal-spritesheet.png'

export default {
  name: 'SpriteAnimator',
  props: {
    frameWidth: {
      type: Number,
      required: true
    },
    frameHeight: {
      type: Number,
      required: true
    },
    frameCount: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 1000 // Duration in milliseconds
    },
    headerHeight: {
      type: String,
      default: '60px'
    },
    footerHeight: {
      type: String,
      default: '60px'
    }
  },
  data() {
    return {
      currentFrame: 0,
      intervalId: null,
      spritesheetUrl: spritesheetImage,
      containerAspectRatio: 1
    }
  },
  mounted() {
    this.startAnimation()
    this.setContainerStyle()
    window.addEventListener('resize', this.setContainerStyle)
  },
  beforeUnmount() {
    this.stopAnimation()
    window.removeEventListener('resize', this.setContainerStyle)
  },
  methods: {
    startAnimation() {
      const frameInterval = this.duration / this.frameCount
      this.intervalId = setInterval(() => {
        this.currentFrame = (this.currentFrame + 1) % this.frameCount
      }, frameInterval)
    },
    stopAnimation() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    },
    setContainerStyle() {
      const container = this.$el
      const availableHeight = window.innerHeight - parseInt(this.headerHeight) - parseInt(this.footerHeight)
      const availableWidth = window.innerWidth
      
      this.containerAspectRatio = this.frameWidth / this.frameHeight
      
      let containerWidth, containerHeight
      
      if (availableWidth / availableHeight > this.containerAspectRatio) {
        // Constrain by height
        containerHeight = availableHeight
        containerWidth = containerHeight * this.containerAspectRatio
      } else {
        // Constrain by width
        containerWidth = availableWidth
        containerHeight = containerWidth / this.containerAspectRatio
      }
      
      container.style.width = `${containerWidth}px`
      container.style.height = `${containerHeight}px`
      container.style.top = `${parseInt(this.headerHeight)}px`
      container.style.left = `${(availableWidth - containerWidth) / 2}px`
    }
  }
}
</script>

<style scoped>
.sprite-animator-container {
  position: fixed;
  overflow: hidden;
}

.sprite-animator {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
</style>