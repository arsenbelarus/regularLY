export interface SignUpWithEmailPayload {
	email: string;
	password: string;
	displayName: string;
	photoURL?: string;
}

export interface SignInWithEmailPayload {
	email: string;
	password: string;
}
