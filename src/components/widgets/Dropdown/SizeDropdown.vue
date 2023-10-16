<template>
  <div class="unit-dropdown">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="localSelectedUnit" @change="updateLabel">
      <option :value="null" disabled>{{ defaultOption }}</option>
      <option
        v-for="(unitSize, unitIndex) in units"
        :key="unitIndex"
        :value="unitIndex"
      >
        {{ Object.keys(unitSize)[0] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    units: Object,
    selectedUnit: [String, Number],
    defaultOption: String,
  },
  data() {
    return {
      localSelectedUnit: this.selectedUnit,
    };
  },
  watch: {
    // Watch for changes in the selectedUnit prop and update localSelectedUnit
    selectedUnit(newSelectedUnit) {
      this.localSelectedUnit = newSelectedUnit;
    },
  },
  methods: {
    updateLabel() {
      this.$emit('update:selectedUnit', this.localSelectedUnit);
    },
  },
};
</script>
