<template>
  <div class="min-h-screen bg-[#0b1220] flex items-center justify-center px-4">
    <div
      class="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-white"
    >
      <h2 class="text-2xl font-bold">Dashboard ✅</h2>
      <p class="text-white/70 mt-1">You are logged in successfully.</p>

      <div class="mt-6 flex items-center gap-4">
        <img
          :src="user?.image"
          alt="profile"
          class="w-16 h-16 rounded-full border border-white/20"
        />
        <div>
          <p class="font-semibold">
            {{ user?.firstName }} {{ user?.lastName }}
          </p>
          <p class="text-white/70 text-sm">{{ user?.email }}</p>
        </div>
      </div>

      <div class="mt-5 p-4 rounded-xl bg-black/30 border border-white/10">
        <!--  <p class="text-sm text-white/70">Token:</p>
        <p class="break-all text-sm mt-1">{{ token }}</p> -->
        <p class="break-all text-sm mt-1">
          Name:
          <span class="text-blue-400">
            {{ user?.firstName }} {{ user?.lastName }}</span
          >
        </p>
        <p class="break-all text-sm mt-1">
          Email: <span class="text-blue-400">{{ user?.email }}</span>
        </p>
        <p class="break-all text-sm mt-1">
          Username: <span class="text-blue-400">{{ user?.username }}</span>
        </p>
        <p class="break-all text-sm mt-1">
          Gender: <span class="text-blue-400">{{ user?.gender }}</span>
        </p>
      </div>

      <button
        @click="logout"
        class="mt-6 w-full py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref("");
const user = ref(null);

onMounted(() => {
  token.value = localStorage.getItem("token") || "";
  user.value = JSON.parse(localStorage.getItem("user") || "null");
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>
