<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
userStore.logout();
router.push('/')
</script>