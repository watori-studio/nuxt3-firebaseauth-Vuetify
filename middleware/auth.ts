export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log('auth middle ware callded');

	if (!process.server) {
		const { checkAuthState, getRedirect, token } = useAuth();
		await checkAuthState();

		if (!token.value) {
			const config = useRuntimeConfig();
			// リダイレクト結果を受け取る
			await getRedirect().then((redirect) => {
				console.log(redirect);
			});
			// ログインページの無限遷移を防止
			if (to.name !== 'index') {
				return navigateTo('/');
			}
		} else {
			// ログイン後のページから直接開こうとした場合
			if (to.name === 'index' && from.name === 'index') {
				console.log('navigate to secret');
				return navigateTo('/secret');
			}
		}
	}
});
