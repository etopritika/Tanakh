import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Noto Sans',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		colors: {
  			background: 'var(--background)',
  			brown: {
  				dark: 'var(--brown-dark)',
  				light: 'var(--brown-light)'
  			},
  			white: 'var(--white)',
  			black: 'var(--black)',
  			text: 'var(--text)',
  			muted: 'var(--muted)',
  			danger: 'var(--danger)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
