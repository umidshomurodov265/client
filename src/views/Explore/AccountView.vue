<script setup>
import { computed, reactive } from "vue";
import api from "@/helpers/api";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => {
  return store.state.loading;
});

// const account = reactive(JSON.parse(Cookies.get("account")));

// const updateAccount = async () => {
//   store.commit("setLoading", true, { root: true });
//   try {
//     const res = await api.put(`/accounts/${account._id}`, { account });

//     if (res.data.status === "ok") {
//       Cookies.remove("account");
//       Cookies.set("account", JSON.stringify(res.data.account));

//       store.commit("setLoading", false, { root: true });
//       store.commit(
//         "setToast",
//         { show: true, msg: res.data.msg, type: "success" },
//         { root: true }
//       );
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } else {
//       store.commit("setLoading", false, { root: true });
//       store.commit(
//         "setToast",
//         { show: true, msg: res.data.msg, type: "success" },
//         { root: true }
//       );
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 1000);
//     }
//   } catch (error) {
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: error.message, type: "error" },
//       { root: true }
//     );
//   }
// };

const logOut = () => {
  localStorage.removeItem("AccessToken");
  // Cookies.remove("account");
  window.location.reload();
};

// const deleteAccount = async () => {
//   store.commit("setLoading", true, { root: true });
//   try {
//     const res = await api.delete(`/accounts/${account._id}`);
//     Cookies.remove("account");
//     Cookies.remove("token");
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: res.data.msg, type: "success" },
//       { root: true }
//     );

//     setTimeout(() => {
//       window.location.reload();
//     }, 2000);
//   } catch (error) {
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: error.message, type: "error" },
//       { root: true }
//     );
//   }
// };
</script>

<template>
  <div class="account-page w-full flex justify-center items-start bg-white">
    <div class="account flex py-12 flex-col justify-center items-center w-full">
      <div class="account-img shadow-md">
        <img
          class="w-[200px] h-[100px] object-cover rounded"
          :src="`https://avatars.dicebear.com/api/initials/Account.svg`"
          alt=""
        />
      </div>
      <div>
        <div class="account-content space-y-6 col-12">
          <div class="mb-6">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Fullname</label
            >
            <input
              type="text"
              id=""
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ism familiyangizni kiriting..."
              required
            />
          </div>
          <div class="mb-6">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username
            </label>
            <input
              type="text"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username kiriting..."
              required
            />
          </div>
          <div class="mb-6">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Gender</label
            >
            <select
              id="resul"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
          </div>
          <div class="mb-6">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Age
            </label>
            <input
              type="text"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Yoshingizni kiriting..."
              required
            />
          </div>
          <div class="mb-6">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >City</label
            >
            <input
              type="text"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shahar kiriting..."
              required
            />
          </div>
        </div>
        <div
          class="account-buttons w-[600px] flex flex-row justify-start mt-6 items-center space-x-4"
        >
          <button
            @click="updateAccount()"
            :disabled="loading"
            class="save-btn transition bg-gre px-4 py-2 rounded bg-[#2cce7d] hover:bg-[#36d887] text-white disabled:bg-gray-50"
          >
            Update
          </button>

          <button
            @click="logOut"
            :disabled="loading"
            class="logout-btn transition hover:bg-gray-500 px-4 py-2 rounded bg-gray-600 text-white disabled:bg-gray-50"
          >
            Logout
          </button>

          <button
            @click="deleteAccount()"
            :disabled="loading"
            class="delete-btn transition hover:bg-red-400 px-4 py-2 rounded bg-red-500 text-white disabled:bg-gray-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-page {
  max-height: 50vh;
  box-sizing: border-box;
}
</style>
