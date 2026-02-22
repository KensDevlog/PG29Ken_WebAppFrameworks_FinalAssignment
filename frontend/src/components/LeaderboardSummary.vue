<template>
    <div class="leaderboard-summary">
        <h2>Leaderboard</h2>

        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item,index) in leaderboardData" :key="index">
                    <td>{{ item.player }}</td>
                    <td>{{ item.score }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="errorMessage" class="error"> {{ errorMessage }} </p>

        <button @click="fetchLeaderboardData">Get Leaderboard</button>

    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";

    type LeaderboardItem = {
        player: string;
        score: number;
    }

    const leaderboardData = ref<LeaderboardItem[]>([]);
    const errorMessage = ref("");

    const fetchLeaderboardData = async () => {
        try {
            const response = await fetch("/api/leaderboard-summary");

            if (!response.ok) throw new Error(`Server error ${response.status}`);

            const jsonData = (await response.json()) as LeaderboardItem[];
            leaderboardData.value = jsonData;
        }
        catch (error: any) {
            errorMessage.value = error.message ?? "Unknown";
        }
    }

    onMounted(() => {
        fetchLeaderboardData();
    })

</script>

<style scoped>
    .leaderboard-summary {
        text-align: center;
        margin-top: 10px;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }

    th, td {
        border: 1px, solid, #ccc;
    }

    .error {
        color: rebeccapurple;
    }
    button {
        margin-top: 10px;
    }
</style>