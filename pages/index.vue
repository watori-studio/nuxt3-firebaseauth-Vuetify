<script setup>
import {
	ref,
	onBeforeMount,
	watch,
	onMounted,
	onBeforeUpdate,
	onUpdated,
} from 'vue';

definePageMeta({
	layout: false,
	middleware: ['auth'],
});

// Vuetify初期化後に読み込み
const mounted = ref(false);
const drawer = ref(true);
const dispLoading = ref(false);
dispLoading.value = useAuth().loginProgress.value;

// #region function

const loginRedirect = async () => {
	alert('リダイレクトログインします');
	sessionStorage.setItem('redirect', true);
	await navigateTo('/secret');
	useAuth()
		.signInWithTwitterRedirect()
		.then((result) => {
			console.log(result);
		});
};

const loginPopUp = async () => {
	alert('ポップアップログインします');
	dispLoading.value = true;
	useAuth()
		.PopUpLogin()
		.then((result) => {
			console.log(result);
			if (result) {
				navigateTo('/secret');
			}
		});
};

const navigateToSecretPage = async () => {
	navigateTo('/secret');
};

watch(useAuth().loginProgress, () => {
	if (useAuth().token) {
		navigateTo('/secret');
	}
});

// #endregion
onBeforeMount(() => {
	console.log('index page  on before mount');
});

onMounted(() => {
	console.log('index page on mount');
	mounted.value = true;
});

onBeforeUpdate(() => {
	console.log('index page on before update');
});

onUpdated(() => {
	console.log('index page on update');
});
</script>
<template>
	<div>
		<NuxtLayout name="full">
			<div v-if="mounted">
				<div v-if="dispLoading">
					<v-overlay
						:model-value="useAuth().token"
						class="align-center justify-center"
					>
						<v-progress-circular
							indeterminate
							size="64"
							color="primary"
							>ログイン中です</v-progress-circular
						>
					</v-overlay>
				</div>
				<div v-else>
					<div>
						<v-row>
							<v-col>
								リダイレクトログイン
								<v-btn
									style="
										text-transform: none;
										font-weight: bold;
									"
									color="info"
									to="/"
									class="mr-4"
									block
									submit
									@click="loginRedirect()"
								>
									<v-icon size="large">mdi-twitter</v-icon
									>Continu with Twitter</v-btn
								></v-col
							></v-row
						>
						<v-row>
							<v-col>
								ポップアップログイン
								<v-btn
									style="
										text-transform: none;
										font-weight: bold;
									"
									color="info"
									to="/"
									class="mr-4"
									block
									submit
									@click="loginPopUp()"
								>
									<v-icon size="large">mdi-twitter</v-icon
									>Continu with Twitter</v-btn
								></v-col
							></v-row
						>
						<v-row
							><v-col
								><a
									href="http://localhost:3000/secret"
									target="_blank"
									>ユーザー専用ページを開きます(ログインページにリダイレクトされます)</a
								></v-col
							>
						</v-row>
						<v-row
							><v-col
								><v-btn
									style="
										text-transform: none;
										font-weight: bold;
									"
									to="/"
									class="mr-4"
									block
									@click="navigateToSecretPage()"
									>navigateTo('/secret')
								</v-btn></v-col
							>
						</v-row>
					</div>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
