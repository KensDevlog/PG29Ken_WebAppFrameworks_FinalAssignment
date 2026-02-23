import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const email = ref<string | null>(null);
    const name = ref<string | null>(null);

    function setUser(userEmail: string, userName: string) {
        email.value = userEmail;
        name.value = userName;
    }

    function clearUser() {
        email.value = null;
        name.value = null;
    }

    return { email, name, setUser, clearUser };
});