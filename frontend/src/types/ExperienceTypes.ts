export type State = {
	currentProfile: ProfileType,
	likeHistory: Array<ProfileType>,
};

export type ProfileType = {
	imgUri: string,
	thumbUri: string,
	name: string,
	id: number,
}

export type AuthContextProps = {
	token: string | null,
	loader: boolean,
	// handleLogin: (email: string, password: string) => Promise<void>,
	handleLogout: () => void,
	initLoginOrLogout: (endpoint: string) => void,
}
