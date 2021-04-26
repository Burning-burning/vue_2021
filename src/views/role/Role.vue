<template>
  <div>
    <div class="search">
      <el-button size="mini" type="primary" @click="addRole"
        >添加角色</el-button
      >
    </div>
    <el-table border="" :data="roleTableData" style="width: 99%" size="mini">
      <el-table-column prop="roleId" label="角色编号"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :title="isAdd ? '添加角色' : '修改角色'"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :model="roleForm"
        status-icon
        :rules="roleFormRules"
        ref="roleFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{
            isAdd ? '添加' : '修改'
          }}</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    const validateRoleName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'))
      } else {
        callback()
      }
    }
    return {
      roleTableData: [],
      drawer: false,
      roleForm: {
        roleName: ''
      },
      roleFormRules: {
        roleName: [{ validator: validateRoleName, trigger: 'blur' }]
      },
      isAdd: true
    }
  },
  methods: {
    async handleEdit(row) {
      const roleId = row.roleId
      const res = await this.$get('/Role/GetOne', { roleId })
      console.log(res)
      this.roleForm = res
      this.drawer = true
      this.isAdd = false
    },
    async handleDelete(row) {
      const roleId = row.roleId
      const confirmResult = await this.$confirm('确定删除？', '提示').catch(
        err => err
      )
      if (confirmResult === 'confirm') {
        const res = await this.$post('/Role/Delete', { roleId })
        const { message, success } = res
        if (success) {
          this.$msg_s(message)
          this.getRoleList()
        } else {
          this.$msg_e(message)
        }
      } else {
        this.$message.info('已取消')
      }
    },
    async getRoleList() {
      const res = await this.$get('/Role/List')
      this.roleTableData = res
    },
    addRole() {
      this.drawer = true
    },
    async handleClose(done) {
      const confirmResult = await this.$confirm('确认关闭?', '提示').catch(
        err => err
      )
      if (confirmResult === 'confirm') {
        this.$refs.roleFormRef.resetFields()
        this.isAdd = true
        this.drawer = false
      } else {
        this.$message.info('已取消')
      }
    },
    submitForm() {
      this.$refs.roleFormRef.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            const res = await this.$post('/Role/Add', this.roleForm)
            if (res.success) {
              this.$message.success(res.message)
              this.getRoleList()
              this.drawer = false
              this.$refs.roleFormRef.resetFields()
            } else {
              this.$message.error(res.message)
            }
          } else {
            const res = await this.$post('/Role/Update', this.roleForm)
            if (res.success) {
              this.$message.success(res.message)
              this.getRoleList()
              this.drawer = false
              this.isAdd = true
              this.$refs.roleFormRef.resetFields()
            } else {
              this.$message.error(res.message)
            }
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.roleFormRef.resetFields()
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 10px;
}
</style>
