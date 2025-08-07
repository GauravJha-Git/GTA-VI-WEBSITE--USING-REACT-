import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'Power4.easeInOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector('.svg')?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []);

  useGSAP(() => {
    if (!showContent) return;

    gsap.to('.main', {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: '-1',
      ease: 'Expo.easeInOut',
    });

    gsap.to('.sky', {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: '-.8',
      ease: 'Expo.easeInOut',
    });

    gsap.to('.bg', {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: '-.8',
      ease: 'Expo.easeInOut',
    });

    gsap.to('.character', {
      scale: 0.6,
      x: '-50%',
      bottom: '-100%',
      rotate: 0,
      duration: 2,
      delay: '-.8',
      ease: 'Expo.easeInOut',
    });

    gsap.to('.text', {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: '-.8',
      ease: 'Expo.easeInOut',
    });

    const main = document.querySelector('.main');

    main?.addEventListener('mousemove', function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to('.main .text', {
        x: `${xMove * 0.3}%`,
      });
      gsap.to('.sky', {
        x: xMove,
      });
      gsap.to('.bg', {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  useEffect(() => {
    // Hide scroll during animation
    document.body.style.overflow = showContent ? 'auto' : 'hidden';
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div
          className="main w-full overflow-hidden min-h-screen"
          style={{ transform: 'scale(1.7) rotate(-10deg)' }}
        >
          <div className="landing relative w-full min-h-screen bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-6 px-6 md:py-10 md:px-10">
              <div className="logo flex gap-4 md:gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-10 h-2 bg-white"></div>
                  <div className="line w-6 h-2 bg-white"></div>
                  <div className="line w-3 h-2 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Images and Text */}
            <div className="imagesdiv relative w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-10 md:top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[4rem] md:text-[8rem] lg:text-[12rem] leading-none -ml-10 md:-ml-20 lg:-ml-40">
                  grand
                </h1>
                <h1 className="text-[4rem] md:text-[8rem] lg:text-[12rem] leading-none ml-10 md:ml-20">
                  theft
                </h1>
                <h1 className="text-[4rem] md:text-[8rem] lg:text-[12rem] leading-none -ml-10 md:-ml-20 lg:-ml-40">
                  auto
                </h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[4] md:scale-[3] rotate-[-20deg]"
                src="./character.png"
                alt=""
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 px-6 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-2xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-base md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[30px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full min-h-screen flex items-center justify-center bg-black px-4">
            <div className="cntnr flex flex-col md:flex-row gap-10 text-white w-full max-w-screen-xl h-full md:h-[80%]">
              <div className="limg relative w-full md:w-1/2 h-[300px] md:h-full">
                <img
                  className="absolute scale-[1.2] md:scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/5"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full md:w-[50%] lg:w-[30%] py-10">
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Still Running,</h1>
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Not Hunting</h1>
                <p className="mt-6 text-base md:text-lg lg:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam...
                </p>
                <p className="mt-3 text-base md:text-lg lg:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
                <p className="mt-6 text-base md:text-lg lg:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
                <button className="bg-yellow-500 px-6 py-4 md:px-10 md:py-6 text-black mt-8 text-xl md:text-2xl lg:text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
