import {
	getAuth,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	TwitterAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	signInWithPopup,
	onAuthStateChanged,
	UserCredential,
	OAuthCredential,
} from 'firebase/auth';
import type { Ref } from 'vue';

export const useAuth = () => {
	const token = useState<string>('token', () => null);

	const loginProgress: Ref<boolean> = useState<boolean>(
		'loginProgress',
		() => false
	);

	// stateの更新処理
	const switchProgess = (loginProgress: Ref<boolean>) => (value: boolean) => {
		console.log(
			'switchProgess---------------------------------------------------------------- '
		);
		loginProgress.value = value;
	};

	// twitterログイン(リダイレクト)を実行
	async function signInWithTwitterRedirect() {
		const auth = getAuth();
		const provider = new TwitterAuthProvider();
		return signInWithRedirect(auth, provider);
	}

	async function getRedirect() {
		console.log('get Redirect');
		useAuth().switchProgess(true);
		return await new Promise<OAuthCredential>((resolve, reject) => {
			const auth = getAuth();
			getRedirectResult(auth)
				.then((result) => {
					console.log('Twitter Redirec Login success');
					useAuth().switchProgess(false);

					if (result) {
						// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
						// You can use these server side with your app's credentials to access the Twitter API.
						const credential =
							TwitterAuthProvider.credentialFromResult(result);
						//const token = credential.accessToken;
						const secret = credential.secret;
						console.log(token);
						token.value = secret;
						const user = result.user;
						resolve(credential);
					}
					resolve(null);
				})
				.catch((error) => {
					console.log('Redirec error');
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					reject(error);
				});
		});
	}

	async function PopUpLogin() {
		const auth = getAuth();
		const provider = new TwitterAuthProvider();

		return await new Promise<OAuthCredential>((resolve, reject) => {
			signInWithPopup(auth, provider)
				.then((result) => {
					// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
					// You can use these server side with your app's credentials to access the Twitter API.
					const credential =
						TwitterAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					const secret = credential.secret;

					// The signed-in user info.
					const user = result.user;
					// ...
					resolve(credential);
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					const credential =
						TwitterAuthProvider.credentialFromError(error);
					// ...
					reject(error);
				});
		});
	}

	async function signOut() {
		return await new Promise<void>((resolve, reject) => {
			const auth = getAuth();
			firebaseSignOut(auth)
				.then(() => {
					token.value = null;
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	async function checkAuthState() {
		console.log('checkAuthState');
		const auth = getAuth();
		console.log(auth.currentUser);
		return await new Promise<void>((resolve, reject) => {
			// client only
			if (process.server) return resolve();

			onAuthStateChanged(
				auth,
				(user) => {
					if (user) {
						user.getIdToken()
							.then((idtoken) => {
								token.value = idtoken;
								resolve();
							})
							.catch(reject);
					} else {
						token.value = null;
						resolve();
					}
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	return {
		token,
		loginProgress,
		signInWithTwitterRedirect,
		PopUpLogin,
		signOut,
		getRedirect,
		switchProgess: switchProgess(loginProgress),
		checkAuthState,
	};
};
