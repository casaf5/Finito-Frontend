<template>
  <div class="form-input-container">
    <label v-if="showLabel">{{ labelText }}</label>
    <input
      class="form-input"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  props: {
    showLabel: {
      type: Boolean,
    },
    labelText: {
      type: String,
    },
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input-container {
  label {
    text-transform: capitalize;
    margin-top: 10px;
    font-size: 14px;
  }
  .form-input {
    margin-bottom: 5px;
    margin-top: 5px;
    width: 100%;
    padding: 5px;
    outline: none;
    border: 1px solid #3498db;
  }
}
</style>
