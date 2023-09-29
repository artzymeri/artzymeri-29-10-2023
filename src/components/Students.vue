<template>
  <div v-if="logedInToken" class="students-body">
    <div class="navigation-bar">
      <div class="navigation-top">
        <h1>Students Management</h1>
        <div class="pages-buttons-container">
          <p @click="toHome">Home</p>
          <p @click="toArchive">Archive</p>
          <p @click="toHelp">Help</p>
        </div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="navigation-bottom">
        <el-button
          class="add-student-button"
          type="primary"
          @click="showFormDialog"
          >Add Student</el-button
        >
      </div>
    </div>
    <el-dialog
      title="Add Student"
      :visible.sync="formVisible"
      width="30%"
      @close="resetForm"
    >
      <el-form :model="newStudent" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="newStudent.name"></el-input>
        </el-form-item>
        <el-form-item label="Location">
          <el-input v-model="newStudent.location"></el-input>
        </el-form-item>
        <el-form-item label="Birthdate">
          <el-input type="date" v-model="newStudent.birthdate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addStudent">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="students-container">
      <div class="block">
        <el-table
          :data="filteredData"
          style="width: 100%"
          :default-sort="{ prop: sortKey, order: sortOrder }"
          @sort-change="handleSortChange"
          :empty-text="'No Students'"
        >
          <el-table-column prop="date" label="Index" width="200">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="180"
            sortable
          ></el-table-column>
          <el-table-column
            prop="location"
            label="Location"
            width="180"
            sortable
          ></el-table-column>
          <el-table-column
            prop="birthdate"
            label="Birthdate"
            width="180"
            sortable
          ></el-table-column>
          <el-table-column label="Actions" width="200" align="right">
            <template slot="header">
              <input
                style="
                  padding: 5px;
                  border-color: darkslategrey;
                  border-width: 1px;
                  border-radius: 5px;
                  color: darkslategrey;
                "
                v-model="search"
                size="mini"
                type="text"
                placeholder="Type to search"
              />
            </template>
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)">Edit</el-button>
              <el-button @click="deleteStudent(scope.row.date)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="Edit Student"
        :visible.sync="editFormVisible"
        width="30%"
        @close="resetEditForm"
      >
        <el-form :model="editStudent" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="editStudent.name"></el-input>
          </el-form-item>
          <el-form-item label="Location">
            <el-input v-model="editStudent.location"></el-input>
          </el-form-item>
          <el-form-item label="Birthdate">
            <el-input type="date" v-model="editStudent.birthdate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveEditedStudent"
              >Save</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-pagination
        small
        layout="prev, pager, next"
        :total="totalStudents"
        v-model="currentPage"
        :page-size="pageSize"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
  <div
    @click="toLogin"
    v-else
    style="
      padding: 20px;
      background-color: darkslategrey;
      color: whitesmoke;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 15px;
      cursor: pointer;
    "
  >
    Please Log in to View
  </div>
</template>

