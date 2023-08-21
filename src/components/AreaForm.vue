<template>
    <div>
      <h3 v-if="localArea.id">Editar Área</h3>
      <h3 v-else>Agregar Área</h3>
  
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <input v-model="localArea.name" required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
</template>

<script>
export default {
    props: {
        area: {
            type: Object,
            default: () => ({ id: null, name: '' })
        }
    },
    data() {
        return {
            localArea: { ...this.area }
        }
    },
    watch: {
        area(newVal) {
            this.localArea = { ...newVal };
        }
    },
    methods: {

        submitForm() {
            console.log("Área a enviar:", this.localArea);  // Agrega esto
            if (this.localArea.name) {
                console.log("Datos del formulario:", this.localArea);
                this.$emit('submit', this.localArea);

                this.resetLocalArea();
            }
        },
        resetLocalArea() {
            this.localArea = { id: null, name: '' };
        }
    }
}
</script>
