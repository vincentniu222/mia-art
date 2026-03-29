'use client';

import { motion } from 'framer-motion';

export function InkSplash() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main ink splash behind title */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="600" height="400" viewBox="0 0 600 400" className="w-[80vw] max-w-[600px] h-auto opacity-[0.04]">
          <motion.ellipse
            cx="300" cy="200" rx="250" ry="150"
            fill="none" stroke="#2C2C2C" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 2, ease: 'easeInOut' }}
          />
          {/* Ink splatter dots */}
          {[
            { cx: 120, cy: 80, r: 3, delay: 1.2 },
            { cx: 480, cy: 120, r: 2, delay: 1.4 },
            { cx: 150, cy: 300, r: 4, delay: 1.1 },
            { cx: 450, cy: 280, r: 2.5, delay: 1.5 },
            { cx: 80, cy: 180, r: 1.5, delay: 1.3 },
            { cx: 520, cy: 200, r: 3, delay: 1.6 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx} cy={dot.cy} r={dot.r}
              fill="#2C2C2C"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.4, 0.15] }}
              transition={{ delay: dot.delay, duration: 0.6 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Ink drip lines */}
      {[
        { left: '15%', height: '30%', delay: 1.8 },
        { left: '85%', height: '25%', delay: 2.2 },
        { left: '8%', height: '20%', delay: 2.5 },
        { left: '92%', height: '35%', delay: 2.0 },
      ].map((drip, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.06 }}
          transition={{ delay: drip.delay, duration: 1.5, ease: 'easeIn' }}
          className="absolute top-0 w-px bg-gradient-to-b from-ink to-transparent origin-top"
          style={{ left: drip.left, height: drip.height }}
        />
      ))}
    </div>
  );
}
