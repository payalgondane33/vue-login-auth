<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 bg-[#0b1220] relative overflow-hidden"
  >
    <div
      class="absolute w-[450px] h-[450px] bg-blue-600/40 blur-[120px] rounded-full -top-20 -left-20"
    ></div>
    <div
      class="absolute w-[450px] h-[450px] bg-pink-500/40 blur-[120px] rounded-full -bottom-20 -right-20"
    ></div>

    <div
      class="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-white z-10"
    >
      <h2 class="text-2xl font-bold">Welcome Back 👋</h2>
      <p class="text-white/70 mt-1">Login to your account</p>

      <div
        v-if="error"
        class="mt-5 p-3 rounded-xl border border-red-400/20 bg-red-500/10 text-red-200 text-sm"
      >
        {{ error }}
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="text-sm text-white/80">Username</label>
          <input
            v-model.trim="form.username"
            type="text"
            placeholder="emilys"
            required
            class="mt-2 w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/30 focus:ring-4 focus:ring-white/10"
          />
        </div>

        <div>
          <label class="text-sm text-white/80">Password</label>
          <div class="relative mt-2">
            <input
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="emilyspass"
              required
              class="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/30 focus:ring-4 focus:ring-white/10 pr-20"
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-xs bg-white/10 hover:bg-white/20 transition"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-500 to-pink-500 hover:opacity-90 transition disabled:opacity-60"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <div class="text-xs text-white/60 text-center">
          ✅ Username: <span class="text-white">emilys</span> <br />
          ✅ Password: <span class="text-white">emilyspass</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loginApi } from "../services/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  username: "emilys",
  password: "emilyspass",
});

const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  try {
    // ✅ login API call
    const data = await loginApi({
      username: form.username,
      password: form.password,
    });

    // ✅ store token + user
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));

    // ✅ redirect to dashboard
    router.push("/dashboard");
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    error.value =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
