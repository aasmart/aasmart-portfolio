import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': {
						rotate: '-3deg'
					},
					'50%': {
						rotate: '3deg'
					}
				},
				'enlarge-shrink': {
					from: {
						scale: '1.1'
					},
					to: {
						scale: '1'
					}
				}
			},
			animation: {
				'wiggle': 'wiggle 0.35s ease-in-out normal',
				'enlarge-shrink': 'enlarge-shrink 0.35s ease-out normal',
				'wiggle-enlarge': 'wiggle 0.35s ease-in-out normal, enlarge-shrink 0.25s ease-out normal'
			}
		}
	},

	plugins: [typography, forms]
} satisfies Config;