<script>
export default {
  name: "StudentsView",
  data() {
    return {
      search: "",
      newStudent: {
        name: "",
        location: "",
        birthdate: "",
        date: "",
      },
      tableData: [],
      archiveData: [],
      currentPage: 1,
      pageSize: 7,
      sortKey: "",
      sortOrder: "",
      filteredTableNumberReference: [],
      formVisible: false,
      editStudent: {
        name: "",
        location: "",
        birthdate: "",
      },
      editFormVisible: false,
    };
  },

  computed: {
    totalStudents() {
      if (!this.search) {
        return this.tableData.length;
      } else {
        return this.filteredData.length;
      }
    },

    pagedData() {
      const sortedData = this.sortTableData();
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return sortedData.slice(startIndex, endIndex);
    },

    filteredData() {
      if (this.search === "") {
        return this.pagedData;
      } else {
        const searchLowerCase = this.search.toLowerCase();
        const filteredTable = this.tableData.filter((student) => {
          return (
            student.name.toLowerCase().includes(searchLowerCase) ||
            student.location.toLowerCase().includes(searchLowerCase) ||
            student.birthdate.toLowerCase().includes(searchLowerCase) ||
            student.date.includes(searchLowerCase)
          );
        });

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        return filteredTable.slice(startIndex, endIndex);
      }
    },
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toArchive() {
      this.$router.push("/archive");
    },
    toHelp() {
      this.$router.push("/help");
    },
    toLogin() {
      this.$router.push("/login");
    },
    showFormDialog() {
      this.formVisible = true;
    },
    logout() {
      localStorage.setItem("logedIn", false);
      this.$router.push("/login");
    },
    addStudent() {
      this.newStudent.date = Date.now().toString();
      this.tableData.push({ ...this.newStudent });
      localStorage.setItem("students", JSON.stringify(this.tableData));
      this.resetForm();
      this.refreshTableData();
    },
    handleEdit(student) {
      this.editStudent = { ...student };
      this.editFormVisible = true;
    },
    saveEditedStudent() {
      const index = this.tableData.findIndex(
        (student) => student.date === this.editStudent.date
      );
      if (index !== -1) {
        this.tableData[index] = { ...this.editStudent };
        localStorage.setItem("students", JSON.stringify(this.tableData));
        this.editFormVisible = false;
        this.editStudent = {
          name: "",
          location: "",
          birthdate: "",
        };
        this.tableData = JSON.parse(localStorage.getItem("students"));
      }
    },
    resetEditForm() {
      this.editStudent = {
        name: "",
        location: "",
        birthdate: "",
      };
      this.editFormVisible = false;
    },
    resetForm() {
      this.newStudent = {
        name: "",
        location: "",
        birthdate: "",
        date: "",
      };
      this.formVisible = false;
    },
    deleteStudent(date) {
      const index = this.tableData.findIndex(
        (student) => student.date === date
      );
      if (index !== -1) {
        const deletedStudent = this.tableData[index];
        this.tableData.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(this.tableData));
        this.archiveData.push(deletedStudent);
        localStorage.setItem("archive", JSON.stringify(this.archiveData));
      }
    },

    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    sortTableData() {
      const sortedData = [...this.tableData];
      if (this.sortKey && this.sortOrder) {
        sortedData.sort((a, b) => {
          const aValue = a[this.sortKey];
          const bValue = b[this.sortKey];
          if (this.sortOrder === "ascending") {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });
      }
      return sortedData;
    },
    handleSortChange({ prop, order }) {
      this.sortKey = prop;
      this.sortOrder = order;
    },
    refreshTableData() {
      const storedData = localStorage.getItem("students");
      if (storedData) {
        this.tableData = JSON.parse(storedData);
      }
      const storedArchiveData = localStorage.getItem("archive");
      if (storedArchiveData) {
        this.archiveData = JSON.parse(storedArchiveData);
      }
    },
  },
  created() {
    this.refreshTableData();
    const loggedIn = localStorage.getItem("logedIn");
    this.logedInToken = JSON.parse(loggedIn);
    console.log(this.logedInToken);
  },
};
</script>

<style scoped>
.students-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: whitesmoke;
}

.navigation-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.navigation-top,
.navigation-bottom {
  width: 100%;
  height: 70px;
  border-style: solid;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 1px;
  border-color: darkslategrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  position: relative;
}

.navigation-top h1 {
  color: darkslategrey;
  font-size: 20px;
}

.navigation-top div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.navigation-top div button {
  background: transparent;
  color: darkslategrey;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: darkslategrey;
  padding: 4px;
  width: 100%;
}

.pages-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row !important;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pages-buttons-container p {
  padding: 5px 20px;
  border-style: solid;
  border-radius: 10px;
  border-color: darkslategrey;
  color: darkslategrey;
  border-width: 1px;
  cursor: pointer;
}
.pages-buttons-container p:hover {
  background-color: darkslategrey;
  color: whitesmoke;
}

.el-button {
  background-color: transparent;
  border-color: darkslategrey;
  border-width: 1px;
  border-style: solid;
  color: darkslategrey;
}

.el-button:hover {
  background-color: darkslategrey;
  color: whitesmoke;
}

.students-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-pagination {
  display: block;
}

.el-table__row {
  height: 10px;
}

.add-student-button {
  width: 100%;
}

.logout-button {
  cursor: pointer;
  padding: 10px;
  transition: 0.2s ease-in-out;
  border-radius: 5px;
  border-width: 1px;
}

.logout-button:hover {
  background-color: darkslategrey;
  color: whitesmoke;
  border-radius: 5px;
}
</style>
