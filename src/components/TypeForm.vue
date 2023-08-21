<template>
    <div>
      <h3 v-if="type.id">Editar Tipo de Vehículo</h3>
      <h3 v-else>Agregar Tipo de Vehículo</h3>
  
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <!-- Usar localType en lugar de type -->
          <input v-model="localType.name" required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
</template>
  
<script>
export default {
    props: {
        type: {
            type: Object,
            default: () => ({ id: null, name: '' })
        }
    },
    data() {
        return {
            localType: { ...this.type }
        };
    },
    watch: {
        type(newVal) {
            this.localType = { ...newVal };
        }
    },
    methods: {
      submitForm() {
        if (this.localType.name) {
            this.$emit('submit', { ...this.localType });
            this.resetLocalType();
        }
      },
      resetLocalType() {
        this.localType = { id: null, name: '' };
      }
    }
}
</script>





