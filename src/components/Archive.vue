<template>
  <div v-if="logedInToken" class="students-body">
    <div class="navigation-bar">
      <div class="navigation-top">
        <h1>Students Archive</h1>
        <div class="pages-buttons-container">
          <p @click="toHome">Home</p>
          <p @click="toStudents">Students</p>
          <p @click="toHelp">Help</p>
        </div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
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
                type="text"
                placeholder="Type to search"
              />
            </template>
            <template slot-scope="scope">
              <el-button @click="restoreStudent(scope.row.date)"
                >Restore</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

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
  name: "ArchiveView",
  data() {
    return {
      search: "",
      studentsData: [],
      archiveData: [],
      currentPage: 1,
      pageSize: 7,
      sortKey: "",
      sortOrder: "",
      formVisible: false,
      logedInToken: false,
    };
  },
  computed: {
    totalStudents() {
      if (!this.search) {
        return this.archiveData.length;
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
      if (!this.search) {
        return this.pagedData;
      } else {
        const searchLowerCase = this.search.toLowerCase();
        const filteredTable = this.archiveData.filter((student) => {
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
    toStudents() {
      this.$router.push("/students");
    },
    toHelp() {
      this.$router.push("/help");
    },
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      localStorage.setItem("logedIn", false);
      this.$router.push("/login");
    },
    handleSortChange({ prop, order }) {
      this.sortKey = prop;
      this.sortOrder = order;
      this.currentPage = 1;
    },
    restoreStudent(date) {
      const index = this.archiveData.findIndex(
        (student) => student.date === date
      );
      if (index !== -1) {
        const restoredStudent = this.archiveData[index];
        this.archiveData.splice(index, 1);
        localStorage.setItem("archive", JSON.stringify(this.archiveData));
        this.studentsData.push(restoredStudent);
        localStorage.setItem("students", JSON.stringify(this.studentsData));
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    sortTableData() {
      const sortedData = [...this.archiveData];
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
    refreshTableData() {
      const storedArchiveData = localStorage.getItem("archive");
      if (storedArchiveData) {
        this.archiveData = JSON.parse(storedArchiveData);
      }
      const storedStudentsData = localStorage.getItem("students");
      if (storedStudentsData) {
        this.studentsData = JSON.parse(storedStudentsData);
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

<style>
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
  box-shadow: 0px 2px 10px rgba(47, 79, 79, 0.5);
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
  padding-top: 50px;
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
