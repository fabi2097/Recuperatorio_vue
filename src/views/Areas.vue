    <template>
        <div>
        <h2>Áreas</h2>
        <AreaForm :area="selectedArea" @submit="handleAreaSubmit($event, ...arguments)" />


        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="area in areas" :key="area.id">
                <td>{{ area.name }}</td>
                <td>
                <button @click="editArea(area)">Editar</button>
                <button @click="confirmDeletion(area.id)">Eliminar</button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </template>

    <script>
    import AreaForm from '@/components/AreaForm.vue'
    import areaService from '@/services/areaService.js'

    export default {
        data() {
            return {
                areas: [],
                selectedArea: {}
            }
        },
        components: {
            AreaForm
        },
        methods: {
            async handleAreaSubmit(area) {
            console.log("Área recibida:", area);
            try {
                if (area.id) {
                await areaService.updateArea(area);
                } else {
                await areaService.addArea(area);
                }
                this.fetchAreas();
            } catch (error) {
                console.error("Error al procesar el área:", error);
                
            }
            },
            async fetchAreas() {
                this.areas = await areaService.getAreas();
            },
            editArea(area) {
                this.selectedArea = {...area};
            },
            confirmDeletion(areaId) {
                if (window.confirm('¿Estás seguro de que deseas eliminar esta área?')) {
                    this.deleteArea(areaId);
                }
            },
            async deleteArea(areaId) {
                try {
                    await areaService.deleteArea(areaId);
                    this.fetchAreas();
                } catch (error) {
                    console.error("Error al eliminar el área:", error);
                    alert('Hubo un problema al eliminar el área. Por favor, intenta nuevamente.');
                }
            }
        },
        created() {
            this.fetchAreas();
        }
    }
    </script>
