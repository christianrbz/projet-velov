class Slider {
    constructor () {
        this.keyboard = true;
        this.pauseButton = document.getElementById('pause');
        this.nextButton = document.getElementById('next');
        this.prevButton = document.getElementById('prev');
        this.slides = document.querySelectorAll('.slide');
        this.slideInterval = null;
        this.playing = true;
        this.slideActif = 0;
        this.play();
        this.navListener();
    }



    play() {
      this.pauseButton.textContent = '||';
      this.playing = true;
      this.slideInterval = setInterval(this.nextSlide, 5000);
      /*premier lancement de la timeline rouge*/
      this.slides[this.slideActif].classList.add('run-animation');
    }

    stop() {
      /*le contenu du bouton pause change des qu'on appuie sur le bouton*/
      this.pauseButton.textContent = '►';
      this.playing = false;
      clearInterval(this.slideInterval);
      this.slides[this.slideActif].classList.remove('run-animation');
    }




    nextSlide = () => this.goToSlide(this.slideActif+1)

    prevSlide = () => this.goToSlide(this.slideActif-1)


    goToSlide(i) {
      this.slides[this.slideActif].classList.remove('actif');
      /*on supprime la timeline des qu'on change de slide */
      this.slides[this.slideActif].classList.remove('run-animation');
      this.slideActif = (i + this.slides.length)  % this.slides.length;
      this.slides[this.slideActif].classList.add('actif');
      /*on rajoute la timeline au nouveau slide actif*/
      this.slides[this.slideActif].classList.add('run-animation');
    }

    navListener() {
        this.pauseButton.addEventListener('click', e => { 
         this.playing ? this.stop() : this.play() });

        /*demander le slide suivant ou precedent*/
        this.nextButton.addEventListener('click', e => {
          this.pauseButton.textContent = '||';
          this.nextSlide();
        });
        this.prevButton.addEventListener('click', e => {
          this.pauseButton.textContent = '||';
          this.prevSlide();
        });

        /*gerer avec les fleches du clavier les slides suivants et precedents*/
        window.addEventListener("keyup",(e) => {
            if (e.keyCode === 39) {
              this.pauseButton.textContent = '||';
              this.nextSlide();
            }
            if (e.keyCode === 37) {
              this.pauseButton.textContent = '||';
              this.prevSlide();
            }
        })
    }  /*fin de navListener*/
}

