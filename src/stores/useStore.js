import {
	create
} from 'zustand'
import {
	subscribeWithSelector
} from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
	return {
		language: 'fr',
		setLanguage: (lang) => set({
			language: lang
		}),

		isLoaded: false,
		setIsLoaded: (loaded) => set({
			isLoaded: loaded
		}),
		showApp3D: false,
		setShowApp3D: (value) => set({
			showApp3D: value
		}),

		cameraPositionPreset: "Base",
		setCameraPositionPreset: (preset) => set({
			cameraPositionPreset: preset
		}),

		isPlaying: false,
		setIsPlaying: (preset) => set({
			isPlaying: preset
		}),

		isLightOff: false,
		lightIntensity: 75000,
		lightColor: '#ffffff',
		setLightIntensity: (intensity) => set({
			lightIntensity: intensity
		}),
		setLightColor: (color) => set({
			lightColor: color
		}),
		toggleLight: () => set((state) => ({
			isLightOff: !state.isLightOff
		})),


		animationTvLeft: false,
		setAnimationTvLeft: (preset) => set({
			animationTvLeft: preset
		}),

		animationTvRight: false,
		setAnimationTvRight: (preset) => set({
			animationTvRight: preset
		}),

	}
}))