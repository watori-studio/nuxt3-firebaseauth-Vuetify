<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue';

definePageMeta({
	layout: false,
	middleware: ['auth'],
});
// Vuetify初期化後に読み込み
const mounted = ref(false);
const drawer = ref(true);

const logOut = () => {
	alert('ログアウトします');
	useAuth().signOut();
	navigateTo('/');
};
onBeforeMount(() => {
	console.log('secret page  on before mount');
});

onMounted(() => {
	console.log('secret page on mount');
	mounted.value = true;
});

onBeforeUpdate(() => {
	console.log('secret page on before update');
});

onUpdated(() => {
	console.log('secret page on update');
});
</script>
<template>
	<div>
		<NuxtLayout v-if="mounted" name="main">
			このページは認証済みユーザのみが閲覧できます。
			<div>
				<v-row>
					<v-col>
						<v-btn
							style="text-transform: none; font-weight: bold"
							color="info"
							to="/"
							class="mr-4"
							block
							submit
							@click="logOut()"
						>
							<v-icon size="large">mdi-twitter</v-icon>Log
							out</v-btn
						></v-col
					></v-row
				>
			</div>
		</NuxtLayout>
	</div>
</template>
