<template>
    <section class="contact">
        <h2>Contact Us!</h2>
        <input type="text" v-model="form.name" placeholder="Name" />
        <input type="text" v-model="form.email" placeholder="Email" />
        <textarea v-model="form.inquiry" placeholder="Your inquiry..." />
        <button @click="submit" :disabled="loading">
            {{ loading ? 'Sending...' : 'Submit!' }}
        </button>
        <div v-if="status === 'success'" class="banner success">✅ Successfully sent!</div>
        <div v-else-if="status === 'error'" class="banner error">❌ Error sending. Please try again.</div>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const form = ref({ name: '', email: '', inquiry: '' });
    const status = ref<'idle' | 'success' | 'error'>('idle');
    const loading = ref(false);

    const submit = async () => {
        status.value = 'idle';
        loading.value = true;
        try {
            const res = await fetch("/api/contact", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value)
            });
            if (!res.ok) {
                status.value = 'error';
                return;
            }
            status.value = 'success';
            form.value = { name: '', email: '', inquiry: '' };
        } catch {
            status.value = 'error';
        } finally {
            loading.value = false;
        }
    };
</script>

<style scoped>
    .banner {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-weight: bold;
    }

    .success {
        background-color: #d4edda;
        color: #155724;
    }

    .error {
        background-color: #f8d7da;
        color: #721c24;
    }
</style>