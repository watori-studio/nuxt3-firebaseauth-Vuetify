export default defineNuxtRouteMiddleware(async (to, from) => {
	if (!process.server) {
		const { checkAuthState, getRedirect, token } = useAuth();

		// 特定ページのみログイン状態を初期化後にレンダリングする
		if (to.name !== 'index') {
			await checkAuthState();
		} else {
			// リダイレクトから遷移した場合は値設定済み
			const redirectFlg = sessionStorage.getItem('redirect');
			// リダイレクト結果を受け取る
			if (redirectFlg) {
				// 先にトップページを描画し、ローディング状態を表示する。
				checkAuthState();
				getRedirect().then((redirect) => {
					sessionStorage.removeItem('redirect');
				});
			} else {
				await checkAuthState();
			}
		}
		if (!token.value) {
			const config = useRuntimeConfig();
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
