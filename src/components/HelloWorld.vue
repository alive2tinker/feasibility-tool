<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="primary"
                >معطيات تنظيمية</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              accordion="my-accordion"
              role="tabpanel"
              visible
            >
              <b-card-body>
                <label>اسم المشروع</label>
                <b-form-input v-model="projectName"></b-form-input>
                <label>وصف المشروع</label>
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
                      type="number"
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
                <b-card-title>جدوى تنظيمية</b-card-title>
                <p>
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
              <b-button block v-b-toggle.accordion-2 variant="primary"
                >معطيات اقتصادية</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-title>خيارات محاسبية</b-card-title>
                <div class="row my-3">
                  <div class="col-md-6">
                    <label class="text-left">>العملة</label>
                    <b-form-select v-model="accountingOptions.currency">
                      <option selected value="ريال سعودي">ريال سعودي</option>
                    </b-form-select>
                  </div>
                  <div class="col-md-6">
                    <label class="text-left"> >النسبة المئوية</label>
                    >
                    <b-form-select v-model="accountingOptions.decimals">
                      <option value="tens">الاعشار</option>
                    </b-form-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-left"> >سنوات دراسة الجدوى</label>
                    >
                    <b-form-select v-model="accountingOptions.feasibilityYears">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </b-form-select>
                  </div>
                  <div class="col-md-6">
                    <label class="text-left"> >نسبة الضريبة المضافة</label>
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
                      type="number"
                      v-model="setupCost.cost"
                      placeholder="القيمة"
                    />
                  </div>
                  <div class="col-md-8">
                    <p>العمر الافتراضي (سنوات):</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      type="number"
                      v-model="setupCost.lifeSpan"
                      placeholder="القيمة"
                    />
                  </div>
                  <div class="col-md-8">
                    <p>نسبة الاستهلاك السنوي:</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      type="number"
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
                        type="number"
                        v-model="debt.cost"
                        placeholder="قيمة القرض"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
                        placeholder="نسبة الفائدة السنوية"
                        v-model="debt.APR"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
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
                      type="number"
                      v-model="employee.salary"
                      placeholder="الراتب"
                    ></b-form-input>
                  </div>
                  <div class="col-md-8">
                    <p>عدد الموظفين في هذه المسمى:</p>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                      type="number"
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
                      type="number"
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
                        type="number"
                        v-model="product.rawCost"
                        placeholder="تكلفة المواد الاولية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
                        v-model="product.sellingCap"
                        placeholder="قدرة البيع الشهرية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
                        v-model="product.price"
                        placeholder="السعر"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
                        v-model="product.productionCap"
                        placeholder="قدرة الانتاج الشهرية"
                      ></b-form-input>
                    </div>
                    <div class="col-md-6">
                      <b-form-input
                        type="number"
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
              <b-button block v-b-toggle.accordion-3 variant="primary"
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
                    type="number"
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
                    v-model="marketInfo.briefOfTargetAudience"
                    placeholder="نبذة عن الشريحة المستهدفة"
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
              <b-button block v-b-toggle.accordion-4 variant="primary"
                >تحليل SWOT</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-4"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <label>نقاط القوة</label>
                <b-form-textarea
                  id="textarea"
                  v-model="strengthPoints"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <label>نقاط الضعف</label>
                <b-form-textarea
                  id="textarea"
                  v-model="weaknessPoints"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <label>الفرص المتاحة</label>
                <b-form-textarea
                  id="textarea"
                  v-model="opportunities"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card-body>
              <b-card-body>
                <label>التهديدات المتوقعة</label>
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
                  {{ reclaimPeriod }}<br /><small
                    >فترة استرداد رأس المال
                  </small>
                </h4>
              </div>
              <div class="col-md-4">
                <h4>
                  {{ marketShare }}<br /><small>معدل الحصة السوقية </small>
                </h4>
              </div>
            </div>
          </b-card-body>
          <b-card-body>
            <b-card-title>تمويل المشروع</b-card-title>
            <div class="row">
              <div class="col-md-4 mt-3">
                <h4>
                  {{ `${capital} ${accountingOptions.currency}` }}<br /><small
                    >رأس مال المشروع
                  </small>
                </h4>
              </div>
              <div class="col-md-4 mt-3">
                <h4>
                  {{ `${debtsFinanced} ${accountingOptions.currency}`
                  }}<br /><small>مديونية لتمويل رأس المال </small>
                </h4>
              </div>
              <div class="col-md-4 mt-3">
                <h4>
                  {{ `${personalFinance} ${accountingOptions.currency}`
                  }}<br /><small>تمويل خاص للمشروع </small>
                </h4>
              </div>
            </div>
          </b-card-body>
          <b-card-body>
            <b-card-title>الربحية السنوية</b-card-title>
            <table class="table w-100">
              <thead>
                <th>السنة المالية</th>
                <th>
                  <p>التكاليف السنوية <br />(الشهرية) <br />(٪ من الإيرادات)</p>
                </th>
                <th>
                  <p>الارباح السنوية <br />(الشهرية) <br />(٪ من الإيرادات)</p>
                </th>
              </thead>
              <tbody>
                <tr v-for="(year, index) in profitiblityYears" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ year.costs }}</td>
                  <td>{{ year.profits }}</td>
                </tr>
                <h5 class="mt-4" v-if="profitiblityYears.length === 0">لاتوجد بيانات حتى الان</h5>
              </tbody>
            </table>
          </b-card-body>
          <b-card-body>
            <b-card-title>الية التسعير بالتكلفة</b-card-title>
            <table class="table w-100">
              <thead>
                <th>المنتج</th>
                <th>أدنى سعر للربحية</th>
                <th>الهامش الربحي</th>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" :key="index">
                  <td>{{ product.name }}</td>
                  <td>{{ product.rawCost }}</td>
                  <td>{{ `${getProfitMargin(product)} %` }}</td>
                </tr>
                <h5 v-if="products.length === 0" class="mt-4">
                  لايوجد بيانات حتى الان
                </h5>
              </tbody>
            </table>
          </b-card-body>
        </b-card>
        <button
          :disabled="formHasMissingInput"
          @click="generateReport"
          class="btn btn-primary btn-block btn-lg my-4"
        >
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
          <section slot="pdf-content" style="direction: rtl">
            <!-- PDF Content Here -->
            <div class="mainHeader">
              <div class="mainHeader-overlay">
                <div class="mainHeader-whiteoverly">
                  <div class="container-fluid">
                    <svg
                      id="monshaat_new_logo"
                      xmlns="http://www.w3.org/2000/svg"
                      width="112.036"
                      height="78.425"
                      viewBox="0 0 112.036 78.425"
                    >
                      <path
                        id="svg_106"
                        d="M98.247,96.109a3.918,3.918,0,0,0-2.327-.63H92.254a1.02,1.02,0,0,1-1.177-1.136v-.465a1.124,1.124,0,0,1,.237-.808,1.024,1.024,0,0,1,.742-.24h6.591V90.464h-6.2a7,7,0,0,0-1.566.156,2.468,2.468,0,0,0-1.894,1.735A5.436,5.436,0,0,0,88.776,94v.52a2.808,2.808,0,0,0,.95,2.412,4.161,4.161,0,0,0,2.483.654h3.616a1.152,1.152,0,0,1,.789.241.862.862,0,0,1,.254.692v.9c0,.695-.3.979-1.044.979H89.04v2.358H95.9a3.11,3.11,0,0,0,2.523-.938,4.153,4.153,0,0,0,.755-2.691v-.745a2.63,2.63,0,0,0-.929-2.279"
                        transform="translate(-40.088 -40.787)"
                        fill="#fff"
                      />
                      <path
                        id="svg_107"
                        d="M143.146,90.463h-5.086v2.47h5.086c.935,0,1.353.49,1.353,1.59v.527h-4.044c-1.986,0-3.036,1.013-3.036,2.929v1.7a3.223,3.223,0,0,0,.749,2.291,3.018,3.018,0,0,0,2.287.8H146.8V94.455c0-2.611-1.263-3.992-3.653-3.992m1.354,6.786v3.179h-3.911c-.664,0-.934-.284-.934-.979V98.273c0-.727.27-1.023.934-1.023H144.5Z"
                        transform="translate(-61.307 -40.786)"
                        fill="#fff"
                      />
                      <path
                        id="svg_108"
                        d="M158.827,90.452h1.616l.6-4.488h-2.821Z"
                        transform="translate(-70.382 -38.824)"
                        fill="#fff"
                      />
                      <path
                        id="svg_109"
                        d="M172.773,90.372h-5.087v2.47h5.087c.935,0,1.353.49,1.353,1.59v.526h-4.044c-1.986,0-3.036,1.014-3.036,2.93v1.7a3.225,3.225,0,0,0,.748,2.291,3.017,3.017,0,0,0,2.288.8h6.344V94.364c0-2.611-1.263-3.992-3.653-3.992m1.353,6.786v3.179h-3.912c-.663,0-.933-.284-.933-.979V98.181c0-.727.27-1.023.933-1.023h3.912Z"
                        transform="translate(-74.23 -40.747)"
                        fill="#fff"
                      />
                      <path
                        id="svg_110"
                        d="M197.1,89.653v-2.2H194.26v-3.89h-2.367V95.695c0,3.355,1.9,4.059,3.5,4.059h1.668V97.442h-1.514c-.6,0-1.286-.191-1.286-1.68V89.654H197.1Z"
                        transform="translate(-85.069 -37.778)"
                        fill="#fff"
                      />
                      <path
                        id="svg_111"
                        d="M45.623,90.409H42.74a3.8,3.8,0,0,0-3.749,3.841V98.9a3.8,3.8,0,0,0,3.749,3.842h2.883A3.8,3.8,0,0,0,49.372,98.9V94.25a3.8,3.8,0,0,0-3.749-3.841m1.445,3.841V98.9a1.464,1.464,0,0,1-1.445,1.48H42.74a1.465,1.465,0,0,1-1.446-1.48V94.25A1.465,1.465,0,0,1,42.74,92.77h2.883a1.464,1.464,0,0,1,1.445,1.481"
                        transform="translate(-18.371 -40.763)"
                        fill="#fff"
                      />
                      <path
                        id="svg_112"
                        d="M73.866,95.506c-.016-3.478-2.34-5.062-4.5-5.062H64.326v12.29h2.3V92.806H69.37a2.337,2.337,0,0,1,2.188,2.247v7.231l.023.449h2.286V95.506Z"
                        transform="translate(-29.422 -40.778)"
                        fill="#fff"
                      />
                      <path
                        id="svg_113"
                        d="M19.924,95.524v-.017C19.908,92.392,18.042,90.8,16.1,90.5l-.037-.056H13.613l.028.029a4.492,4.492,0,0,0-2.852,1.5,4.471,4.471,0,0,0-3.343-1.53H2.416v12.289h2.3V92.807H7.446A2.225,2.225,0,0,1,9.636,95c0,.012,0,.023,0,7.386v.354h2.3v-.354c0-6.978,0-7.37,0-7.386a2.192,2.192,0,0,1,2.191-2.189h1.3a2.337,2.337,0,0,1,2.185,2.248v7.231l.024.449h2.286Z"
                        transform="translate(-2.416 -40.779)"
                        fill="#fff"
                      />
                      <path
                        id="svg_114"
                        d="M124.058,92.522l0-.017c-.016-3.478-2.34-5.062-4.5-5.062h-2.737V83.564h-2.306V99.733h2.306V89.8h2.737a2.338,2.338,0,0,1,2.189,2.248v7.231l.024.449h2.286Z"
                        transform="translate(-51.316 -37.777)"
                        fill="#fff"
                      />
                      <path
                        id="svg_115"
                        d="M159.85,35.437c0-1.7-3.569-3.373-3.569-3.373s-3.635,3.493-3.512,3.6l4.025,3.372s3.056-1.892,3.056-3.6"
                        transform="translate(-68.001 -15.312)"
                        fill="#fff"
                      />
                      <path
                        id="svg_116"
                        d="M128.568,35.662l4.023,3.372s3.057-1.892,3.057-3.6-3.568-3.373-3.568-3.373-3.635,3.492-3.512,3.6"
                        transform="translate(-57.444 -15.312)"
                        fill="#fff"
                      />
                      <path
                        id="svg_117"
                        d="M119.591,35.437c0-1.7-3.569-3.373-3.569-3.373s-3.635,3.493-3.511,3.6l4.024,3.372s3.056-1.892,3.056-3.6"
                        transform="translate(-50.44 -15.312)"
                        fill="#fff"
                      />
                      <path
                        id="svg_118"
                        d="M125.921,23.259c0-1.706-3.569-3.373-3.569-3.373s-3.634,3.493-3.511,3.6l4.024,3.373s3.056-1.894,3.056-3.6"
                        transform="translate(-53.201 -9.999)"
                        fill="#fff"
                      />
                      <path
                        id="svg_119"
                        d="M152.61,36.123c-.038-.988-.638-4.576-5.494-4.576h-2.879l-7.254,7.611V45.72a4.653,4.653,0,0,0,.111.989c-2.125.008-4.627.011-5.86-2.09a5.584,5.584,0,0,1-.655-2.821V35.64l-3.809,3.9V45.72a7.431,7.431,0,0,0,.074.989c-2.12.008-4.608,0-5.836-2.09a5.6,5.6,0,0,1-.656-2.821V32.5l-3.808,3.9V45.72a7.524,7.524,0,0,0,.074.989,5.212,5.212,0,0,1-2.7-1.2,4.8,4.8,0,0,1-1.774-3.694V34.443l-3.808,3.9V45.72a4.939,4.939,0,0,0,.111.991,5.183,5.183,0,0,1-2.737-1.2,4.8,4.8,0,0,1-1.773-3.694V32.5l-3.807,3.9V45.72a4.873,4.873,0,0,0,.11.989c-2.127.008-4.638.015-5.873-2.09a5.583,5.583,0,0,1-.655-2.819V18.1L89.9,22V45.948l.01-.011a4.522,4.522,0,0,0,1.84,3.829,6.574,6.574,0,0,0,3.45.86c.5.01,1.007-.015,1.51-.016.188,0,.571-.4.653-.476.48-.422.939-.88,1.386-1.339s.9-.924,1.306-1.419c.029-.035.146-.2.257-.362a4.812,4.812,0,0,0,1.586,2.4,5.035,5.035,0,0,0,3.018,1.215c.184,0,.576-.406.652-.475.48-.423.94-.881,1.386-1.34s.9-.924,1.307-1.42c.027-.032.149-.2.26-.365a4.822,4.822,0,0,0,1.583,2.385,5.035,5.035,0,0,0,3.018,1.215c.184,0,.575-.406.653-.475.48-.423.939-.881,1.386-1.34s.9-.924,1.307-1.42c.023-.028.115-.159.213-.3a4.046,4.046,0,0,0,1.708,2.669,6.574,6.574,0,0,0,3.45.86c.5.01,1.006-.015,1.509-.016.187,0,.571-.4.651-.476.481-.422.941-.88,1.386-1.339s.9-.924,1.307-1.419c.024-.03.115-.159.211-.3l0,.017a4.048,4.048,0,0,0,1.708,2.669,6.575,6.575,0,0,0,3.45.86c.5.01,1.007-.015,1.51-.016.187,0,.571-.4.651-.476.481-.422.94-.88,1.386-1.339s.9-.924,1.307-1.419c.026-.033.136-.188.242-.341.8,2.684,4.052,3.594,6.66,3.594h.89l7.9-7.947s0-6.462,0-6.558m-8.4,10.19c-3.595,0-3.407-3.068-3.421-4.494V35.37h5.491c1.9,0,2.521,2.884,2.521,6.256,0,.085,0,3.8.006,4.692l-4.6-.005"
                        transform="translate(-40.58 -9.22)"
                        fill="#fff"
                      />
                      <path
                        id="svg_120"
                        d="M39.437,40.151l4.151,3.481s3.21-1.987,3.21-3.778-3.747-3.541-3.747-3.541-3.056,2.937-3.6,3.628c-.049-1.778-3.741-3.505-3.741-3.505s-3.818,3.668-3.687,3.776l4.224,3.542s3-1.862,3.19-3.6"
                        transform="translate(-15.329 -17.165)"
                        fill="#fff"
                      />
                      <path
                        id="svg_121"
                        d="M90.423,8.282l4.622-4.5V2.35L92.029,5.219l-6.5-2.176-.325-.108L80.7,7.4V8.809L83.486,6.02l6.636,2.164Z"
                        transform="translate(-36.564 -2.35)"
                        fill="#fff"
                      />
                      <path
                        id="svg_122"
                        d="M46.716,49.979c-.27-.483-.894-1.4-.894-1.4l-4.175,4.056s1.806,3.044,1.835,4.936c.011.784,0-.027,0,.757v1.518H10.56c-2.944,0-4.133-.821-4.138-4.849l2.018-2.075V50.6L2.416,56.789c0,.03,0,2.211.006,2.282a5.385,5.385,0,0,0,.865,2.942,4.227,4.227,0,0,0,2.05,1.5,11.906,11.906,0,0,0,4.2.408H41.528L47.665,58.4V56.644c0-2.271.2-4.6-.948-6.665"
                        transform="translate(-2.416 -22.515)"
                        fill="#fff"
                      />
                      <path
                        id="svg_123"
                        d="M4.294,134.874h0c-.048-.013-.216-.057-.5-.129a4.611,4.611,0,0,1-.584-.176.47.47,0,0,1-.216-.161.488.488,0,0,1-.053-.246v-.09a.43.43,0,0,1,.176-.339.82.82,0,0,1,.541-.153.968.968,0,0,1,.606.16.54.54,0,0,1,.2.45v.053h.514v-.053a1.134,1.134,0,0,0-.072-.411.872.872,0,0,0-.2-.307,1.028,1.028,0,0,0-.3-.2,1.441,1.441,0,0,0-.356-.112,2.3,2.3,0,0,0-.394-.033,1.464,1.464,0,0,0-.887.255.814.814,0,0,0-.352.686v.048a1.081,1.081,0,0,0,.156.6.956.956,0,0,0,.553.357c.043.014.18.049.5.131a4.6,4.6,0,0,1,.584.175.449.449,0,0,1,.213.163.507.507,0,0,1,.054.251v.11a.434.434,0,0,1-.177.341.827.827,0,0,1-.541.152.965.965,0,0,1-.6-.16.537.537,0,0,1-.2-.45v-.16H2.44v.16a1.112,1.112,0,0,0,.073.411.885.885,0,0,0,.2.307,1.056,1.056,0,0,0,.3.2,1.448,1.448,0,0,0,.359.112,2.4,2.4,0,0,0,.395.033,1.479,1.479,0,0,0,.888-.251A.816.816,0,0,0,5,135.911v-.083a1.067,1.067,0,0,0-.157-.6.969.969,0,0,0-.551-.355"
                        transform="translate(-2.416 -59.397)"
                        fill="#fff"
                      />
                      <path
                        id="svg_124"
                        d="M17.413,134.707a1.151,1.151,0,0,0-.329.129.929.929,0,0,0-.276.228,1.042,1.042,0,0,0-.183.358,1.6,1.6,0,0,0-.069.489v.308a1.6,1.6,0,0,0,.069.488,1.039,1.039,0,0,0,.183.357.98.98,0,0,0,.275.23,1.184,1.184,0,0,0,.33.127,1.647,1.647,0,0,0,.36.037h1.144v-2.789H17.772a1.68,1.68,0,0,0-.36.036m-.369,1.318a1.076,1.076,0,0,1,.176-.7.687.687,0,0,1,.553-.2h.658v1.884h-.658a.69.69,0,0,1-.553-.2,1.078,1.078,0,0,1-.176-.7Z"
                        transform="translate(-8.584 -60.071)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_125"
                        width="0.485"
                        height="3.824"
                        transform="translate(11.235 73.565)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_126"
                        width="0.487"
                        height="3.824"
                        transform="translate(12.62 73.565)"
                        fill="#fff"
                      />
                      <path
                        id="svg_127"
                        d="M28.787,134.515a.47.47,0,0,1-.158-.382v-.083a.394.394,0,0,1,.167-.337.823.823,0,0,1,.5-.131.842.842,0,0,1,.506.127.394.394,0,0,1,.166.34v.2h.487v-.207a1.023,1.023,0,0,0-.02-.2.937.937,0,0,0-.29-.476,1.019,1.019,0,0,0-.344-.174,1.8,1.8,0,0,0-1.011,0,1.018,1.018,0,0,0-.342.179.852.852,0,0,0-.2.242.928.928,0,0,0-.093.236,1.028,1.028,0,0,0-.02.188v.106a.985.985,0,0,0,.016.175,1.315,1.315,0,0,0,.057.2.77.77,0,0,0,.132.223.861.861,0,0,0,.147.143.857.857,0,0,0-.351.753v.165a1.06,1.06,0,0,0,.036.278.9.9,0,0,0,.124.266.91.91,0,0,0,.223.225,1.107,1.107,0,0,0,.338.151,1.684,1.684,0,0,0,.458.057h1.136v-1.679h.4v-.455H29.3a.781.781,0,0,1-.512-.138m.536,1.819a.783.783,0,0,1-.519-.153.481.481,0,0,1-.174-.387v-.149a.508.508,0,0,1,.153-.386.559.559,0,0,1,.412-.152h.779v1.226h-.649Z"
                        transform="translate(-13.639 -59.398)"
                        fill="#fff"
                      />
                      <path
                        id="svg_128"
                        d="M37.185,136.083l-1.022-2.807-.012-.034H35.4v3.595h.522v-2.819l1.01,2.785.012.035h.479L38.456,134v2.838h.522v-3.595h-.764Z"
                        transform="translate(-16.803 -59.447)"
                        fill="#fff"
                      />
                      <path
                        id="svg_129"
                        d="M45.3,134.96h0a1.029,1.029,0,0,0-.278-.229,1.241,1.241,0,0,0-.332-.129,1.767,1.767,0,0,0-.718,0,1.152,1.152,0,0,0-.33.129.961.961,0,0,0-.277.229,1.065,1.065,0,0,0-.183.357,1.6,1.6,0,0,0-.069.49v.425a1.6,1.6,0,0,0,.069.489,1.072,1.072,0,0,0,.183.359.981.981,0,0,0,.276.232,1.2,1.2,0,0,0,.33.129,1.676,1.676,0,0,0,.359.037,1.6,1.6,0,0,0,.4-.048,1.246,1.246,0,0,0,.352-.152.915.915,0,0,0,.288-.3,1.223,1.223,0,0,0,.161-.441l.011-.061h-.5l-.01.04a.632.632,0,0,1-.233.384.789.789,0,0,1-.462.121.692.692,0,0,1-.551-.2.985.985,0,0,1-.177-.624h1.951v-.4a1.619,1.619,0,0,0-.069-.49,1.074,1.074,0,0,0-.184-.358m-.236.789H43.6a.88.88,0,0,1,.193-.551.715.715,0,0,1,.533-.179.727.727,0,0,1,.538.179.864.864,0,0,1,.2.551"
                        transform="translate(-20.169 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_130"
                        d="M50.564,133.87H49.9a1.694,1.694,0,0,0-.358.036,1.171,1.171,0,0,0-.331.13.952.952,0,0,0-.275.233,1.081,1.081,0,0,0-.183.359,1.6,1.6,0,0,0-.069.49v.3a1.6,1.6,0,0,0,.069.488,1.04,1.04,0,0,0,.183.357.977.977,0,0,0,.276.23,1.155,1.155,0,0,0,.33.127,1.638,1.638,0,0,0,.359.037h1.146v-3.823h-.479Zm-1.4,1.354a1.076,1.076,0,0,1,.176-.7.689.689,0,0,1,.553-.2h.666v1.884H49.9a.691.691,0,0,1-.553-.2,1.078,1.078,0,0,1-.176-.7Z"
                        transform="translate(-22.598 -59.27)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_131"
                        width="0.486"
                        height="2.789"
                        transform="translate(29.347 74.6)"
                        fill="#fff"
                      />
                      <path
                        id="svg_132"
                        d="M58.8,136.171a1.17,1.17,0,0,1-.16.7.663.663,0,0,1-.546.2.654.654,0,0,1-.543-.2,1.179,1.179,0,0,1-.157-.7v-1.5h-.486v1.608a1.78,1.78,0,0,0,.062.488,1.063,1.063,0,0,0,.171.36.9.9,0,0,0,.263.234,1.132,1.132,0,0,0,.326.128,1.83,1.83,0,0,0,.729,0,1.114,1.114,0,0,0,.325-.128.912.912,0,0,0,.263-.234,1.037,1.037,0,0,0,.171-.36,1.759,1.759,0,0,0,.063-.488V134.67H58.8Z"
                        transform="translate(-26.186 -60.07)"
                        fill="#fff"
                      />
                      <path
                        id="svg_133"
                        d="M73.189,136.837h2.068v-.453H73.712v-1.138h1.46v-.453h-1.46v-1.1h1.546v-.456H73.189Z"
                        transform="translate(-33.288 -59.447)"
                        fill="#fff"
                      />
                      <path
                        id="svg_134"
                        d="M89.208,134.96h0a1.02,1.02,0,0,0-.279-.229,1.23,1.23,0,0,0-.331-.129,1.77,1.77,0,0,0-.718,0,1.159,1.159,0,0,0-.33.129.967.967,0,0,0-.276.229,1.056,1.056,0,0,0-.184.357,1.6,1.6,0,0,0-.069.49v.425a1.6,1.6,0,0,0,.069.489,1.063,1.063,0,0,0,.184.359.973.973,0,0,0,.276.232,1.188,1.188,0,0,0,.33.129,1.667,1.667,0,0,0,.359.037,1.6,1.6,0,0,0,.4-.048,1.24,1.24,0,0,0,.352-.152.912.912,0,0,0,.288-.294,1.221,1.221,0,0,0,.162-.442l.01-.061h-.5l-.01.04a.632.632,0,0,1-.233.384.79.79,0,0,1-.463.121.69.69,0,0,1-.551-.2.981.981,0,0,1-.178-.624h1.951v-.4a1.619,1.619,0,0,0-.069-.49,1.054,1.054,0,0,0-.184-.358m-.236.789h-1.46a.883.883,0,0,1,.193-.551.716.716,0,0,1,.533-.179.729.729,0,0,1,.538.179.864.864,0,0,1,.2.551"
                        transform="translate(-39.322 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_135"
                        d="M98.333,135.066a.964.964,0,0,0-.278-.228,1.163,1.163,0,0,0-.331-.129,1.689,1.689,0,0,0-.36-.036H96.219V138.5H96.7v-1.035h.659a1.659,1.659,0,0,0,.36-.037,1.162,1.162,0,0,0,.33-.127,1.012,1.012,0,0,0,.278-.229,1.043,1.043,0,0,0,.184-.358,1.616,1.616,0,0,0,.069-.488v-.308a1.623,1.623,0,0,0-.069-.489,1.046,1.046,0,0,0-.184-.359m-.233.96v.082a1.066,1.066,0,0,1-.178.7.693.693,0,0,1-.558.2h-.659v-1.884h.659a.7.7,0,0,1,.558.205,1.075,1.075,0,0,1,.178.7"
                        transform="translate(-43.334 -60.072)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_136"
                        width="0.487"
                        height="2.789"
                        transform="translate(57.997 74.6)"
                        fill="#fff"
                      />
                      <path
                        id="svg_137"
                        d="M109.223,135.881c-.059-.016-.216-.056-.44-.107s-.4-.1-.493-.129a.462.462,0,0,1-.2-.107.27.27,0,0,1-.044-.175v-.024a.257.257,0,0,1,.145-.223.916.916,0,0,1,.473-.1c.635,0,.635.286.635.381v.052h.487V135.4a.8.8,0,0,0-.092-.387.7.7,0,0,0-.254-.264,1.308,1.308,0,0,0-.352-.138,1.835,1.835,0,0,0-.424-.046,1.436,1.436,0,0,0-.784.2.626.626,0,0,0-.32.552v.029a.759.759,0,0,0,.133.47.821.821,0,0,0,.435.263c.049.014.19.05.432.108s.4.1.494.132a.47.47,0,0,1,.206.109.259.259,0,0,1,.047.173v.052c0,.092,0,.373-.59.373-.628,0-.628-.29-.628-.385v-.223H107.6v.223a.814.814,0,0,0,.091.387.7.7,0,0,0,.255.266,1.239,1.239,0,0,0,.351.141,1.952,1.952,0,0,0,.819,0,1.218,1.218,0,0,0,.339-.133.669.669,0,0,0,.249-.26.808.808,0,0,0,.089-.386v-.042a.773.773,0,0,0-.133-.475.838.838,0,0,0-.434-.26"
                        transform="translate(-48.281 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_138"
                        d="M114.924,134.959a1,1,0,0,0-.278-.229,1.208,1.208,0,0,0-.331-.129,1.775,1.775,0,0,0-.719,0,1.175,1.175,0,0,0-.328.129.958.958,0,0,0-.276.229,1.047,1.047,0,0,0-.184.357,1.628,1.628,0,0,0-.068.49v.425a1.622,1.622,0,0,0,.068.489,1.054,1.054,0,0,0,.184.359.983.983,0,0,0,.275.232,1.2,1.2,0,0,0,.33.129,1.687,1.687,0,0,0,.36.037,1.6,1.6,0,0,0,.4-.048,1.256,1.256,0,0,0,.352-.152.915.915,0,0,0,.287-.294,1.243,1.243,0,0,0,.163-.441l.011-.061h-.5l-.01.04a.632.632,0,0,1-.234.384.782.782,0,0,1-.461.121.691.691,0,0,1-.551-.2.981.981,0,0,1-.177-.624h1.951v-.4a1.62,1.62,0,0,0-.069-.49,1.056,1.056,0,0,0-.186-.359m-.236.79h-1.46a.873.873,0,0,1,.192-.551.717.717,0,0,1,.534-.179.729.729,0,0,1,.538.179.861.861,0,0,1,.2.551"
                        transform="translate(-50.54 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_139"
                        d="M119.961,135.881c-.061-.017-.222-.057-.439-.107-.233-.055-.4-.1-.493-.129a.483.483,0,0,1-.2-.106.283.283,0,0,1-.043-.176v-.024a.255.255,0,0,1,.145-.223.917.917,0,0,1,.473-.1c.635,0,.635.286.635.381v.052h.485V135.4a.8.8,0,0,0-.091-.387.7.7,0,0,0-.254-.264,1.306,1.306,0,0,0-.352-.138,1.871,1.871,0,0,0-.424-.046,1.436,1.436,0,0,0-.785.2.625.625,0,0,0-.32.552v.029a.756.756,0,0,0,.133.47.814.814,0,0,0,.435.263c.051.014.2.051.432.108s.4.1.494.132a.478.478,0,0,1,.207.109.259.259,0,0,1,.047.173v.052c0,.092,0,.373-.591.373-.628,0-.628-.29-.628-.385v-.223h-.488v.223a.814.814,0,0,0,.091.387.693.693,0,0,0,.255.266,1.2,1.2,0,0,0,.351.141,1.95,1.95,0,0,0,.818,0,1.194,1.194,0,0,0,.338-.133.651.651,0,0,0,.249-.26.8.8,0,0,0,.09-.386v-.042a.77.77,0,0,0-.133-.475.84.84,0,0,0-.435-.26"
                        transform="translate(-52.965 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_140"
                        d="M126.387,133.8a.783.783,0,0,1,.6-.215.814.814,0,0,1,.571.182.886.886,0,0,1,.23.586l0,.048h.525v-.053a1.472,1.472,0,0,0-.079-.48,1.026,1.026,0,0,0-.2-.351,1.008,1.008,0,0,0-.3-.225,1.375,1.375,0,0,0-.357-.125,2.164,2.164,0,0,0-.788,0,1.25,1.25,0,0,0-.36.129,1.007,1.007,0,0,0-.3.232,1.065,1.065,0,0,0-.2.358,1.529,1.529,0,0,0-.073.491v1.231a1.54,1.54,0,0,0,.073.49,1.072,1.072,0,0,0,.2.359,1.011,1.011,0,0,0,.3.231,1.324,1.324,0,0,0,.361.129,2.057,2.057,0,0,0,.4.036,2.591,2.591,0,0,0,.762-.1,1.359,1.359,0,0,0,.55-.325l.016-.015v-1.552H127.16v.453h.64v.9a1.015,1.015,0,0,1-.3.133,2.079,2.079,0,0,1-.509.047.784.784,0,0,1-.6-.215,1.033,1.033,0,0,1-.2-.706V134.5a1.03,1.03,0,0,1,.2-.706"
                        transform="translate(-56.179 -59.398)"
                        fill="#fff"
                      />
                      <path
                        id="svg_141"
                        d="M133.858,134.96h0a.992.992,0,0,0-.277-.229,1.213,1.213,0,0,0-.332-.129,1.7,1.7,0,0,0-.36-.037,1.667,1.667,0,0,0-.359.037,1.2,1.2,0,0,0-.33.129.97.97,0,0,0-.276.229,1.056,1.056,0,0,0-.183.357,1.581,1.581,0,0,0-.069.49v.425a1.578,1.578,0,0,0,.069.489,1.062,1.062,0,0,0,.183.359.977.977,0,0,0,.275.232,1.2,1.2,0,0,0,.331.129,1.661,1.661,0,0,0,.359.037,1.6,1.6,0,0,0,.4-.048,1.271,1.271,0,0,0,.354-.152.935.935,0,0,0,.286-.294,1.22,1.22,0,0,0,.162-.442l.01-.061h-.5l-.009.039a.64.64,0,0,1-.235.385.789.789,0,0,1-.462.121.7.7,0,0,1-.551-.2.991.991,0,0,1-.178-.624h1.951v-.4a1.62,1.62,0,0,0-.069-.49,1.053,1.053,0,0,0-.184-.358m-.236.789h-1.46a.879.879,0,0,1,.193-.551.714.714,0,0,1,.533-.179.73.73,0,0,1,.539.179.867.867,0,0,1,.2.551"
                        transform="translate(-58.799 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_142"
                        d="M139.458,134.947a.867.867,0,0,0-.4-.212,2.375,2.375,0,0,0-.6-.063h-1.045v2.788h.486v-2.336h.607a1.5,1.5,0,0,1,.373.039.449.449,0,0,1,.216.115.439.439,0,0,1,.109.188,1.156,1.156,0,0,1,.032.292v1.7h.487v-1.643a1.875,1.875,0,0,0-.059-.51.8.8,0,0,0-.209-.36"
                        transform="translate(-61.306 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_143"
                        d="M145.048,134.96h0a.984.984,0,0,0-.278-.229,1.233,1.233,0,0,0-.331-.129,1.769,1.769,0,0,0-.718,0,1.169,1.169,0,0,0-.331.129.971.971,0,0,0-.276.229,1.054,1.054,0,0,0-.183.357,1.582,1.582,0,0,0-.069.49v.425a1.577,1.577,0,0,0,.069.489,1.06,1.06,0,0,0,.183.359.976.976,0,0,0,.275.232,1.2,1.2,0,0,0,.33.129,1.668,1.668,0,0,0,.359.037,1.6,1.6,0,0,0,.4-.048,1.275,1.275,0,0,0,.353-.152.935.935,0,0,0,.286-.294,1.231,1.231,0,0,0,.162-.442l.01-.061h-.5l-.01.04a.632.632,0,0,1-.233.384.788.788,0,0,1-.462.121.692.692,0,0,1-.551-.2.985.985,0,0,1-.177-.624H145.3v-.4a1.619,1.619,0,0,0-.069-.49,1.064,1.064,0,0,0-.184-.358m-.236.789h-1.46a.88.88,0,0,1,.193-.551.714.714,0,0,1,.533-.179.73.73,0,0,1,.539.179.864.864,0,0,1,.2.551"
                        transform="translate(-63.681 -60.024)"
                        fill="#fff"
                      />
                      <path
                        id="svg_144"
                        d="M148.607,137.46h.487v-2.336h.777v-.453h-1.263Z"
                        transform="translate(-66.187 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_145"
                        d="M152.424,134.707a1.132,1.132,0,0,0-.33.129.927.927,0,0,0-.276.228,1.042,1.042,0,0,0-.184.358,1.6,1.6,0,0,0-.069.489v.308a1.6,1.6,0,0,0,.069.488,1.039,1.039,0,0,0,.184.357.961.961,0,0,0,.276.23,1.144,1.144,0,0,0,.33.127,1.635,1.635,0,0,0,.359.037h1.145v-2.789h-1.145a1.668,1.668,0,0,0-.359.036m-.37,1.318a1.076,1.076,0,0,1,.176-.7.686.686,0,0,1,.552-.2h.658v1.884h-.658a.687.687,0,0,1-.552-.2,1.078,1.078,0,0,1-.176-.7Z"
                        transform="translate(-67.478 -60.071)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_146"
                        width="0.485"
                        height="3.824"
                        transform="translate(87.352 73.565)"
                        fill="#fff"
                      />
                      <path
                        id="svg_147"
                        d="M162.6,133.243h-.634l-1.135,3.527-.022.068h.546l.24-.75h1.372l.24.75h.545l-1.139-3.559-.012-.036Zm.22,2.388h-1.078l.537-1.673Z"
                        transform="translate(-71.509 -59.448)"
                        fill="#fff"
                      />
                      <path
                        id="svg_148"
                        d="M168.9,136.171a1.166,1.166,0,0,1-.16.7.664.664,0,0,1-.546.2.654.654,0,0,1-.543-.2,1.175,1.175,0,0,1-.157-.7v-1.5H167v1.608a1.779,1.779,0,0,0,.062.488,1.064,1.064,0,0,0,.171.36.9.9,0,0,0,.264.234,1.141,1.141,0,0,0,.325.128,1.83,1.83,0,0,0,.729,0,1.11,1.11,0,0,0,.324-.128.907.907,0,0,0,.264-.234,1.047,1.047,0,0,0,.171-.36,1.758,1.758,0,0,0,.063-.488V134.67H168.9Z"
                        transform="translate(-74.212 -60.07)"
                        fill="#fff"
                      />
                      <path
                        id="svg_149"
                        d="M178.22,134.144a.846.846,0,0,0-.395-.211,2.4,2.4,0,0,0-.6-.062h-.564v-1.035h-.486v3.823h.486v-2.336h.607a1.493,1.493,0,0,1,.373.039.416.416,0,0,1,.324.3,1.082,1.082,0,0,1,.032.291v1.7h.486v-1.643a1.906,1.906,0,0,0-.057-.51.809.809,0,0,0-.207-.362"
                        transform="translate(-78.213 -59.271)"
                        fill="#fff"
                      />
                      <path
                        id="svg_150"
                        d="M183.806,134.96h0a1,1,0,0,0-.278-.229,1.2,1.2,0,0,0-.332-.128,1.75,1.75,0,0,0-.718,0,1.148,1.148,0,0,0-.33.128.965.965,0,0,0-.276.229,1.05,1.05,0,0,0-.183.357,1.6,1.6,0,0,0-.069.49v.425a1.6,1.6,0,0,0,.069.489,1.061,1.061,0,0,0,.183.359.985.985,0,0,0,.275.232,1.184,1.184,0,0,0,.33.129,1.676,1.676,0,0,0,.36.037,1.7,1.7,0,0,0,.361-.037,1.171,1.171,0,0,0,.331-.129.99.99,0,0,0,.278-.232,1.054,1.054,0,0,0,.184-.359,1.617,1.617,0,0,0,.069-.489v-.425a1.62,1.62,0,0,0-.069-.49,1.058,1.058,0,0,0-.185-.357m-.233.953v.214a1.069,1.069,0,0,1-.179.7.7.7,0,0,1-.558.2.692.692,0,0,1-.553-.2,1.083,1.083,0,0,1-.176-.7v-.214a1.069,1.069,0,0,1,.176-.693.693.693,0,0,1,.553-.2.7.7,0,0,1,.559.2,1.06,1.06,0,0,1,.178.693"
                        transform="translate(-80.588 -60.024)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_151"
                        width="0.486"
                        height="2.789"
                        transform="translate(106.217 74.6)"
                        fill="#fff"
                      />
                      <path
                        id="svg_152"
                        d="M193.915,133.242h-.487v.806h-.447v.453h.447v2.336h.487V134.5h.463v-.453h-.463Z"
                        transform="translate(-85.544 -59.447)"
                        fill="#fff"
                      />
                      <path
                        id="svg_153"
                        d="M198.5,134.67l-.847,2.242-.832-2.208-.013-.034h-.518l1,2.649a.3.3,0,0,0,.148.162l-.387,1.013h.516l1.452-3.824Z"
                        transform="translate(-86.986 -60.07)"
                        fill="#fff"
                      />
                      <path
                        id="svg_154"
                        d="M187.367,137.46h.486v-2.336h.777v-.453h-1.263Z"
                        transform="translate(-83.095 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_155"
                        d="M101.837,137.46h.486v-2.336h.777v-.453h-1.263Z"
                        transform="translate(-45.785 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_156"
                        d="M92.769,137.46h.485v-2.336h.777v-.453H92.769Z"
                        transform="translate(-41.829 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_157"
                        d="M173.325,133.242h-.485v.806h-.448v.453h.448v2.336h.485V134.5h.464v-.453h-.464Z"
                        transform="translate(-76.562 -59.447)"
                        fill="#fff"
                      />
                      <path
                        id="svg_158"
                        d="M84.664,133.242h-.487v.806H83.73v.453h.447v2.336h.487V134.5h.463v-.453h-.463Z"
                        transform="translate(-37.887 -59.447)"
                        fill="#fff"
                      />
                      <path
                        id="svg_159"
                        d="M80.352,134.947a.872.872,0,0,0-.4-.212,2.371,2.371,0,0,0-.6-.063H78.311v2.788H78.8v-2.336H79.4a1.493,1.493,0,0,1,.373.039.422.422,0,0,1,.325.3,1.158,1.158,0,0,1,.031.292v1.7h.487v-1.643a1.881,1.881,0,0,0-.059-.51.812.812,0,0,0-.208-.36"
                        transform="translate(-35.523 -60.071)"
                        fill="#fff"
                      />
                      <path
                        id="svg_160"
                        d="M105.743,133.352a.209.209,0,0,0-.1-.092.405.405,0,0,0-.307,0,.2.2,0,0,0-.1.089.41.41,0,0,0-.034.086.322.322,0,0,0-.009.075.356.356,0,0,0,.01.079.365.365,0,0,0,.033.082.205.205,0,0,0,.1.091h0a.4.4,0,0,0,.307,0,.207.207,0,0,0,.1-.088.363.363,0,0,0,.034-.087.33.33,0,0,0,0-.153.325.325,0,0,0-.033-.083"
                        transform="translate(-47.25 -59.442)"
                        fill="#fff"
                      />
                      <path
                        id="svg_161"
                        d="M54.925,133.35a.215.215,0,0,0-.1-.09.4.4,0,0,0-.307,0,.215.215,0,0,0-.1.09.354.354,0,0,0-.032.082.281.281,0,0,0-.01.077.336.336,0,0,0,.008.078.4.4,0,0,0,.034.085.206.206,0,0,0,.1.089.347.347,0,0,0,.154.03.339.339,0,0,0,.152-.03.2.2,0,0,0,.1-.089.387.387,0,0,0,.034-.085.37.37,0,0,0,.008-.078.359.359,0,0,0-.008-.077.438.438,0,0,0-.034-.085"
                        transform="translate(-25.083 -59.442)"
                        fill="#fff"
                      />
                      <path
                        id="svg_162"
                        d="M191.271,133.352a.205.205,0,0,0-.1-.092.407.407,0,0,0-.308,0,.2.2,0,0,0-.1.089.448.448,0,0,0-.035.086.361.361,0,0,0-.009.075.321.321,0,0,0,.043.162.2.2,0,0,0,.1.091h0a.4.4,0,0,0,.306,0,.2.2,0,0,0,.1-.088.364.364,0,0,0,.035-.087.374.374,0,0,0,0-.153.3.3,0,0,0-.034-.083"
                        transform="translate(-84.559 -59.442)"
                        fill="#fff"
                      />
                      <path
                        id="svg_163"
                        d="M66.224,134.955a.8.8,0,0,0-.373-.219,2.128,2.128,0,0,0-.569-.065h-2.6v2.789h.486v-2.336h1.131v2.336h.485v-2.336h.483a1.534,1.534,0,0,1,.373.038.442.442,0,0,1,.214.115.432.432,0,0,1,.107.188,1.108,1.108,0,0,1,.031.292v1.7h.486v-1.643a1.94,1.94,0,0,0-.055-.5.852.852,0,0,0-.194-.357"
                        transform="translate(-28.703 -60.07)"
                        fill="#fff"
                      />
                      <path
                        id="svg_164"
                        d="M12.02,134.955a.8.8,0,0,0-.373-.219,2.136,2.136,0,0,0-.57-.065h-2.6v2.789h.487v-2.336h1.131v2.336h.486v-2.336h.483a1.526,1.526,0,0,1,.373.038.443.443,0,0,1,.214.115.437.437,0,0,1,.106.188,1.127,1.127,0,0,1,.032.292v1.7h.485v-1.643a2.009,2.009,0,0,0-.054-.5.86.86,0,0,0-.194-.357"
                        transform="translate(-5.058 -60.07)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_165"
                        width="0.506"
                        height="4.94"
                        transform="translate(111.529 66.366)"
                        fill="#fff"
                      />
                      <path
                        id="svg_166"
                        d="M187.5,120.067v4.43h-1.182V123.4a3.141,3.141,0,0,0-.082-.784,1.1,1.1,0,0,0-.263-.5.991.991,0,0,0-.444-.261,2.4,2.4,0,0,0-.656-.076h-.832v.51h.863a1.506,1.506,0,0,1,.4.045.647.647,0,0,1,.278.162.669.669,0,0,1,.172.321,2.106,2.106,0,0,1,.054.515V124.5h-.5v-.724a1.437,1.437,0,0,0-.059-.428.907.907,0,0,0-.158-.307.86.86,0,0,0-.238-.2,1.032,1.032,0,0,0-.286-.11,1.559,1.559,0,0,0-.63,0,1.028,1.028,0,0,0-.285.11.835.835,0,0,0-.236.2.916.916,0,0,0-.157.307,1.417,1.417,0,0,0-.059.428v.032a2.361,2.361,0,0,0,.059.552.9.9,0,0,0,.072.141H181.8v-2.589H181.3V124.5h-1.853v-2.589h-.506V124.5H177.2v-1.512a1.423,1.423,0,0,0-.059-.427.894.894,0,0,0-.158-.307.842.842,0,0,0-.238-.2,1,1,0,0,0-.286-.11,1.467,1.467,0,0,0-.315-.033h-.442a1.412,1.412,0,0,0-.291.033,1,1,0,0,0-.285.11.815.815,0,0,0-.236.2.9.9,0,0,0-.157.307,1.426,1.426,0,0,0-.059.427v.948a1.42,1.42,0,0,0,.059.427.941.941,0,0,0,.157.309.827.827,0,0,0,.236.2,1.026,1.026,0,0,0,.285.112,1.473,1.473,0,0,0,.315.028h12.283v-4.94H187.5ZM176.7,124.5h-.969a.514.514,0,0,1-.412-.154.784.784,0,0,1-.13-.508v-.758a.775.775,0,0,1,.13-.506.487.487,0,0,1,.388-.153h.443a.522.522,0,0,1,.416.153.768.768,0,0,1,.133.506v1.42Zm8.109,0h-.55a.533.533,0,0,1-.412-.153.619.619,0,0,1-.131-.35c0-.026,0-.178,0-.2a.7.7,0,0,1,.129-.43.515.515,0,0,1,.412-.153.525.525,0,0,1,.417.153.772.772,0,0,1,.132.507v.629Z"
                        transform="translate(-77.559 -53.7)"
                        fill="#fff"
                      />
                      <path
                        id="svg_167"
                        d="M182.717,121.6h.057v-.352h-.415a.2.2,0,0,1-.108-.213c.024-.117.161-.188.367-.188h.2V120.5h-.253c-.444,0-.673.173-.682.518a.72.72,0,0,0,.044.236h-.307v.352h1.092Z"
                        transform="translate(-80.59 -53.888)"
                        fill="#fff"
                      />
                      <path
                        id="svg_168"
                        d="M187.327,130.362a.415.415,0,0,0,.175.034.4.4,0,0,0,.175-.034.209.209,0,0,0,.1-.087.373.373,0,0,0,.048-.184.39.39,0,0,0-.01-.086.454.454,0,0,0-.038-.1.2.2,0,0,0-.1-.088.469.469,0,0,0-.35,0,.206.206,0,0,0-.1.088.566.566,0,0,0-.038.1.391.391,0,0,0,0,.173.6.6,0,0,0,.038.1.211.211,0,0,0,.1.087"
                        transform="translate(-83.013 -57.94)"
                        fill="#fff"
                      />
                      <path
                        id="svg_169"
                        d="M185.916,130.362a.207.207,0,0,0,.1-.087.464.464,0,0,0,.038-.1.407.407,0,0,0,.01-.086.391.391,0,0,0-.01-.086.531.531,0,0,0-.038-.1.2.2,0,0,0-.1-.088.467.467,0,0,0-.349,0,.2.2,0,0,0-.1.088.454.454,0,0,0-.038.1.391.391,0,0,0-.01.086.4.4,0,0,0,.01.086.476.476,0,0,0,.038.1.205.205,0,0,0,.1.087.46.46,0,0,0,.349,0"
                        transform="translate(-82.245 -57.94)"
                        fill="#fff"
                      />
                      <path
                        id="svg_170"
                        d="M177.276,121.782a.207.207,0,0,0,.1.089.411.411,0,0,0,.175.034.415.415,0,0,0,.175-.034.207.207,0,0,0,.1-.089.4.4,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.454.454,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.418.418,0,0,0-.038.1.387.387,0,0,0-.01.085.392.392,0,0,0,.01.087.437.437,0,0,0,.038.1"
                        transform="translate(-78.672 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_171"
                        d="M175.517,121.782a.21.21,0,0,0,.1.089.469.469,0,0,0,.35,0,.2.2,0,0,0,.1-.089.376.376,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.426.426,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.447.447,0,0,0-.038.1.388.388,0,0,0-.01.085.393.393,0,0,0,.01.087.436.436,0,0,0,.038.1"
                        transform="translate(-77.905 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_172"
                        d="M124.116,120.067v4.43h-1.33v-4.43h-.507v4.43h-1.043v-1.511a1.426,1.426,0,0,0-.059-.428.9.9,0,0,0-.158-.307.83.83,0,0,0-.238-.2,1.017,1.017,0,0,0-.286-.111,1.469,1.469,0,0,0-.315-.033h-.443a1.453,1.453,0,0,0-.292.033,1,1,0,0,0-.285.111.815.815,0,0,0-.236.2.918.918,0,0,0-.157.307,1.408,1.408,0,0,0-.055.4h0v.008c0,.008,0,.014,0,.022v.316a1.541,1.541,0,0,1-.224.908.941.941,0,0,1-.78.287h-.6v-2.589H116.6V124.5h-2.15v-2.589h-.507V124.5h-.472a.942.942,0,0,1-.779-.287,1.6,1.6,0,0,1-.228-.976v-1.05h-.5v1.05a1.6,1.6,0,0,1-.228.976.941.941,0,0,1-.779.287h-.474V122.18h-.506V124.5h-2.319v-4.43h-.506v4.94h3.806a2.186,2.186,0,0,0,.469-.047,1.391,1.391,0,0,0,.412-.162,1.151,1.151,0,0,0,.331-.293c.017-.021.03-.051.045-.076.016.024.029.054.046.076a1.144,1.144,0,0,0,.331.293,1.4,1.4,0,0,0,.412.162,2.231,2.231,0,0,0,.416.042v.005H117.7a2.188,2.188,0,0,0,.47-.047,1.387,1.387,0,0,0,.411-.162,1.127,1.127,0,0,0,.28-.247.964.964,0,0,0,.06.118.814.814,0,0,0,.236.2,1.008,1.008,0,0,0,.285.112,1.51,1.51,0,0,0,.315.028h4.863v-4.94h-.507Zm-3.387,4.434h-.969a.515.515,0,0,1-.412-.153.79.79,0,0,1-.131-.509v-.758a.779.779,0,0,1,.131-.506.487.487,0,0,1,.388-.152h.443a.52.52,0,0,1,.416.152.77.77,0,0,1,.132.506v1.42Z"
                        transform="translate(-48.104 -53.7)"
                        fill="#fff"
                      />
                      <path
                        id="svg_173"
                        d="M105.987,118.49l.493-.374a.718.718,0,0,0,.524.229.869.869,0,0,0,.582-.24v.406a.88.88,0,0,1-.6.213.677.677,0,0,1-.5-.179l-.288.212Z"
                        transform="translate(-47.595 -52.844)"
                        fill="#fff"
                      />
                      <path
                        id="svg_174"
                        d="M100.719,125.921H97.31a.941.941,0,0,1-.779-.288,1.6,1.6,0,0,1-.228-.976v-.582h-.5v.771a2.247,2.247,0,0,0,.08.628,1.353,1.353,0,0,0,.216.456,1.143,1.143,0,0,0,.331.292,1.38,1.38,0,0,0,.411.162,2.191,2.191,0,0,0,.416.042v.005h3.97v-3.1h-.507Z"
                        transform="translate(-43.153 -55.125)"
                        fill="#fff"
                      />
                      <path
                        id="svg_175"
                        d="M116.571,121.416a.424.424,0,0,0-.038.1.391.391,0,0,0-.01.085.4.4,0,0,0,.01.087.455.455,0,0,0,.038.1.208.208,0,0,0,.1.089.476.476,0,0,0,.35,0,.208.208,0,0,0,.1-.089.392.392,0,0,0,.038-.1.407.407,0,0,0,.01-.087.384.384,0,0,0-.01-.085.434.434,0,0,0-.038-.1.206.206,0,0,0-.1-.088.469.469,0,0,0-.35,0,.212.212,0,0,0-.1.088"
                        transform="translate(-52.191 -54.235)"
                        fill="#fff"
                      />
                      <path
                        id="svg_176"
                        d="M123.841,121.782a.21.21,0,0,0,.1.089.469.469,0,0,0,.35,0,.2.2,0,0,0,.1-.089.4.4,0,0,0,.038-.1.4.4,0,0,0,.01-.087.381.381,0,0,0-.01-.085.459.459,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.451.451,0,0,0-.038.1.389.389,0,0,0-.01.085.394.394,0,0,0,.01.087.439.439,0,0,0,.038.1"
                        transform="translate(-55.363 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_177"
                        d="M115.826,120.394a.2.2,0,0,0,.1.089.469.469,0,0,0,.35,0,.2.2,0,0,0,.1-.089.379.379,0,0,0,.038-.1.4.4,0,0,0,.01-.087.351.351,0,0,0-.01-.085.434.434,0,0,0-.038-.1.2.2,0,0,0-.1-.089.476.476,0,0,0-.35,0,.2.2,0,0,0-.1.089.431.431,0,0,0-.038.1.388.388,0,0,0-.01.085.4.4,0,0,0,.01.087.433.433,0,0,0,.038.1"
                        transform="translate(-51.866 -53.631)"
                        fill="#fff"
                      />
                      <path
                        id="svg_178"
                        d="M114.812,121.782a.2.2,0,0,0,.1.089.467.467,0,0,0,.349,0,.2.2,0,0,0,.1-.089.379.379,0,0,0,.038-.1.363.363,0,0,0,.01-.087.349.349,0,0,0-.01-.085.429.429,0,0,0-.038-.1.2.2,0,0,0-.1-.089.474.474,0,0,0-.349,0,.2.2,0,0,0-.1.089.42.42,0,0,0-.038.1.356.356,0,0,0-.01.085.361.361,0,0,0,.01.087.387.387,0,0,0,.038.1"
                        transform="translate(-51.424 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_179"
                        d="M100.971,121.782a.208.208,0,0,0,.1.089.469.469,0,0,0,.35,0,.207.207,0,0,0,.1-.089.375.375,0,0,0,.038-.1.363.363,0,0,0,.01-.087.348.348,0,0,0-.01-.085.424.424,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.418.418,0,0,0-.038.1.386.386,0,0,0-.01.085.39.39,0,0,0,.01.087.409.409,0,0,0,.038.1"
                        transform="translate(-45.386 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_180"
                        d="M99.212,121.782a.21.21,0,0,0,.1.089.469.469,0,0,0,.35,0,.2.2,0,0,0,.1-.089.377.377,0,0,0,.038-.1.4.4,0,0,0,.01-.087.379.379,0,0,0-.01-.085.428.428,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.445.445,0,0,0-.038.1.386.386,0,0,0-.01.085.39.39,0,0,0,.01.087.434.434,0,0,0,.038.1"
                        transform="translate(-44.619 -54.236)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_181"
                        width="0.507"
                        height="4.94"
                        transform="translate(49.819 66.366)"
                        fill="#fff"
                      />
                      <path
                        id="svg_182"
                        d="M77.481,120.067v4.43H76.3v-1.312a1.3,1.3,0,0,0-.77-1.116,2.132,2.132,0,0,0-2.127.321v-.478H72.9V124.5H71.737a3.42,3.42,0,0,1-.854-.1,2.367,2.367,0,0,0,.9-1.4.958.958,0,0,0-.929-1.063,4.14,4.14,0,0,0-1.536.151l-.127.037-.042.127a1.99,1.99,0,0,0,.321,1.8,2.036,2.036,0,0,0,.4.415.7.7,0,0,1-.2.031H67.632v-2.589h-.507V124.5H65.217v-2.57H64.71v2.541a2.494,2.494,0,0,1-.048.535.8.8,0,0,1-.153.341.645.645,0,0,1-.244.184,1.194,1.194,0,0,1-.343.076v.56a2.175,2.175,0,0,0,.4-.061,1.3,1.3,0,0,0,.351-.157.957.957,0,0,0,.287-.28,1.416,1.416,0,0,0,.187-.446c.017-.065.026-.139.038-.211h4.48a1.462,1.462,0,0,0,.731-.232,3.519,3.519,0,0,0,1.341.232h6.251v-4.94h-.507Zm-7.121,4.122a1.543,1.543,0,0,1-.484-.435,1.455,1.455,0,0,1-.285-1.213,3.452,3.452,0,0,1,1.181-.1c.474.073.517.316.5.52a1.994,1.994,0,0,1-.913,1.228m5.436.307H73.4V123.01a1.934,1.934,0,0,1,1.91-.483.793.793,0,0,1,.481.657Z"
                        transform="translate(-29.246 -53.7)"
                        fill="#fff"
                      />
                      <path
                        id="svg_183"
                        d="M74.707,121.782a.207.207,0,0,0,.1.089.466.466,0,0,0,.348,0,.2.2,0,0,0,.1-.089.4.4,0,0,0,.038-.1.362.362,0,0,0,.01-.087.348.348,0,0,0-.01-.085.429.429,0,0,0-.038-.1.2.2,0,0,0-.1-.089.472.472,0,0,0-.348,0,.2.2,0,0,0-.1.089.419.419,0,0,0-.038.1.356.356,0,0,0-.01.085.36.36,0,0,0,.01.087.41.41,0,0,0,.038.1"
                        transform="translate(-33.93 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_184"
                        d="M61.458,121.782a.21.21,0,0,0,.1.089.409.409,0,0,0,.174.034.415.415,0,0,0,.175-.034.207.207,0,0,0,.1-.089.425.425,0,0,0,.038-.1.4.4,0,0,0,.01-.087.379.379,0,0,0-.01-.085.458.458,0,0,0-.038-.1.2.2,0,0,0-.1-.089.406.406,0,0,0-.175-.033.4.4,0,0,0-.174.033.2.2,0,0,0-.1.089.417.417,0,0,0-.038.1.386.386,0,0,0-.01.085.39.39,0,0,0,.01.087.408.408,0,0,0,.038.1"
                        transform="translate(-28.15 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_185"
                        d="M59.7,121.782a.21.21,0,0,0,.1.089.467.467,0,0,0,.349,0,.2.2,0,0,0,.1-.089.4.4,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.427.427,0,0,0-.038-.1.2.2,0,0,0-.1-.089.474.474,0,0,0-.349,0,.2.2,0,0,0-.1.089.447.447,0,0,0-.038.1.386.386,0,0,0-.01.085.391.391,0,0,0,.01.087.436.436,0,0,0,.038.1"
                        transform="translate(-27.383 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_186"
                        d="M70.509,130.362a.411.411,0,0,0,.175.034.4.4,0,0,0,.174-.034.2.2,0,0,0,.1-.087.385.385,0,0,0,.038-.1.372.372,0,0,0,.01-.086.358.358,0,0,0-.01-.086.4.4,0,0,0-.038-.1.2.2,0,0,0-.1-.088.466.466,0,0,0-.348,0,.2.2,0,0,0-.1.088.485.485,0,0,0-.038.1.371.371,0,0,0,0,.173.472.472,0,0,0,.038.1.206.206,0,0,0,.1.087"
                        transform="translate(-32.055 -57.94)"
                        fill="#fff"
                      />
                      <path
                        id="svg_187"
                        d="M69.2,129.908a.2.2,0,0,0-.1-.087.409.409,0,0,0-.174-.034.4.4,0,0,0-.175.034.205.205,0,0,0-.1.087.477.477,0,0,0-.038.1.4.4,0,0,0-.01.086.408.408,0,0,0,.01.087.483.483,0,0,0,.038.1.207.207,0,0,0,.1.088.474.474,0,0,0,.349,0,.2.2,0,0,0,.1-.088.357.357,0,0,0,.048-.184.392.392,0,0,0-.01-.086.434.434,0,0,0-.038-.1"
                        transform="translate(-31.288 -57.94)"
                        fill="#fff"
                      />
                      <path
                        id="svg_188"
                        d="M59.312,126.294a.991.991,0,0,0,.285.112,1.477,1.477,0,0,0,.315.029h1.475v-2.022a1.43,1.43,0,0,0-.059-.428.907.907,0,0,0-.158-.307.831.831,0,0,0-.238-.2,1,1,0,0,0-.285-.111,1.474,1.474,0,0,0-.315-.032h-.443a1.448,1.448,0,0,0-.291.032.989.989,0,0,0-.285.111.821.821,0,0,0-.236.2.906.906,0,0,0-.157.307,1.412,1.412,0,0,0-.059.428v.948a1.405,1.405,0,0,0,.059.427.923.923,0,0,0,.157.308.837.837,0,0,0,.236.2m.056-1.786A.771.771,0,0,1,59.5,124a.488.488,0,0,1,.389-.153h.443a.521.521,0,0,1,.416.153.762.762,0,0,1,.133.506v1.421h-.969a.514.514,0,0,1-.413-.154.782.782,0,0,1-.131-.507Z"
                        transform="translate(-27.038 -55.127)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_189"
                        width="0.506"
                        height="4.94"
                        transform="translate(94.377 66.366)"
                        fill="#fff"
                      />
                      <path
                        id="svg_190"
                        d="M145.857,121.782a.21.21,0,0,0,.1.089.469.469,0,0,0,.35,0,.208.208,0,0,0,.1-.089.4.4,0,0,0,.038-.1.393.393,0,0,0,.01-.087.377.377,0,0,0-.01-.085.459.459,0,0,0-.038-.1.2.2,0,0,0-.1-.089.475.475,0,0,0-.35,0,.2.2,0,0,0-.1.089.44.44,0,0,0-.038.1.388.388,0,0,0-.01.085.393.393,0,0,0,.01.087.407.407,0,0,0,.038.1"
                        transform="translate(-64.966 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_191"
                        d="M144.1,121.782a.207.207,0,0,0,.1.089.467.467,0,0,0,.349,0,.205.205,0,0,0,.1-.089.376.376,0,0,0,.038-.1.393.393,0,0,0,.01-.087.377.377,0,0,0-.01-.085.427.427,0,0,0-.038-.1.2.2,0,0,0-.1-.089.474.474,0,0,0-.349,0,.2.2,0,0,0-.1.089.452.452,0,0,0-.039.1.388.388,0,0,0-.01.085.393.393,0,0,0,.01.087.44.44,0,0,0,.039.1"
                        transform="translate(-64.199 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_192"
                        d="M162.7,120.067v4.43H161.57v0a3.94,3.94,0,0,1-.825-.08,2.453,2.453,0,0,0,.868-1.468c.019-.257-.032-.869-.929-1.008a4.216,4.216,0,0,0-1.536.15l-.127.037-.042.127a2.122,2.122,0,0,0,.277,1.819,1.863,1.863,0,0,0,.393.406.685.685,0,0,1-.151.018h-1.854v-4.43h-.507v4.94H159.5a1.557,1.557,0,0,0,.721-.213,3.809,3.809,0,0,0,1.283.214h1.706v-4.94H162.7Zm-2.517,4.152a1.457,1.457,0,0,1-.518-.443,1.641,1.641,0,0,1-.242-1.232,3.412,3.412,0,0,1,1.181-.1c.531.082.51.351.5.465a2.189,2.189,0,0,1-.924,1.309"
                        transform="translate(-69.907 -53.7)"
                        fill="#fff"
                      />
                      <path
                        id="svg_193"
                        d="M150.107,126.434v-2.022a1.414,1.414,0,0,0-.059-.428.908.908,0,0,0-.158-.307.846.846,0,0,0-.238-.2,1,1,0,0,0-.286-.111,1.471,1.471,0,0,0-.315-.032h-.442a1.45,1.45,0,0,0-.291.032.992.992,0,0,0-.285.111.819.819,0,0,0-.236.2.907.907,0,0,0-.157.307,1.436,1.436,0,0,0-.055.4h-.007v.278a1.6,1.6,0,0,1-.228.976.937.937,0,0,1-.779.288h-.786v-1.513a1.431,1.431,0,0,0-.059-.428.9.9,0,0,0-.158-.307.836.836,0,0,0-.238-.2,1,1,0,0,0-.286-.111,1.466,1.466,0,0,0-.314-.032h-.442a1.455,1.455,0,0,0-.292.032,1,1,0,0,0-.285.111.811.811,0,0,0-.236.2.9.9,0,0,0-.157.307,1.432,1.432,0,0,0-.059.428v.948a1.414,1.414,0,0,0,.059.427.906.906,0,0,0,.157.308.82.82,0,0,0,.236.2,1,1,0,0,0,.285.112,1.477,1.477,0,0,0,.315.029h2.261a2.161,2.161,0,0,0,.47-.047,1.381,1.381,0,0,0,.411-.162,1.148,1.148,0,0,0,.284-.25.842.842,0,0,0,.062.121.827.827,0,0,0,.236.2.992.992,0,0,0,.285.112,1.467,1.467,0,0,0,.314.029h1.477Zm-6.211-.66a.782.782,0,0,1-.131-.507v-.759A.774.774,0,0,1,143.9,124a.49.49,0,0,1,.389-.153h.443a.522.522,0,0,1,.417.153.771.771,0,0,1,.132.506v1.421h-.968a.514.514,0,0,1-.412-.154m4.324,0a.781.781,0,0,1-.131-.507v-.759a.774.774,0,0,1,.131-.506.489.489,0,0,1,.388-.153h.443a.522.522,0,0,1,.417.153.767.767,0,0,1,.133.506v1.421h-.969a.513.513,0,0,1-.412-.154"
                        transform="translate(-63.853 -55.127)"
                        fill="#fff"
                      />
                      <rect
                        id="svg_194"
                        width="0.507"
                        height="4.94"
                        transform="translate(25.485 66.366)"
                        fill="#fff"
                      />
                      <path
                        id="svg_195"
                        d="M15.3,124.5h-.472a.941.941,0,0,1-.779-.287,1.6,1.6,0,0,1-.228-.976V122.18h-.5v1.053a1.6,1.6,0,0,1-.228.976.942.942,0,0,1-.779.287h-.474V122.18H11.33V124.5H9.944v-1.319a1.3,1.3,0,0,0-.771-1.116,2.131,2.131,0,0,0-2.127.32v-2.315H6.53v4.43H5.17v-1.513a1.406,1.406,0,0,0-.06-.427.891.891,0,0,0-.158-.307.842.842,0,0,0-.238-.2,1,1,0,0,0-.286-.11,1.468,1.468,0,0,0-.315-.033H3.671a1.409,1.409,0,0,0-.291.033,1.012,1.012,0,0,0-.285.11.822.822,0,0,0-.236.2.9.9,0,0,0-.157.307,1.406,1.406,0,0,0-.059.427v.948a1.4,1.4,0,0,0,.059.427.941.941,0,0,0,.157.309.834.834,0,0,0,.236.2,1.036,1.036,0,0,0,.285.112,1.469,1.469,0,0,0,.314.028h8.616a2.2,2.2,0,0,0,.47-.047,1.38,1.38,0,0,0,.411-.162,1.143,1.143,0,0,0,.331-.292c.017-.022.03-.052.046-.076.016.024.028.054.045.076a1.158,1.158,0,0,0,.331.292,1.387,1.387,0,0,0,.412.162,2.182,2.182,0,0,0,.416.042v.005H15.8v-3.1H15.3V124.5Zm-10.634,0H3.7a.514.514,0,0,1-.412-.154.783.783,0,0,1-.131-.508v-.758a.775.775,0,0,1,.131-.506.487.487,0,0,1,.388-.153h.444a.522.522,0,0,1,.416.153.769.769,0,0,1,.132.506Zm4.775,0H7.046V123a1.935,1.935,0,0,1,1.911-.483.794.794,0,0,1,.481.657Z"
                        transform="translate(-2.515 -53.7)"
                        fill="#fff"
                      />
                      <path
                        id="svg_196"
                        d="M5.243,121.782a.21.21,0,0,0,.1.089.409.409,0,0,0,.174.034.415.415,0,0,0,.175-.034.207.207,0,0,0,.1-.089.425.425,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.458.458,0,0,0-.038-.1.2.2,0,0,0-.1-.089.406.406,0,0,0-.175-.033.4.4,0,0,0-.174.033.2.2,0,0,0-.1.089.418.418,0,0,0-.038.1.386.386,0,0,0-.01.085.391.391,0,0,0,.01.087.409.409,0,0,0,.038.1"
                        transform="translate(-3.628 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_197"
                        d="M3.484,121.782a.21.21,0,0,0,.1.089.467.467,0,0,0,.349,0,.2.2,0,0,0,.1-.089.4.4,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.429.429,0,0,0-.038-.1.2.2,0,0,0-.1-.089.474.474,0,0,0-.349,0,.2.2,0,0,0-.1.089.446.446,0,0,0-.038.1.386.386,0,0,0-.01.085.391.391,0,0,0,.01.087.387.387,0,0,0,.038.1"
                        transform="translate(-2.861 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_198"
                        d="M35.241,121.782a.212.212,0,0,0,.1.089.466.466,0,0,0,.348,0,.2.2,0,0,0,.1-.089.4.4,0,0,0,.038-.1.363.363,0,0,0,.01-.087.348.348,0,0,0-.01-.085.429.429,0,0,0-.038-.1.2.2,0,0,0-.1-.089.472.472,0,0,0-.348,0,.205.205,0,0,0-.1.089.442.442,0,0,0-.038.1.356.356,0,0,0-.01.085.36.36,0,0,0,.01.087.46.46,0,0,0,.038.1"
                        transform="translate(-16.714 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_199"
                        d="M33.482,121.782a.21.21,0,0,0,.1.089.409.409,0,0,0,.174.034.415.415,0,0,0,.175-.034.207.207,0,0,0,.1-.089.424.424,0,0,0,.038-.1.394.394,0,0,0,.01-.087.378.378,0,0,0-.01-.085.457.457,0,0,0-.038-.1.2.2,0,0,0-.1-.089.406.406,0,0,0-.175-.033.4.4,0,0,0-.174.033.2.2,0,0,0-.1.089.419.419,0,0,0-.038.1.387.387,0,0,0-.01.085.391.391,0,0,0,.01.087.366.366,0,0,0,.038.1"
                        transform="translate(-15.947 -54.236)"
                        fill="#fff"
                      />
                      <path
                        id="svg_200"
                        d="M52.779,126.434v-2.022a1.433,1.433,0,0,0-.059-.428.907.907,0,0,0-.158-.307.846.846,0,0,0-.238-.2,1,1,0,0,0-.286-.111,1.472,1.472,0,0,0-.315-.032h-.442a1.455,1.455,0,0,0-.291.032,1,1,0,0,0-.285.111.811.811,0,0,0-.236.2.907.907,0,0,0-.157.307,1.414,1.414,0,0,0-.06.428v.948a1.4,1.4,0,0,0,.06.427.916.916,0,0,0,.157.308.819.819,0,0,0,.236.2,1,1,0,0,0,.285.112,1.474,1.474,0,0,0,.314.029h.95c0,.728-.413.79-.768.79h-.542v.559h.542a1.177,1.177,0,0,0,1.294-1.35m-.506-1.647v1.141H51.3a.513.513,0,0,1-.413-.154.781.781,0,0,1-.131-.507v-.759a.774.774,0,0,1,.131-.506.491.491,0,0,1,.389-.153h.443a.524.524,0,0,1,.417.153.771.771,0,0,1,.132.506Z"
                        transform="translate(-23.283 -55.127)"
                        fill="#fff"
                      />
                      <path
                        id="svg_201"
                        d="M37.306,120.067v4.43H36.089v-1.511a1.426,1.426,0,0,0-.059-.428.9.9,0,0,0-.158-.307.84.84,0,0,0-.238-.2,1.007,1.007,0,0,0-.286-.111,1.469,1.469,0,0,0-.315-.033H34.59a1.447,1.447,0,0,0-.291.033,1,1,0,0,0-.285.111.815.815,0,0,0-.236.2.909.909,0,0,0-.157.307,1.407,1.407,0,0,0-.055.4h0v.008c0,.008,0,.014,0,.022v.316a1.54,1.54,0,0,1-.225.908.941.941,0,0,1-.779.287h-.6v-2.589h-.507V124.5H30.134v-1.511a1.407,1.407,0,0,0-.06-.428.9.9,0,0,0-.158-.307.838.838,0,0,0-.238-.2,1.013,1.013,0,0,0-.286-.111,1.469,1.469,0,0,0-.315-.033h-.443a1.448,1.448,0,0,0-.291.033,1.01,1.01,0,0,0-.285.111.823.823,0,0,0-.236.2.909.909,0,0,0-.157.307,1.407,1.407,0,0,0-.059.428v.947a1.4,1.4,0,0,0,.059.427.925.925,0,0,0,.157.308.82.82,0,0,0,.236.2,1.014,1.014,0,0,0,.285.112,1.517,1.517,0,0,0,.315.028h.949c0,.728-.413.79-.767.79H28.3v.559h.542a1.177,1.177,0,0,0,1.294-1.35h2.424a2.2,2.2,0,0,0,.47-.047,1.389,1.389,0,0,0,.411-.162,1.126,1.126,0,0,0,.28-.247.956.956,0,0,0,.06.118.814.814,0,0,0,.236.2,1.009,1.009,0,0,0,.285.112,1.5,1.5,0,0,0,.314.028h3.2v-4.94h-.506Zm-7.68,3.294v1.14h-.969a.517.517,0,0,1-.413-.153.786.786,0,0,1-.131-.509v-.758a.776.776,0,0,1,.131-.506.489.489,0,0,1,.389-.152h.443a.522.522,0,0,1,.417.152.773.773,0,0,1,.132.506Zm5.956,1.14h-.969a.515.515,0,0,1-.412-.153.786.786,0,0,1-.131-.509v-.758a.776.776,0,0,1,.131-.506.487.487,0,0,1,.388-.152h.443a.523.523,0,0,1,.417.152.77.77,0,0,1,.132.506Z"
                        transform="translate(-13.404 -53.7)"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div class="d-flex justify-content-between">
                <div>
                  <h1 style="margin-top: 400px; color: #165163">
                    نتائج دراسة الجدوى
                  </h1>
                </div>
                <div>
                  <img
                    style="
                      margin-top: -100px;
                      z-index: 9999999999999999999;
                      position: relative;
                    "
                    src="../../public/images/bigLogo.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div class="d-flex justify-content-between">
                <h3>قائمة الملاك</h3>
                <h3>{{ owners.length }}</h3>
              </div>
              <table class="table">
                <thead>
                  <th>الاسم</th>
                  <th>الحصة</th>
                </thead>
                <tbody>
                  <tr v-for="(owner, index) in owners" :key="index">
                    <td>{{ owner.name }}</td>
                    <td>{{ owner.percentage }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="page-break"></div>
              <div class="py-4">
                <h1 class="text-center">
                  {{ marketInfo.name }}<br />حجم تداول سنوي{{
                    marketInfo.tradingVolume
                  }}
                </h1>
                <div class="mt-4">
                  <h3>نبذة عن السوق</h3>
                  <p>{{ marketInfo.description }}</p>
                  <h3>المنتجات او الخدمات المقدمة</h3>
                  <p>{{ marketInfo.briefOfYourProducts }}</p>
                  <h3>الشريحة المستهدفة</h3>
                  <p>{{ marketInfo.briefOfTargetAudience }}</p>
                  <h3>اعتماد السوق والموردون</h3>
                  <p>{{ marketInfo.briefOfVendors }}</p>
                  <h3>من الخطط التسويقية</h3>
                  <p>{{ marketInfo.briefOfYourMarketingPlans }}</p>
                  <h3>المنافسة</h3>
                  <p>{{ marketInfo.competitionAnalysis }}</p>
                </div>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <div class="d-flex justify-content-between">
                  <h1>المنافسون في السوق</h1>
                  <h1>{{ marketInfo.competitors.length }}</h1>
                </div>
                <table class="table">
                  <thead>
                    <th>اسم المنافس</th>
                    <th>الحصة السوقية</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(competitor, index) in marketInfo.competitors"
                      :key="index"
                    >
                      <td>{{ competitor.name }}</td>
                      <td>{{ competitor.share }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <h1 class="text-center">تحليل SWOT</h1>
                <div class="mt-4">
                  <h1>نقاط القوة</h1>
                  <p>{{ strengthPoints }}</p>
                  <h1>نقاط الضعف</h1>
                  <p>{{ weaknessPoints }}</p>
                  <h1>الفرص المتاحة</h1>
                  <p>{{ opportunities }}</p>
                  <h1>التهديدات المتوقعة</h1>
                  <p>{{ threats }}</p>
                </div>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <div class="d-flex justify-content-between">
                  <h1>تكاليف التاسيس والانشاء</h1>
                  <h1>
                    {{ `${setupCostsComputed} ${accountingOptions.currency}` }}
                  </h1>
                </div>
                <table class="table w-100">
                  <thead>
                    <th>نوع التكلفة<br />(العمر الافتراضي)</th>
                    <th>القيمة<br />(% الاستهلاك السنوي)</th>
                  </thead>
                  <tbody>
                    <tr v-for="(setupCost, index) in setupCosts" :key="index">
                      <td>{{ setupCost.lifeSpan }}</td>
                      <td>{{ setupCost.consumptionRatio }}</td>
                    </tr>
                    <h4 v-if="setupCosts.length === 0">
                      لايوجد بيانات حتى الان
                    </h4>
                  </tbody>
                </table>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <div class="d-flex justify-content-between">
                  <h1>الموظفين</h1>
                  <h1>{{ salaries }}</h1>
                </div>
                <div class="mt-4">
                  <table class="table w-100">
                    <thead>
                      <th>العدد X المسمى الوظيفي</th>
                      <th>راتب شهري</th>
                    </thead>
                    <tbody>
                      <tr v-for="(employee, index) in employees" :key="index">
                        <td>
                          {{
                            `${employee.numberOfEmployees} X ${employee.jobTitle}`
                          }}
                        </td>
                        <td>{{ employee.salary }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <div class="d-flex justify-content-between">
                  <h1>المديونيات</h1>
                  <h1>{{ debtsComputed }}</h1>
                </div>
                <div class="mt-4">
                  <table class="table w-100">
                    <thead>
                      <th>
                        الجهة الممولة<br />(الفائدة السنوية - سنوات السداد)
                      </th>
                      <th>القيمة<br />(المديونية)</th>
                    </thead>
                    <tbody>
                      <tr v-for="(debt, index) in debts" :key="index">
                        <td>
                          {{ debt.loaner }}<br />
                          {{ `${debt.APR} - ${debt.loanYears} سنوات` }}
                        </td>
                        <td>
                          {{ debt.cost }}<br />
                          {{ getTotalAPR(debt) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="page-break"></div>
              <div class="py-4">
                <h1 class="text-right">تنويه</h1>
                <p class="text-right">
                  تستعرض هذه الدراسة ننائج المعطيات المدخلة باستخدام الاداة
                  المحاسبية على المنصة الالكترونية للهيئة العامة للمنشآت
                  المتوسطة والصغيرة لمساعدة المهتمين في الحصول على تصور مبدئي عن
                  المشروع، ولا تعد هذه الدراسة شاملة لكافة البيانات اللازمة
                  لتأسيس المشروع التجاري، ويتحمل المستخدم كافة المسؤولية حيال اي
                  ضرر قد يتسبب به سوء الاستخدام او ادخال معطيات غير صحيحة
                </p>
              </div>
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
    totalSales() {
      return this.products.reduce((a, b) => {
        return a + (b.price - b.rawCost);
      }, 0);
    },
    marketShare() {
      return (this.totalSales) / this.marketInfo.tradingVolume;
    },
    reclaimPeriod(){
      let result = (this.personalFinance + this.debtsFinanced) / this.totalSales;
      return  isNaN(result) ? 0 : result;
    },
    profitiblityYears(){
      let totalYearlyCosts = (this.setupCostsComputed + this.salaries + this.monthlyCostsComputed) / this.accountingOptions.feasibilityYears;
      let totalYearlyProfits = this.totalSales / this.accountingOptions.feasibilityYears;
      let resultArr = [];
      for(var i = 1; i <= this.accountingOptions.feasibilityYears; i++){
        resultArr.push({
          costs: totalYearlyCosts,
          profits: totalYearlyProfits
        });
      }
      return resultArr;
    },
    personalFinance: {
      get() {
        let result = this.capital - this.setupCostsComputed;
        if (result > 0) result = 0;
        else result = this.setupCostsComputed - this.capital;
        return result;
      },
    },
    debtsFinanced: {
      get() {
        return this.debts.reduce((a, b) => {
          let annualCash = parseFloat(b.cost) * (parseFloat(b.APR) / 100);
          let result =
            parseFloat(b.cost) +
            parseFloat(annualCash) * parseFloat(b.loanYears);
          console.log(
            `b.cost is: ${b.cost}, annualCash: ${annualCash}, b.loanYears: ${b.loanYears}`
          );
          console.log(parseFloat(annualCash) * parseFloat(b.loanYears));
          return a + result;
        }, 0);
      },
    },
    capital: {
      get() {
        const sum = (a, b) => parseInt(a) + parseInt(b.cost);
        return this.debts.reduce(sum, 0);
      },
    },
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
        return this.totalSales / this.accountingOptions.feasibilityYears;
      },
    },
    formHasMissingInput() {
      return false;
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
        currency: "ريال سعودي",
        vatPercentage: "0",
        feasibilityYears: "2",
        decimals: "tens",
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
        tradingVolume: 1,
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
  mounted() {
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
        name: "",
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
      this.debts.push({ loaner: "", cost: 0, APR: 0, loanYears: 0 });
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
    getProfitMargin(product) {
      return product.price - product.rawCost;
    },
    getTotalAPR(debt) {
      return (
        parseFloat(debt.cost) *
        (parseFloat(debt.APR) / 100) *
        parseFloat(debt.loanYears)
      );
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
  text-align: right;
}
.page-break {
  page-break-after: always;
}
.mainHeader {
  width: 100%;
  height: 50vh;
  background-image: url("../../public/images/charts.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mainHeader-overlay {
  width: 100%;
  height: 50vh;
  background: linear-gradient(
    230deg,
    rgba(42, 77, 160, 0.8) 33%,
    rgba(0, 114, 151, 0.8) 100%
  );
}
.mainHeader-whiteoverly {
  width: 100%;
  height: 45vh;
  position: relative;
  top: 5vh;
  background-color: rgba(255, 255, 255, 0.589);
}
</style>
