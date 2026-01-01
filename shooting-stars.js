// High-Quality Shooting Stars and Stars Background Implementation
// Converted from React components to vanilla JavaScript

class StarsBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.starDensity = 0.00015;
    this.allStarsTwinkle = true;
    this.twinkleProbability = 0.7;
    this.minTwinkleSpeed = 0.5;
    this.maxTwinkleSpeed = 1;
    this.animationFrameId = null;
    
    this.init();
  }

  init() {
    console.log('Initializing canvas-based stars background...');
    this.updateCanvasSize();
    this.generateStars();
    this.render();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.updateCanvasSize();
      this.generateStars();
    });
  }

  updateCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  generateStars() {
    const area = this.canvas.width * this.canvas.height;
    const numStars = Math.floor(area * this.starDensity);
    
    this.stars = Array.from({ length: numStars }, () => {
      const shouldTwinkle = this.allStarsTwinkle || Math.random() < this.twinkleProbability;
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 0.05 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? this.minTwinkleSpeed + Math.random() * (this.maxTwinkleSpeed - this.minTwinkleSpeed)
          : null,
      };
    });
    
    console.log(`Generated ${numStars} stars`);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach((star) => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.fill();

      if (star.twinkleSpeed !== null) {
        star.opacity = 0.5 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
      }
    });

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

class ShootingStars {
  constructor(svg) {
    this.svg = svg;
    this.star = null;
    this.minSpeed = 10;
    this.maxSpeed = 30;
    this.minDelay = 1200;
    this.maxDelay = 4200;
    this.starColor = '#9E00FF';
    this.trailColor = '#2EB9DF';
    this.starWidth = 10;
    this.starHeight = 1;
    this.animationFrameId = null;
    
    this.init();
  }

  init() {
    console.log('Initializing SVG-based shooting stars...');
    
    // Create gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'shooting-star-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', `stop-color: ${this.trailColor}; stop-opacity: 0`);
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', `stop-color: ${this.starColor}; stop-opacity: 1`);
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    this.svg.appendChild(defs);
    
    this.createStar();
    this.animate();
  }

  getRandomStartPoint() {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  }

  createStar() {
    const { x, y, angle } = this.getRandomStartPoint();
    this.star = {
      id: Date.now(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed,
      distance: 0,
      element: null,
    };

    // Create SVG rect element
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('fill', 'url(#shooting-star-gradient)');
    this.star.element = rect;
    this.svg.appendChild(rect);

    const randomDelay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
    setTimeout(() => this.createStar(), randomDelay);
  }

  animate() {
    if (this.star && this.star.element) {
      const newX = this.star.x + this.star.speed * Math.cos((this.star.angle * Math.PI) / 180);
      const newY = this.star.y + this.star.speed * Math.sin((this.star.angle * Math.PI) / 180);
      const newDistance = this.star.distance + this.star.speed;
      const newScale = 1 + newDistance / 100;

      if (
        newX < -20 ||
        newX > window.innerWidth + 20 ||
        newY < -20 ||
        newY > window.innerHeight + 20
      ) {
        if (this.star.element && this.star.element.parentNode) {
          this.star.element.parentNode.removeChild(this.star.element);
        }
        this.star = null;
      } else {
        this.star.x = newX;
        this.star.y = newY;
        this.star.distance = newDistance;
        this.star.scale = newScale;

        const width = this.starWidth * this.star.scale;
        const centerX = this.star.x + width / 2;
        const centerY = this.star.y + this.starHeight / 2;

        this.star.element.setAttribute('x', this.star.x.toString());
        this.star.element.setAttribute('y', this.star.y.toString());
        this.star.element.setAttribute('width', width.toString());
        this.star.element.setAttribute('height', this.starHeight.toString());
        this.star.element.setAttribute('transform', `rotate(${this.star.angle}, ${centerX}, ${centerY})`);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Initialize when DOM is ready
function initStarsBackground() {
  console.log('Starting high-quality stars background initialization...');
  
  // Create container for stars
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  
  // Create canvas for stars background
  const canvas = document.createElement('canvas');
  canvas.className = 'stars-background-canvas';
  starsContainer.appendChild(canvas);
  
  // Create SVG for shooting stars
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'shooting-stars-svg');
  starsContainer.appendChild(svg);
  
  // Insert at the beginning of body
  document.body.insertBefore(starsContainer, document.body.firstChild);
  console.log('Stars container added to DOM');
  
  // Initialize both effects
  new StarsBackground(canvas);
  new ShootingStars(svg);
  
  console.log('High-quality stars background fully initialized!');
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStarsBackground);
} else {
  initStarsBackground();
}

