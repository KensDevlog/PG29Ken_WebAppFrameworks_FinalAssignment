<template>
    <section class="login-page">
        <div class="login-card">
            <template v-if="userStore.email">
                <h1>Welcome Back, {{ userStore.name }}! 👋</h1>
                <p class="subtitle">You are currently logged in as {{ userStore.email }}</p>
                <button class="logout-btn" @click="logout">Logout</button>
            </template>
            <template v-else>
                <h1>Welcome Back</h1>
                <p class="subtitle">Sign in to your account</p>
                <section class="login">
                    <input type="text" v-model="form.email" placeholder="Email" />
                    <input type="password" v-model="form.password" placeholder="Password" />
                    <button @click="login" :disabled="loading">
                        {{ loading ? 'Logging in...' : 'Login' }}
                    </button>
                    <div v-if="status === 'error'" class="banner error">❌ email not recognized, send an inquiry first!.</div>
                </section>
                <p class="register-prompt">
                    Don't have an account? <a href="/contact">Contact us to get started!</a>
                </p>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useUserStore } from '../stores/currentUser';

    const userStore = useUserStore();
    const form = ref({ email: '', password: '' });
    const status = ref<'idle' | 'success' | 'error'>('idle');
    const loading = ref(false);

    const login = async () => {
        status.value = 'idle';
        loading.value = true;
        try {
            const res = await fetch(`/api/contact/${form.value.email}/name`);
            if (!res.ok) {
                status.value = 'error';
                return;
            }
            const data = await res.json();
            userStore.setUser(form.value.email, data.name);
            status.value = 'success';
            form.value = { email: '', password: '' };
        } catch {
            status.value = 'error';
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        userStore.clearUser();
    };
</script>

<style scoped>
    .login-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f2f5;
    }

    .login-card {
        background: white;
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 380px;
        text-align: center;
    }

    h1 {
        margin-bottom: 0.25rem;
        font-size: 1.75rem;
    }

    .subtitle {
        color: #666;
        margin-bottom: 1.5rem;
    }

    .login {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .register-prompt {
        margin-top: 1.25rem;
        font-size: 0.9rem;
        color: #555;
    }

        .register-prompt a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: bold;
        }

            .register-prompt a:hover {
                text-decoration: underline;
            }

    .logout-btn {
        margin-top: 1.5rem;
        padding: 0.6rem 1.5rem;
        background-color: #e53e3e;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

        .logout-btn:hover {
            background-color: #c53030;
        }

    .banner {
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-weight: bold;
    }

    .error {
        background-color: #f8d7da;
        color: #721c24;
    }
</style>