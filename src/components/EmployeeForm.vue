<template>
    <div>
        <h3 v-if="localEmployee.id">Editar Empleado</h3>
        <h3 v-else>Agregar Empleado</h3>
  
        <form @submit.prevent="submitForm">
            <div>
                <label>Nombre:</label>
                <input v-model="localEmployee.name" required />
            </div>
            
            <div>
                <label>Área:</label>
                <select v-model="localEmployee.areasId" required>
                    <option v-for="area in areas" :key="area.id" :value="area.id">{{ area.name }}</option>
                </select>
            </div>
  
            <div>
                <label>Tipo de Vehículo:</label>
                <select v-model="localEmployee.typesId" required>
                    <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
            </div>
  
            <div>
                <label>Número de Placa:</label>
                <input v-model="localEmployee.placa" required />
            </div>
  
            <div>
                <label>Color del Vehículo:</label>
                <input v-model="localEmployee.color" required />
            </div>
  
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        employee: {
            type: Object,
            default: () => ({})
        },
        areas: {
            type: Array,
            default: () => []
        },
        types: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            localEmployee: {...this.employee}
        };
    },
    watch: {
        employee(newEmployee) {
            this.localEmployee = {...newEmployee};
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit', this.localEmployee);
        }
    }
}
</script>
