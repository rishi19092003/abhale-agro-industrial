import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const sections = [
  "Landing",
  "About",
  "Product Overview",
  ...Array.from({ length: 8 }, (_, i) => `Product ${i + 1}`),
  "Closing Logo",
  "Contact",
];

export default function ScrollSite() {
  const canvasRef = useRef(null);
  const logoControls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    document.body.style.margin = 0;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = Array.from({ length: 100 }, () => createParticle());
    let animationFrameId;

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight * 0.5;
      setHasScrolled(isScrolled);
      logoControls.start(i => ({
        opacity: isScrolled ? 0 : 1,
        x: isScrolled ? (Math.random() - 0.5) * 100 : 0,
        y: isScrolled ? (Math.random() - 0.5) * 100 : 0,
        rotate: isScrolled ? Math.random() * 360 : 0,
        transition: { delay: i * 0.03, duration: 0.6, ease: "easeOut" },
      }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoControls]);

  return (
    <div className="relative h-screen overflow-x-hidden snap-y snap-mandatory overflow-scroll bg-black text-white font-sans">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      ></canvas>
      {sections.map((section, index) => (
        <section
          key={section}
          className="relative h-screen w-full flex items-center justify-center p-10 snap-start border-b border-gray-800 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full flex items-center justify-center text-center px-4"
          >
            {section === "Landing" && (
              <div>
                <div className="flex justify-center items-center flex-col gap-4 mb-6">
                  <img src="/logo.jpeg" alt="Company Logo" className="w-24 h-24" />
                  <div className="flex flex-wrap justify-center">
                    {"Abhale Agro Industrial".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        animate={logoControls}
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 500 }}
                        className="text-5xl font-bold inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <p className="text-xl">Proprietors: Rishi Abhale & Suresh Abhale</p>
              </div>
            )}

            {section === "About" && (
              <div className="max-w-3xl">
                <h2 className="text-4xl font-semibold mb-4">About Abhale Agro Industrial</h2>
                <p className="mb-4">Founded in 2024 by Rishi Abhale and Suresh Abhale...</p>
              </div>
            )}

            {section === "Product Overview" && (
              <div className="text-center">
                <h2 className="text-4xl font-semibold mb-4">Our Products</h2>
                <p className="text-lg">Explore our range of premium pulses and flours</p>
              </div>
            )}

            {section.startsWith("Product") && !isNaN(parseInt(section.split(" ")[1])) && (
              <div className="text-center max-w-2xl">
                <h3 className="text-3xl font-bold mb-2">
                  {
                    [
                      "Chana (Whole Bengal Gram)",
                      "Chana Dal",
                      "Vatana (Whole Green/White Peas)",
                      "Vatana Dal",
                      "Maize (Corn)",
                      "Maize Grit",
                      "Chana Besan (Gram Flour)",
                      "Vatana Besan",
                    ][parseInt(section.split(" ")[1]) - 1]
                  }
                </h3>
                <p className="text-lg">
                  {
                    [
                      "High-quality whole chana, perfect for dals, flours...",
                      "Cleanly processed split chana, ideal for everyday cooking...",
                      "Dried whole vatana with uniform size...",
                      "Finely milled split vatana...",
                      "Clean, dried maize grains ideal for...",
                      "Coarsely ground corn particles ideal for...",
                      "Finely ground flour made from pure chana dal...",
                      "A unique flour derived from vatana dal...",
                    ][parseInt(section.split(" ")[1]) - 1]
                  }
                </p>
              </div>
            )}

            {section === "Closing Logo" && (
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Abhale Agro Industrial</h1>
              </div>
            )}

            {section === "Contact" && (
              <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-2">📞 8928853306 / 9167282159</p>
                <p className="mb-2">📧 abhaleagroindustrial@gmail.com</p>
                <p className="mb-2">📍 Survey No. 47/1, Kalyan Shil Road...</p>
                <a
                  className="underline text-blue-400 hover:text-blue-300"
                  href="https://maps.app.goo.gl/GXqrAuaTmBxfdozU8"
                  target="_blank"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
