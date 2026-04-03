/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00288e',
        primary_container: '#1e40af',
        primary_fixed: '#dde1ff',
        primary_fixed_dim: '#b8c4ff',
        on_primary: '#ffffff',
        on_primary_container: '#a8b8ff',
        on_primary_fixed: '#001453',
        on_primary_fixed_variant: '#173bab',

        secondary: '#505f76',
        secondary_container: '#d0e1fb',
        secondary_fixed: '#d3e4fe',
        secondary_fixed_dim: '#b7c8e1',
        on_secondary: '#ffffff',
        on_secondary_container: '#54647a',
        on_secondary_fixed: '#0b1c30',
        on_secondary_fixed_variant: '#38485d',

        tertiary: '#611e00',
        tertiary_container: '#872d00',
        tertiary_fixed: '#ffdbce',
        tertiary_fixed_dim: '#ffb59a',
        on_tertiary: '#ffffff',
        on_tertiary_container: '#ffa583',
        on_tertiary_fixed: '#380d00',
        on_tertiary_fixed_variant: '#802a00',

        error: '#ba1a1a',
        error_container: '#ffdad6',
        on_error: '#ffffff',
        on_error_container: '#93000a',

        surface: '#f7f9fb',
        surface_dim: '#d8dadc',
        surface_bright: '#f7f9fb',
        surface_variant: '#e0e3e5',
        surface_tint: '#3755c3',
        surface_container_lowest: '#ffffff',
        surface_container_low: '#f2f4f6',
        surface_container: '#eceef0',
        surface_container_high: '#e6e8ea',
        surface_container_highest: '#e0e3e5',

        on_surface: '#191c1e',
        on_surface_variant: '#444653',
        inverse_surface: '#2d3133',
        inverse_on_surface: '#eff1f3',
        inverse_primary: '#b8c4ff',

        outline: '#757684',
        outline_variant: '#c4c5d5',

        background: '#f7f9fb',
        on_background: '#191c1e',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0 8px 40px 0 rgba(25,28,30,0.06)',
        'ambient-lg': '0 16px 40px 0 rgba(25,28,30,0.08)',
      },
    },
  },
  plugins: [],
}

