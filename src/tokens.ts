import { useState, useEffect } from 'react'

export const Colors = {
  seaBlue100:      '#002E6D',
  seaBlue80:       '#1A4B8D',
  skyBlue100:      '#009BDE',
  skyBlue80:       '#33AEE5',
  sunrayYellow100: '#FFC627',
  sunsetOrange100: '#EE7523',
  aquaGreen100:    '#54BBAB',
  white:           '#FFFFFF',
  bgWhite:         '#FFFFFF',
  bgSurface:       '#F8FAFC',
  textPrimary:     '#002E6D',
  textSecondary:   '#5F6C7B',
}

export const Type = {
  h1:      'clamp(1.5rem, 4.5vw, 3.2rem)',
  h2:      'clamp(1.4rem, 4.5vw, 3.2rem)',
  h3Card:  'clamp(1rem, 2.6vw, 1.7rem)',
  h3Col:   'clamp(0.95rem, 2.2vw, 1.3rem)',
  h3Small: 'clamp(0.9rem, 2vw, 1.2rem)',
  descBase: 'clamp(0.95rem, 2.4vw, 1.55rem)',
  descSm:   'clamp(0.9rem, 2.1vw, 1.3rem)',
  descCard: 'clamp(0.95rem, 2.2vw, 1.4rem)',
  heroSub:  'clamp(13px, 1.6vw, 19px)',
  statLg:  'clamp(2.8rem, 9vw, 6rem)',
  statMd:  'clamp(2rem, 6vw, 4.2rem)',
  overline: '0.72rem',
  label:    '0.75rem',
  statLbl:  '13px',
  button:   '14px',
}

export const DescriptionCSS = {
  base: {
    fontSize:      'clamp(0.95rem, 2.4vw, 1.55rem)',
    lineHeight:    1.65,
    letterSpacing: '0.01em',
    fontFamily:    '"Montserrat", sans-serif',
    textWrap:      'balance' as React.CSSProperties['textWrap'],
  },
  sm: {
    fontSize:      'clamp(0.9rem, 2.1vw, 1.3rem)',
    lineHeight:    1.6,
    letterSpacing: '0.01em',
    fontFamily:    '"Montserrat", sans-serif',
    textWrap:      'balance' as React.CSSProperties['textWrap'],
  },
}

export const Breakpoints = {
  mobile:  640,
  tablet:  1024,
  desktop: 1024,
}

export function useBreakpoint() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  return { isMobile: width < 640, isTablet: width < 1024, isDesktop: width >= 1024 }
}
