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
	<v-app v-if="mounted">
		full page template
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
