import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'gray-bg': '#1e2027',
                'light-bg': '#f9fafa'
            },
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
                },
                'fade-in': {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                },
                'grow-in': {
                    '0%': {
                        transform: 'scale(0.5)'
                    },
                    '100%': {
                        transform: 'scale(1)'
                    }
                },
                'move-up-in': {
                    '0%': {
                        transform: 'translateY(1em)'
                    },
                    '100%': {
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                wiggle: 'wiggle 0.35s ease-in-out normal',
                'enlarge-shrink': 'enlarge-shrink 0.35s ease-out normal',
                'wiggle-enlarge': 'wiggle 0.35s ease-in-out normal, enlarge-shrink 0.25s ease-out normal',
                'fade-in': 'fade-in 0.25s ease-in-out normal forwards',
                'grow-fade-in':
                    'fade-in 0.25s ease-in-out normal forwards, grow-in 0.25s ease-in-out normal forwards',
                'move-up-fade-in':
                    'fade-in 0.25s ease-in-out normal forwards, move-up-in 0.25s ease-in-out normal forwards'
            }
        }
    },

    plugins: [
        typography,
        forms,
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'animate-delay': (value) => ({
                        animationDelay: value
                    })
                },
                { values: theme('transitionDelay') }
            );
        })
    ]
} satisfies Config;
