<template>
  <div class="grid grid-cols-2 items-center space-x-4 px-2">
    <div class="w-full h-screen text-center rounded">
      <img
        class="w-100%"
        src="https://img.freepik.com/free-vector/placeholder-concept-illustration_114360-4847.jpg?w=740&t=st=1686456000~exp=1686456600~hmac=707de0c358ad21300ee2a56322909edecb0ec85f40eb2bb005d5d07be448733c"
        alt=""
      />
    </div>
    <div class="bg-white w-[650px] text-center rounded p-20">
      <h1 class="landing-title font-bold text-[#2cce7d] text-3xl">
        Welcome to the quiz!
      </h1>
      <p class="landing-desc mt-4 opacity-70"></p>
      <div class="landing-links mt-8 space-x-4">
        <router-link
          to="/register"
          class="button bg-[#2cce7d] transition border border-[#36d887] text-white rounded p-2 px-4 hover:bg-[#36d887] hover:border-[#36d887] disabled:bg-gray-200 disabled:cursor-default disabled:border-none"
          >Ro'yxatdan o'tish</router-link
        >
        <router-link
          to="/login"
          class="bg-white border transition rounded p-2 px-4 hover:bg-gray-100"
          >Kirish</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style></style>
