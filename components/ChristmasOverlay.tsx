import React, { useEffect, useRef, useState } from 'react';

interface ChristmasOverlayProps {
  enabled: boolean;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swayPhase: number;
  swaySpeed: number;
  opacity: number;
  isCrystal: boolean;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface SleighPass {
  id: number;
  direction: 'ltr' | 'rtl';
  topOffset: number;
}

const SNOW_COLORS = [
  'rgba(255, 255, 255, 0.95)',
  'rgba(224, 242, 254, 0.92)', // ice sky
  'rgba(186, 230, 253, 0.85)', // crisp frost blue
  'rgba(203, 213, 225, 0.78)', // soft slate frost for white card contrast
];

const ChristmasOverlay: React.FC<ChristmasOverlayProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sleighPass, setSleighPass] = useState<SleighPass | null>(null);
  const passCountRef = useRef(0);

  // Canvas falling snow animation
  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvas();

    const flakeCount = width < 640 ? 42 : width < 1024 ? 62 : 84;
    const createFlake = (startAtTop = false): Snowflake => {
      const isCrystal = Math.random() < 0.22;
      return {
        x: Math.random() * width,
        y: startAtTop ? -12 - Math.random() * 40 : Math.random() * height,
        radius: isCrystal ? 4.2 + Math.random() * 3.2 : 1.8 + Math.random() * 2.8,
        speedY: 0.65 + Math.random() * 1.25,
        speedX: (Math.random() - 0.5) * 0.45,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.012 + Math.random() * 0.02,
        opacity: 0.55 + Math.random() * 0.4,
        isCrystal,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.018,
        color: SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)],
      };
    };

    const flakes: Snowflake[] = Array.from({ length: flakeCount }, () => createFlake(false));

    const drawCrystal = (flake: Snowflake) => {
      ctx.save();
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);
      ctx.globalAlpha = flake.opacity;
      ctx.strokeStyle = flake.color;
      ctx.lineWidth = 1.15;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
      ctx.shadowBlur = 3;

      const r = flake.radius;
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.moveTo(0, -r * 0.55);
        ctx.lineTo(-r * 0.28, -r * 0.78);
        ctx.moveTo(0, -r * 0.55);
        ctx.lineTo(r * 0.28, -r * 0.78);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawDotFlake = (flake: Snowflake) => {
      ctx.save();
      ctx.globalAlpha = flake.opacity;
      ctx.fillStyle = flake.color;
      ctx.shadowColor = 'rgba(15, 23, 42, 0.14)';
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        if (!prefersReducedMotion) {
          f.swayPhase += f.swaySpeed;
          f.y += f.speedY;
          f.x += f.speedX + Math.sin(f.swayPhase) * 0.45;
          f.rotation += f.rotationSpeed;

          if (f.y > height + 16) {
            flakes[i] = createFlake(true);
            continue;
          }
          if (f.x > width + 16) f.x = -16;
          if (f.x < -16) f.x = width + 16;
        }

        if (f.isCrystal) {
          drawCrystal(f);
        } else {
          drawDotFlake(f);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [enabled]);

  // Periodic Santa & Reindeer sleigh flyby
  useEffect(() => {
    if (!enabled) {
      setSleighPass(null);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let clearPassTimeout: number | undefined;
    let intervalId: number | undefined;

    const triggerPass = () => {
      passCountRef.current += 1;
      const isOdd = passCountRef.current % 2 === 1;
      const topOffsets = [68, 96, 82, 112];
      const topOffset = topOffsets[(passCountRef.current - 1) % topOffsets.length];

      setSleighPass({
        id: passCountRef.current,
        direction: isOdd ? 'ltr' : 'rtl',
        topOffset,
      });

      if (clearPassTimeout) window.clearTimeout(clearPassTimeout);
      clearPassTimeout = window.setTimeout(() => {
        setSleighPass(null);
      }, 11800);
    };

    // Initial pass soon after enabling so users immediately enjoy Santa & reindeer
    const initialTimeout = window.setTimeout(() => {
      triggerPass();
      intervalId = window.setInterval(triggerPass, 26000);
    }, 2200);

    return () => {
      window.clearTimeout(initialTimeout);
      if (intervalId) window.clearInterval(intervalId);
      if (clearPassTimeout) window.clearTimeout(clearPassTimeout);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle frost shimmer along top edge */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#B91C1C]/70 via-[#15803D]/70 to-[#D97706]/70" />

      {/* Falling Snow Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Periodic Santa & Reindeer Sleigh */}
      {sleighPass && (
        <div
          key={sleighPass.id}
          style={{ top: `${sleighPass.topOffset}px` }}
          className={`absolute left-0 ${
            sleighPass.direction === 'ltr' ? 'animate-sleigh-ltr' : 'animate-sleigh-rtl'
          }`}
        >
          <svg
            width="360"
            height="96"
            viewBox="0 0 380 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[240px] sm:w-[310px] md:w-[360px] h-auto drop-shadow-[0_6px_12px_rgba(15,23,42,0.18)]"
          >
            {/* Magic Sparkle Trail */}
            <g className="animate-sparkle-1">
              <path
                d="M14 54 L16 49 L18 54 L23 56 L18 58 L16 63 L14 58 L9 56 Z"
                fill="#F59E0B"
              />
              <circle cx="32" cy="64" r="2.2" fill="#FBBF24" />
              <circle cx="6" cy="62" r="1.6" fill="#FDE68A" />
            </g>
            <g className="animate-sparkle-2">
              <path
                d="M35 42 L36.5 38.5 L38 42 L41.5 43.5 L38 45 L36.5 48.5 L35 45 L31.5 43.5 Z"
                fill="#FBBF24"
              />
              <circle cx="24" cy="44" r="1.8" fill="#F59E0B" />
              <circle cx="44" cy="68" r="1.5" fill="#FCD34D" />
            </g>

            {/* Sleigh + Gifts + Santa */}
            <g>
              {/* Gold Sleigh Runners */}
              <path
                d="M52 76 C68 78, 128 78, 146 76 C155 75, 160 67, 155 61 C152 57, 147 59, 149 63"
                stroke="#D97706"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M72 68 L68 76 M124 68 L128 76" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" />

              {/* Gift Sack & Presents in Rear of Sleigh */}
              <ellipse cx="75" cy="48" rx="16" ry="14" fill="#15803D" />
              <rect x="60" y="39" width="13" height="13" rx="2" fill="#DC2626" />
              <path d="M66.5 39 V52 M60 45.5 H73" stroke="#FBBF24" strokeWidth="2" />
              <rect x="74" y="34" width="12" height="12" rx="2" fill="#F59E0B" />
              <path d="M80 34 V46 M74 40 H86" stroke="#FFFFFF" strokeWidth="1.8" />

              {/* Santa Claus */}
              <g>
                {/* Torso */}
                <path d="M96 58 C96 42, 122 42, 122 58 Z" fill="#DC2626" />
                {/* Black Belt & Gold Buckle */}
                <rect x="97" y="53" width="24" height="3.5" rx="1" fill="#111827" />
                <rect x="108" y="52.5" width="5" height="4.5" rx="0.8" stroke="#FBBF24" strokeWidth="1.2" fill="none" />
                {/* Waving Arm */}
                <path
                  d="M117 48 C124 44, 130 37, 132 32"
                  stroke="#DC2626"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <circle cx="133" cy="31" r="3" fill="#FFFFFF" />
                {/* Head */}
                <circle cx="110" cy="34" r="7.5" fill="#FDBA74" />
                {/* Rosy Cheek & Eye */}
                <circle cx="113" cy="33" r="1" fill="#1F2937" />
                <circle cx="112" cy="35.5" r="1.4" fill="#FB7185" opacity="0.6" />
                {/* White Beard */}
                <path
                  d="M103 35 C103 44, 118 44, 118 35 C115 37, 106 37, 103 35 Z"
                  fill="#FFFFFF"
                />
                {/* Santa Hat */}
                <path d="M102 30 C104 20, 114 19, 118 28 Z" fill="#DC2626" />
                <path d="M103 25 C97 23, 95 27, 94 29" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                <circle cx="93.5" cy="30" r="2.8" fill="#FFFFFF" />
                <rect x="101.5" y="28" width="16.5" height="3.8" rx="1.9" fill="#FFFFFF" />
              </g>

              {/* Sleigh Body (Crimson with Gold Trim) */}
              <path
                d="M54 50 C54 64, 65 70, 84 70 H130 C141 70, 148 61, 146 51 C140 51, 133 56, 123 56 H94 C83 56, 70 46, 54 50 Z"
                fill="#B91C1C"
              />
              <path
                d="M54 50 C70 46, 83 56, 94 56 H123 C133 56, 140 51, 146 51"
                stroke="#FBBF24"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Golden Reins connecting Sleigh to Reindeer */}
            <path
              d="M144 54 C172 58, 198 48, 224 44 C252 46, 276 46, 296 42 C318 44, 336 42, 349 38"
              stroke="#F59E0B"
              strokeWidth="1.4"
              strokeDasharray="3 1"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M144 57 C190 61, 248 53, 349 40"
              stroke="#D97706"
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
            />

            {/* Reindeer 3 (Rear) */}
            <g className="animate-reindeer-gallop" style={{ transformOrigin: '205px 52px' }}>
              <ReindeerFigure x={182} y={30} isLead={false} />
            </g>

            {/* Reindeer 2 (Middle) */}
            <g
              className="animate-reindeer-gallop"
              style={{ transformOrigin: '265px 48px', animationDelay: '0.18s' }}
            >
              <ReindeerFigure x={242} y={26} isLead={false} />
            </g>

            {/* Reindeer 1 (Rudolph Lead) */}
            <g
              className="animate-reindeer-gallop"
              style={{ transformOrigin: '325px 44px', animationDelay: '0.35s' }}
            >
              <ReindeerFigure x={302} y={22} isLead={true} />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

const ReindeerFigure: React.FC<{ x: number; y: number; isLead: boolean }> = ({ x, y, isLead }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Tail */}
    <path d="M5 24 L0 21" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
    {/* Back Legs */}
    <path d="M9 30 L2 40 M13 30 L9 42" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
    {/* Front Legs (Galloping stride) */}
    <path d="M30 29 L39 36 M26 30 L32 40" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="19" cy="26" rx="13" ry="6.5" fill="#92400E" />
    {/* Belly highlight */}
    <ellipse cx="19" cy="28" rx="9" ry="3.2" fill="#B45309" opacity="0.65" />
    {/* Neck & Head */}
    <path d="M27 24 L35 12 L42 14 L40 19 L32 27 Z" fill="#92400E" />
    {/* Muzzle */}
    <ellipse cx="43" cy="15.5" rx="4.2" ry="3" fill="#78350F" />
    {/* Ear */}
    <ellipse cx="34" cy="11" rx="2.5" ry="1.3" transform="rotate(-25 34 11)" fill="#78350F" />
    {/* Antlers */}
    <path
      d="M35 11 L33 2 M33 6 L29 4 M33 5 L36 3 M37 11 L39 3 M38 6 L42 5"
      stroke="#D97706"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Festive Collar & Gold Bell */}
    <path d="M28 21 L34 25" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="34.5" cy="25.5" r="1.8" fill="#FBBF24" />
    {/* Eye */}
    <circle cx="38" cy="14" r="0.9" fill="#111827" />
    {/* Nose (Rudolph glowing red nose on lead reindeer) */}
    {isLead ? (
      <>
        <circle cx="47.5" cy="15.2" r="5" fill="#EF4444" opacity="0.32" />
        <circle cx="47.2" cy="15.2" r="2.4" fill="#EF4444" />
      </>
    ) : (
      <circle cx="47" cy="15.2" r="1.4" fill="#1F2937" />
    )}
  </g>
);

export default ChristmasOverlay;
