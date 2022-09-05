<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue';

// Vuetify初期化後に読み込み
const mounted = ref(false);
const drawer = ref(true);
onBeforeMount(() => {
	console.log('template on before mount');
});

onMounted(() => {
	console.log('template on mount');
	mounted.value = true;
});

onBeforeUpdate(() => {
	console.log('template on before update');
});

onUpdated(() => {
	console.log('template on update');
});
</script>

<template>
	<v-app v-if="mounted"
		>main template
		<v-navigation-drawer app v-model="drawer" permanent temporary>
			This is side menu
			<!-- -->
		</v-navigation-drawer>
		<v-app-bar app elevation="1">
			<v-app-bar-nav-icon ref="navIcon"></v-app-bar-nav-icon>
			<v-app-bar-title>v-main-app-bar-title</v-app-bar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<div class="mx-4">
				<v-avatar size="36px">
					<img
						src="https://cdn.vuetifyjs.com/images/john.jpg"
						alt="Avatar"
						width="36"
						height="36"
					/>
				</v-avatar>
			</div>
		</v-app-bar>
		<!-- Sizes your content based upon application components -->
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<!-- If using vue-router -->
				<router-view></router-view>
				<!-- If using custom layout -->
				<slot />
			</v-container>
		</v-main>
	</v-app>
</template>
