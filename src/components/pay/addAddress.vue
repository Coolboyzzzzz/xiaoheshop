<template>
  <el-dialog
    title="添加收货地址"
    :visible.sync="dialogVisible"
    width="550px"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form
      ref="Form"
      label-position="right"
      label-width="120px"
      :model="formLabelAlign"
      size="small"
      :rules="rules"
    >
      <el-form-item prop="username"  label="收货人姓名:">
        <el-input placeholder="长度不超过25个字符" v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item prop="phone" required label="收货人手机号:">
        <el-input placeholder="请填写大陆手机号码" v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item required label="地址信息:">
        <VDistpicker
          province="广东省"
          city="广州市"
          area="海珠区"
          @selected="onSelected"
          class="address"
        />
      </el-form-item>
      <el-form-item prop="address" required label="详细地址:">
        <el-input
          type="textarea"
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
          v-model="formLabelAlign.address"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="quit">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import VDistpicker from "v-distpicker";
import { addAddress } from "@/api/user.js";
export default {
  props: ["dialogVisible"],
  components: {
    VDistpicker
  },
  data() {
    return {
      formLabelAlign: {
        username: "",
        phone: "",
        address: "",
        province: "",
        city: "",
        area: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入收货人手机号", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "请输入收货人详细地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs["Form"].validate(async valid => {
        if (valid) {
          const res = await addAddress(this.formLabelAlign);
          if (res.data.code == 200) {
            this.$message(res.data.message);
            this.$store.dispatch('m_address/initaddress')
            this.$emit("closehandler");
          } else {
            this.$message(res.data.message);
          }
        }
      });
    },
      quit(){
      this.$emit("closehandler");
  },
  onSelected(data){
    console.log(data)
this.formLabelAlign.province =  data.province.value
this.formLabelAlign.city =  data.city.value
this.formLabelAlign.area =  data.area.value

  }
  },

};
</script>

<style lang="less" scoped>
.address {
  display: inline;
  /deep/select {
    max-width: 112px;
    padding: 5px;
    height: inherit;
    font-size: inherit;
    background-color: rgb(249, 249, 249);
  }
}
</style>
