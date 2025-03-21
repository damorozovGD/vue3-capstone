<template>
  <div class="pagination">
    <span>Page {{ currentPage }} of {{ numberOfPages }}</span>
    <span class="changePageBtnContainer">
      <button
        @click="updatePage(-1)"
        :disabled="isFirstPage"
        :class="{ 'btn-disabled': isFirstPage }"
      >
        &lt;&lt; Prev
      </button>
      <button @click="updatePage(1)" :disabled="isLastPage" :class="{ 'btn-disabled': isLastPage }">
        Next &gt;&gt;
      </button>
    </span>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';

  const props = defineProps({
    numberOfPages: {
      type: Number,
      required: false,
    },
  });

  const store = useStore();

  const currentPage = ref(1);

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === props.numberOfPages);

  const updatePage = (num) => {
    currentPage.value += num;
    store.dispatch('updatePage', currentPage.value);
  };
</script>

<style scoped>
  .pagination {
    display: flex;
    justify-content: end;
    padding: 0 50px;
    gap: 30px;
  }

  .changePageBtnContainer {
    display: flex;
    gap: 15px;

    & > a {
      text-decoration: none;
      color: black;
    }
  }

  .btn-disabled {
    color: gray;
  }
</style>
