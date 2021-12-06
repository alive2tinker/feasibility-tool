<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info"
                >معطيات تنظيمية</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-label>اسم المشروع</b-label>
                <b-form-input v-model="projectName"></b-form-input>
                <b-label>وصف المشروع</b-label>
                <b-form-textarea
                  id="textarea"
                  v-model="projectDescription"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <div class="d-flex mt-3 justify-content-between">
                  <b-card-title class="text-left">قائمة الملاك</b-card-title>
                  <b-card-title>{{ owners.length }}</b-card-title>
                </div>
                <div class="row" v-for="(owner, index) in owners" :key="index">
                  <div class="col-md-5">
                    <b-form-input
                      v-model="owner.name"
                      :placeholder="`اسم المالك رقم ${index}`"
                    ></b-form-input>
                  </div>
                  <div class="col-md-5">
                    <b-form-input
                      v-model="owner.percentage"
                      :placeholder="`نسبة المالك رقم ${index}`"
                    ></b-form-input>
                  </div>
                  <div class="col-md-1">
                    <b-icon
                      icon="trash-fill"
                      aria-hidden="true"
                      @click="removeOwner(index)"
                    ></b-icon>
                  </div>
                </div>
                <b-button variant="link" @click="addOwner"
                  >إضافة مالك جديد</b-button
                >
                <b-card-title class="text-left">جدوى تنظيمية</b-card-title>
                <p class="text-left">
                  تحدث بتفصيل على مدى استطاعة الملاك في إدارة هذا المشروع، وكيف
                  ستكون آلية الإدارة.
                </p>
                <b-form-textarea
                  id="textarea"
                  v-model="organizationalFeasibility"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info"
                >معطيات اقتصادية</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
              visible
            >
              <b-card-body>
                <b-card-title>خيارات محاسبية</b-card-title>
                <div class="row my-3">
                  <div class="col-md-6">
                    <b-form-label class="text-left">العملة</b-form-label>
                    <b-form-select v-model="accountingOptions.currency">
                      <option selected value="ريال سعودي">ريال سعودي</option>
                    </b-form-select>
                  </div>
                  <div class="col-md-6">
                    <b-form-label class="text-left"
                      >النسبة المئوية</b-form-label
                    >
                    <b-form-select v-model="accountingOptions.decimals">
                      <option value="tens">الاعشار</option>
                    </b-form-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-label class="text-left"
                      >سنوات دراسة الجدوى</b-form-label
                    >
                    <b-form-select v-model="accountingOptions.feasibilityYears">
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </b-form-select>
                  </div>
                  <div class="col-md-6">
                    <b-form-label class="text-left"
                      >نسبة الضريبة المضافة</b-form-label
                    >
                    <b-form-select v-model="accountingOptions.vatPercentage">
                      <option
                        v-for="percentage in Array(21).keys()"
                        :key="percentage"
                        :value="percentage"
                      >
                        {{ `${percentage} %` }}
                      </option>
                    </b-form-select>
                  </div>
                </div>
              </b-card-body>
              <b-card-body>
                <div class="d-flex justify-content-between my-4">
                  <b-card-title>تكاليف التاسيس والانشاء</b-card-title>
                  <p>
                    {{ `${setupCostsComputed} ${accountingOptions.currency}` }}
                  </p>
                </div>
                <div
                  class="row my-3"
                  v-for="(setupCost, index) in setupCosts"
                  :key="index"
                >
                  <div class="col-md-8">
                    <b-form-input
                      v-model="setupCost.name"
                      placeholder="اسم التكلفة"
                    />
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="setupCost.cost"
                      placeholder="القيمة"
                    />
                  </div>
                  <div class="col-md-8">
                    <p>العمر الافتراضي (سنوات):</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="setupCost.lifeSpan"
                      placeholder="القيمة"
                    />
                  </div>
                  <div class="col-md-8">
                    <p>نسبة الاستهلاك السنوي:</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="setupCost.consumptionRatio"
                      placeholder="القيمة"
                    />
                  </div>
                  <div class="col-md-8"></div>
                  <div class="col-md-4">
                    <b-icon
                      icon="trash-fill"
                      aria-hidden="true"
                      @click="removeSetupCost(index)"
                    ></b-icon>
                  </div>
                </div>
                <b-button variant="link" @click="addSetupCost">
                  إضافة تكلفة جديدة</b-button
                >
              </b-card-body>
              <b-card-body>
                <div class="d-flex justify-content-between my-4">
                  <b-card-title>المديونيات</b-card-title>
                  <p>{{ `${debtsComputed} ${accountingOptions.currency}` }}</p>
                </div>
                <div
                  class="row my-3"
                  v-for="(debt, index) in debts"
                  :key="index"
                >
                  <div class="col-md-10 row">
                    <div class="col-md-6">
                      <b-form-input
                        v-model="debt.loaner"
                        placeholder="الجهة الممولة"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="debt.cost"
                        placeholder="قيمة القرض"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        placeholder="نسبة الفائدة السنوية"
                        v-model="debt.APR"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="debt.loanYears"
                        placeholder="سنوات السداد"
                      ></b-form-input>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <b-icon
                      icon="trash-fill"
                      aria-hidden="true"
                      @click="removeDebt(index)"
                    ></b-icon>
                  </div>
                </div>
                <b-button variant="link" @click="addDebt"
                  >إضافة مديونية جديدة</b-button
                >
              </b-card-body>
              <b-card-body>
                <div class="d-flex justify-content-between">
                  <b-card-title>الموظفين</b-card-title>
                  <p>{{ `${salaries} ${accountingOptions.currency}` }}</p>
                </div>
                <div
                  class="row my-3"
                  v-for="(employee, index) in employees"
                  :key="index"
                >
                  <div class="col-md-8">
                    <b-form-input
                      v-model="employee.jobTitle"
                      placeholder="المسمى الوظيفي"
                    ></b-form-input>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="employee.salary"
                      placeholder="الراتب"
                    ></b-form-input>
                  </div>
                  <div class="col-md-8">
                    <p>عدد الموظفين في هذه المسمى:</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="employee.numberOfEmployees"
                      placeholder="العدد"
                    ></b-form-input>
                  </div>
                </div>
                <b-button variant="link" @click="addEmployee">
                  إضافة موظف جديد</b-button
                >
              </b-card-body>
              <b-card-body>
                <div class="d-flex justify-content-between">
                  <b-card-title>التكاليف الشهرية الثابتة </b-card-title>
                  <p>
                    {{
                      `${monthlyCostsComputed} ${accountingOptions.currency}`
                    }}
                  </p>
                </div>
                <div
                  class="row my-3"
                  v-for="(monthlyCost, index) in monthlyCosts"
                  :key="index"
                >
                  <div class="col-md-8">
                    <b-form-input
                      v-model="monthlyCost.name"
                      placeholder="اسم التكلفة"
                    ></b-form-input>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      v-model="monthlyCost.cost"
                      placeholder="القيمة"
                    ></b-form-input>
                  </div>
                  <div class="col-md-8">
                    <b-form-checkbox
                      v-model="monthlyCost.vatInclusive"
                    ></b-form-checkbox>
                    <p>خاضعة لضريبة القيمة المضافة</p>
                  </div>
                  <div class="col-md-4">
                    <b-icon
                      icon="trash-fill"
                      aria-hidden="true"
                      @click="removeMonthlyCost(index)"
                    ></b-icon>
                  </div>
                </div>
                <b-button variant="link" @click="addMonthlyCost">
                  إضافة تكلفة جديدة</b-button
                >
              </b-card-body>
              <b-card-body>
                <div class="d-flex justify-content-between">
                  <b-card-title>المنتجات وإيرادها الشهري</b-card-title>
                  <p>
                    {{
                      `${monthlyProductsComputed} ${accountingOptions.currency}`
                    }}
                  </p>
                </div>
                <div
                  class="row my-3"
                  v-for="(product, index) in products"
                  :key="index"
                >
                  <div class="form-group row">
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.name"
                        placeholder="اسم المنتج"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.rawCost"
                        placeholder="تكلفة المواد الاولية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.sellingCap"
                        placeholder="قدرة البيع الشهرية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.price"
                        placeholder="السعر"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.productionCap"
                        placeholder="قدرة الانتاج الشهرية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        v-model="product.annualSalePercentage"
                        placeholder="نسبة زيادة بيع سنوية"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
                <b-button variant="link" @click="addProduct">
                  إضافة منتج أو خدمة جديدة</b-button
                >
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="info"
                >السوق المستهدف</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="form-group">
                  <b-form-input
                    v-model="marketInfo.name"
                    placeholder="اسم السوق المستهدف"
                  ></b-form-input>
                </div>
                <div class="form-group">
                  <b-form-input
                    v-model="marketInfo.tradingVolume"
                    placeholder="حجم التداول السنوي"
                  ></b-form-input>
                </div>
                <div class="form-group">
                  <b-form-textarea
                    rows="3"
                    max-rows="6"
                    v-model="marketInfo.description"
                    placeholder="نبذة عن السوق"
                  ></b-form-textarea>
                </div>
                <div class="form-group">
                  <b-form-textarea
                    rows="3"
                    max-rows="6"
                    v-model="marketInfo.briefOfYourProducts"
                    placeholder="نبذة عن منتجاتك"
                  ></b-form-textarea>
                </div>
                <div class="form-group">
                  <b-form-textarea
                    rows="3"
                    max-rows="6"
                    v-model="marketInfo.briefOfVendors"
                    placeholder="نبذة عن الموردون"
                  ></b-form-textarea>
                </div>
                <div class="form-group">
                  <b-form-textarea
                    rows="3"
                    max-rows="6"
                    v-model="marketInfo.briefOfYourMarketingPlans"
                    placeholder="نبذة عن خطط التسويق"
                  ></b-form-textarea>
                </div>
              </b-card-body>
              <b-card-body>
                <b-card-title>المنافسة</b-card-title>
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="marketInfo.competitionAnalysis"
                  placeholder="تحليل المنافسة"
                ></b-form-textarea>
                <div class="row my-3">
                  <div class="col-md-8">
                    <b-list-group class="my-3">
                      <b-list-group-item
                        v-for="(competitor, index) in marketInfo.competitors"
                        :key="index"
                      >
                        <div class="form-group row">
                          <div class="col-md-8">
                            <b-form-input
                              v-model="competitor.name"
                              placeholder="اسم المنافس"
                            ></b-form-input>
                          </div>
                          <div class="col-md-4">
                            <b-form-input
                              v-model="competitor.share"
                              placeholder="الحصة السوقية"
                            ></b-form-input>
                          </div>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                    <b-button variant="link" @click="addCompetitor">
                      إضافة منافس جديد</b-button
                    >
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-4 variant="info"
                >تحليل SWOT</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-4"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-label>نقاط القوة</b-form-label>
                <b-form-textarea
                  id="textarea"
                  v-model="strengthPoints"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <b-form-label>نقاط الضعف</b-form-label>
                <b-form-textarea
                  id="textarea"
                  v-model="weaknessPoints"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <b-form-label>الفرص المتاحة</b-form-label>
                <b-form-textarea
                  id="textarea"
                  v-model="opportunities"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <b-form-label>التهديدات المتوقعة</b-form-label>
                <b-form-textarea
                  id="textarea"
                  v-model="threats"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="text-center">الجدوى الاقتصادية</h3>
        <b-card>
          <b-card-body>
            <b-card-title
              >جدوى لـ{{ accountingOptions.feasibilityYears }} سنة</b-card-title
            >
            <div class="row">
              <div class="col-md-4">
                <h4>
                  {{ `${PRA} ${accountingOptions.currency}` }}<br /><small
                    >معدل ربح سنوي</small
                  >
                </h4>
              </div>
              <div class="col-md-4">
                <h4>
                  {{ `${PRA} ${accountingOptions.currency}` }}<br /><small
                    >معدل ربح سنوي</small
                  >
                </h4>
              </div>
              <div class="col-md-4">
                <h4>
                  {{ `${PRA} ${accountingOptions.currency}` }}<br /><small
                    >معدل ربح سنوي</small
                  >
                </h4>
              </div>
            </div>
          </b-card-body>
        </b-card>
        <button @click="generateReport" class="btn btn-primary">
          حفظ الدراسة
        </button>
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :filename="`feasibility study for ${projectName}`"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div class="container-fluid">
              <div class="d-flex justify-content-between border-bottom py-4">
              <div>
                <h1>دراسة جدوى</h1>
                اخر تحديث في {{ timestamp }}
              </div>
              <h1>نظام منشات</h1>
            </div>
            <div class="d-flex justify-content-between">
              <h2>تكاليف التاسيس والانشاء</h2>
              <h2>{{ setupCostsComputed }}</h2>
            </div>
            <div class="row py-4 border-bottom">
              <div class="col-md-6">
                نوع التكلفة
              </div>
              <div class="col-md-6">القيمة</div>
              <div class="col-md-6">العمر الافتراضي</div>
              <div class="col-md-6">الاستهلاك السنوي</div>
            </div>
            <div v-if="setupCosts.length > 0">  
              <b-table striped hover :items="setupCosts"></b-table>
            </div>
            <h5 class="mt-4" v-else>لايوجد بيانات حتى الان</h5>
            </div>
          </section>
        </vue-html2pdf>
      </div>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    VueHtml2pdf,
  },
  computed: {
    setupCostsComputed: {
      get() {
        const sum = (a, b) => parseInt(a) + parseInt(b.cost);
        let value = this.setupCosts.reduce(sum, 0);
        return value;
      },
    },
    debtsComputed: {
      get() {
        const sum = (a, b) => parseInt(a) + parseInt(b.cost);
        let value = this.debts.reduce(sum, 0);
        return value;
      },
    },
    salaries: {
      get() {
        const sum = (a, b) =>
          parseInt(a) + parseInt(b.salary * b.numberOfEmployees);
        let value = this.employees.reduce(sum, 0);
        return value;
      },
    },
    monthlyCostsComputed: {
      get() {
        const sum = (a, b) => parseInt(a) + parseInt(b.cost);
        let value = this.monthlyCosts.reduce(sum, 0);
        return value;
      },
    },
    monthlyProductsComputed: {
      get() {
        return 0;
      },
    },
    PRA: {
      get() {
        return 0;
      },
    },
  },
  data() {
    return {
      projectName: "",
      projectDescription: "",
      owners: [],
      organizationalFeasibility: "",
      timestamp: "",
      accountingOptions: {
        currency: "SAR",
        vatPercentage: "0",
        feasibilityYears: "2",
        decimals: "10",
      },
      setupCosts: [],
      debts: [],
      employees: [],
      text: "|",
      strengthPoints: "",
      weaknessPoints: "",
      opportunities: "",
      threats: "",
      marketInfo: {
        name: "",
        tradingVolume: "",
        description: "",
        briefOfYourProducts: "",
        briefOfTargetAudience: "",
        briefOfVendors: "",
        briefOfYourMarketingPlans: "",
        competitionAnalysis: "",
        competitors: [],
      },
      monthlyCosts: [],
      products: [],
    };
  },
  mounted(){
    this.getNow();
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    addOwner() {
      this.owners.push({ name: "", percentage: "" });
    },
    removeOwner(index) {
      this.owners.splice(index, 1);
    },
    addSetupCost() {
      this.setupCosts.push({
        الاسم: "",
        cost: 0,
        lifeSpan: "",
        consumptionRatio: "",
        hasVat: 0,
      });
    },
    removeSetupCost(index) {
      this.setupCosts.splice(index, 1);
    },
    addDebt() {
      this.debts.push({ loaner: "", cost: 0, APR: "", loanYears: "" });
    },
    removeDebt(index) {
      this.debts.splice(index, 1);
    },
    addEmployee() {
      this.employees.push({ jobTitle: "", salary: 0, numberOfEmployees: 1 });
    },
    removeEmployee(index) {
      this.employees.splice(index, 1);
    },
    addCompetitor() {
      this.marketInfo.competitors.push({ name: "", share: "" });
    },
    removeCompetitor(index) {
      this.marketInfo.competitors.splice(index, 1);
    },
    addMonthlyCost() {
      this.monthlyCosts.push({ name: "", cost: "", vatInclusive: 0 });
    },
    removeMonthlyCost(index) {
      this.monthlyCosts.splice(index, 1);
    },
    addProduct() {
      this.products.push({
        name: "",
        rawCost: "",
        sellingCap: "",
        price: "",
        productionCap: "",
        annualSalePercentage: "",
      });
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  text-align: left;
}
</style>
