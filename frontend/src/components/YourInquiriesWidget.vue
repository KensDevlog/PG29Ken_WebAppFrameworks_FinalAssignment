<template>
    <section class="inquiries">
        <template v-if="userStore.email">
            <h2>Your Inquiries</h2>
            <div v-if="loading" class="status">Loading your inquiries...</div>
            <div v-else-if="error" class="banner error">❌ Failed to load inquiries.</div>
            <div v-else-if="inquiries.length === 0" class="status">You have no past inquiries.</div>
            <ul v-else class="inquiry-list">
                <li v-for="(item, index) in inquiries" :key="index" class="inquiry-item">
                    {{ item.inquiry }}
                </li>
            </ul>
        </template>
        <div v-else class="banner error">Your inquiries will be shown here when you login.</div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/currentUser';

const userStore = useUserStore();

const inquiries = ref<{ inquiry: string }[]>([]);
const loading = ref(false);
const error = ref(false);

onMounted(async () => {
    if (!userStore.email) return;
    loading.value = true;
    error.value = false;
    try {
        const res = await fetch(`/api/contact/${userStore.email}`);
        if (!res.ok) {
            error.value = true;
            return;
        }
        inquiries.value = await res.json();
    } catch {
        error.value = true;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
    .inquiries {
        max-width: 480px;
        margin: 2rem auto;
    }

    .inquiry-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .inquiry-item {
        background: #f9f9f9;
        border: 1px solid #e2e2e2;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        color: #333;
    }

    .status {
        color: #666;
        font-style: italic;
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