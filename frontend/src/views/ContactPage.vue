<template>
    <div class="contact-page">
        <!--Widgets :^)-->
        <ContactWidget/>
        <YourInquiries/>
    </div>
</template>

<script setup lang="ts">
    import ContactWidget from "../components/ContactWidget.vue";
    import YourInquiries from "../components/YourInquiriesWidget.vue";

</script>

<style scoped>
    .contact-page {
        text-align: center;
        margin-top: 10px;
    }
</style>