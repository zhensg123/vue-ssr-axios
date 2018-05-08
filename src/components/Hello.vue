<template>
	<h1>{{id}}</h1>
</template>
<script>
	export default{
		name:'hello',
		data(){
			return{
				id:this.$route.params.id
			}
		}
	}
</script>
<style type="text/css">
	
	
</style>