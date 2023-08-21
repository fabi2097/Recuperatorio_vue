<template>
    <div>
        <h2>Tipos de Vehículos</h2>
        <TypeForm :type="selectedType" @submit="handleTypeSubmit" />
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="type in types" :key="type.id">
                    <td>{{ type.name }}</td>
                    <td>
                        <button @click="editType(type)">Editar</button>
                        <button @click="confirmDeletion(type.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import TypeForm from '@/components/TypeForm.vue'
import typeService from '@/services/typeService.js'

export default {
    data() {
        return {
            types: [],
            selectedType: {}
        }
    },
    components: {
        TypeForm
    },
    methods: {
            async handleTypeSubmit(type) {
            if (!type.name) return;  // No enviar si no hay nombre

            if (type.id) {
                await typeService.updateType(type);
            } else {
                await typeService.addType(type);
            }
            this.selectedType = { id: null, name: '' };
            this.fetchTypes();
        },
            async fetchTypes() {
            this.types = await typeService.getTypes();
        },
        editType(type) {
            this.selectedType = { ...type };
        },
        confirmDeletion(typeId) {
            if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de vehículo?')) {
                this.deleteType(typeId);
            }
        },
        async deleteType(typeId) {
            try {
                await typeService.deleteType(typeId);
                this.fetchTypes();
            } catch (error) {
                console.error("Error al eliminar el tipo de vehículo:", error);
                alert('Hubo un problema al eliminar el tipo de vehículo. Por favor, intenta nuevamente.');
            }
        }
    },
    created() {
        this.fetchTypes();
    }
}
</script>
