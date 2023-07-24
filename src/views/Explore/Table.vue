<script>
import ReadXlsxFile from "read-excel-file";
import ExportFromJSON from "export-from-json";
export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    readExcel() {
      this.$store.commit("setLoading", true, { root: true });
      const input = document.getElementById("uploade");
      ReadXlsxFile(input.files[0]).then((rows) => {
        this.$store.commit("setLoading", false, { root: true });
        this.$store.commit(
          "setToast",
          { show: true, msg: "Ma'lumotlar import qilindi !", type: "success" },
          { root: true }
        );
        this.items = rows;
      });
    },

    exportXlsxFile() {
      this.$store.commit("setLoading", true, { root: true });
      if (this.items.length > 0) {
        const data = this.items;
        const fileName = "download";
        const exportType = ExportFromJSON.types.xls;
        ExportFromJSON({ data, fileName, exportType });
        this.$store.commit("setLoading", false, { root: true });
        this.$store.commit(
          "setToast",
          { show: true, msg: "Ma'lumotlar yuklanmoqda !", type: "success" },
          { root: true }
        );
      } else {
        this.$store.commit(
          "setToast",
          {
            show: true,
            msg: "Jadval bo'sh.Iltimos fayl yuklang !",
            type: "error",
          },
          { root: true }
        );
      }
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        const margin = data.map((item) =>
          Number(parseInt(((item[3] - item[2]) * 100) / item[2]))
        );
        const cur_sum = data.map((item) => Number(parseInt(item[5])));
        const sold_sum = data.map((item) =>
          Number(parseInt(item[3] + item[2]))
        );
        const profit_sum = data.map((item) =>
          Number(parseInt(item[3] - item[2]))
        );
        if (!margin.every((value) => isNaN(value))) {
          sums[7] = margin.reduce((prev, curr) => {
            const total = prev + curr;
            return total;
          }, 0);
          sums[8] = cur_sum.reduce((prev, curr) => {
            const total = prev + curr;
            return total;
          }, 0);
          sums[9] = sold_sum.reduce((prev, curr) => {
            const total = prev + curr;
            return total;
          }, 0);
          sums[10] = profit_sum.reduce((prev, curr) => {
            const total = prev + curr;
            return total;
          }, 0);
        } else {
          sums[index + 2] = "N/A";
        }
      });

      return sums;
    },
  },
};
</script>

<template>
  <div>
    <h4
      class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
    >
      TABLE
    </h4>
    <div class="flex justify-between mb-4">
      <div>
        <input
          @change="readExcel()"
          class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="uploade"
          type="file"
        />
      </div>
      <el-button @click="exportXlsxFile" style="width: 15%" type="success"
        >Export To Excel</el-button
      >
    </div>
    <div class="shadow-md rounded min-h-[15px] bg-white">
      <div class="inline-grid">
        <el-table
          :data="items"
          border
          min-height="100"
          max-height="400"
          :summary-method="getSummaries"
          show-summary
          style="width: 100%"
          class="w-full"
          header-align="center"
          empty-text="Ma'lumot import qilinmagan !  ..."
          :default-sort="[
            { prop: 'product_name', order: 'descending' },
            { prop: 'code', order: 'descending' },

            { prop: 'inc_price', order: 'descending' },

            { prop: 'price', order: 'descending' },
            { prop: 'cur_qty', order: 'descending' },
            { prop: 'sold_qty', order: 'descending' },
            { prop: 'cur_sum', order: 'descending' },
            { prop: 'margin', order: 'descending' },

            { prop: 'sold_sum', order: 'descending' },
            { prop: 'profit_sum', order: 'descending' },
          ]"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="T/p"
            width="80"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="product_name"
            label="Product Name"
            width="200"
          >
            <template #default="scope">
              {{ scope.row[0] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            sortable
            prop="code"
            label="Bar Code "
            width="250"
          >
            <template #default="scope">
              {{ scope.row[1] }}
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            sortable
            prop="inc_price"
            label="Incomming Price"
            width="200"
            ><template #default="scope">
              {{ scope.row[2] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="price"
            label="Price"
            width="200"
            ><template #default="scope">
              {{ scope.row[3] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="cur_qty"
            label="Current qty"
            width="200"
            ><template #default="scope">
              {{ scope.row[4] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="sold_qty"
            label="Sold qty"
            width="200"
            ><template #default="scope">
              {{ scope.row[5] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="margin"
            label="Margin(%)"
            width="200"
            ><template #default="scope">
              {{
                parseInt(((scope.row[3] - scope.row[2]) * 100) / scope.row[2])
              }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="cur_sum"
            label="Current_Sum"
            width="200"
            ><template #default="scope">
              {{ scope.row[5] }}
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="sold_sum"
            label="Sold_Sum"
            width="200"
            ><template #default="scope">
              {{ scope.row[3] + scope.row[2] }}
            </template></el-table-column
          >
          <el-table-column
            fixed="right"
            type="number"
            header-align="center"
            align="center"
            sortable
            prop="frofit_sum"
            label="Profit_Sum"
            width="200"
            ><template #default="scope">
              {{ scope.row[3] - scope.row[2] }}
            </template></el-table-column
          >
        </el-table>
      </div>
      <div></div>
    </div>
  </div>
</template>
