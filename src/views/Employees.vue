<template>
    <div>
        <h2>Empleados</h2>
        <EmployeeForm
            :employee="selectedEmployee"
            :areas="areas"
            :types="types"
            @submit="handleEmployeeSubmit"
        />
        
        <!-- Buscador por nombre -->
        <input 
            type="text" 
            v-model="currentSearchTerm"
            placeholder="Buscar por nombre..."
        />
    
        <button @click="performSearch">Buscar</button>
        <!-- Filtro por tipo de vehículo -->
        <select v-model="selectedType">
            <option value="">Todos los tipos</option>
            <option 
                v-for="type in types" 
                :key="type.id" 
                :value="type.id"
                >
                {{ type && type.name ? type.name : 'Desconocido' }}
            </option>
        </select>

        <table v-if="searchTerm || selectedType">
            <!-- Headers de la tabla -->
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Área</th>
                    <th>Tipo</th>
                    <th>Placa</th>
                    <th>Color</th>
                    <!-- ... otros headers que necesites ... -->
                </tr>
            </thead>
            <tbody>
                <!-- Iteración sobre los empleados -->
                <tr v-for="employee in filteredEmployees" :key="employee.id">
                    <td>{{ employee.name }}</td>
                    <td>{{ getAreaName(employee.areasId) }}</td>
                    <td>{{ getTypeName(employee.typesId) }}</td>
                    <td>{{ employee.placa }}</td>
                    <td>{{ employee.color }}</td>
                    <td>
                        <button @click="confirmDeletion(employee.id)">Eliminar</button>
                    </td>
                    <!-- ... otras columnas que necesites ... -->
                    <td>
                        <button @click="editEmployee(employee)">Editar</button> <!-- Mover el botón aquí -->
                    </td>
                </tr>
            </tbody>
        </table> 
    </div>
</template>

<script>
import EmployeeForm from '@/components/EmployeeForm.vue'
import employeeService from '@/services/employeeService.js'
import areaService from '@/services/areaService.js'
import typeService from '@/services/typeService.js'

export default {
    data() {
        return {
            employees: [],
            areas: [],
            types: [],
            selectedEmployee: {},
            searchTerm: '',
            selectedType: '',
            currentSearchTerm: ''
        }
    },
    components: {
        EmployeeForm
    },
    methods: {
        async handleEmployeeSubmit(employee) {
            if (employee.id) {
                await employeeService.updateEmployee(employee);
            } else {
                await employeeService.addEmployee(employee);
            }
            this.fetchEmployees();
        },
        async fetchEmployees() {
            this.employees = await employeeService.getEmployees();
        },
        getAreaName(areasId) {
            const area = this.areas.find(area => area.id === areasId);
            return area ? area.name : 'Desconocido';
        },
        getTypeName(typesId) {
            const type = this.types.find(type => type.id === typesId);
            return type ? type.name : 'Desconocido';
        },
        performSearch() {
        this.searchTerm = this.currentSearchTerm;
        },
        confirmDeletion(employeeId) {
        if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            this.deleteEmployee(employeeId);
        }
        },
        async deleteEmployee(employeeId) {
        try {
            await employeeService.deleteEmployee(employeeId);
            this.fetchEmployees();  // Refrescar la lista de empleados
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
            alert('Hubo un problema al eliminar el empleado. Por favor, intenta nuevamente.');
        }
        },
        editEmployee(employee) {
         this.selectedEmployee = {...employee};  // Aquí haces una copia del empleado para editarlo
        }
    },

    computed: {
        filteredEmployees() {
        return this.employees.filter(employee => {
        const matchesType = this.selectedType ? employee.typesId == this.selectedType : true;
        const matchesSearchTerm = this.searchTerm && employee.name 
            ? employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
            : !this.searchTerm; // Si no hay searchTerm, se muestra todos los empleados
        return matchesType && matchesSearchTerm;
            });
        }

    },
    async created() {
        this.areas = await areaService.getAreas();
        this.types = await typeService.getTypes();
        this.fetchEmployees();
    }
}
</script>

  


  
  <style scoped>
/* Aquí puedes agregar estilos específicos para esta vista. 
   El atributo 'scoped' asegura que estos estilos solo afecten a este componente. */

.add-button {
  background-color: #2e7d32; /* Verde oscuro */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #388e3c;
}
</style>