const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const topic = urlParams.get("topic");
const duration = urlParams.get("duration");
const classes = urlParams.get("classes");
const period = urlParams.get("period");
const date = urlParams.get("date");
const age = urlParams.get("age");
const week = urlParams.get("week");
const verseStart = urlParams.get("verseStart");
const verseEnd = urlParams.get("verseEnd");
const resources = urlParams.get("resources");
const introduction = urlParams.get("introduction");
const evaluation = urlParams.get("evaluation");
const objectives = urlParams.get("objectives");
const methodologies = urlParams.get("methodologies");
const teacherComment = urlParams.get("teacherComment");
const supervisorComment = urlParams.get("supervisorComment");
const assignment = urlParams.get("assignment");

const displayTitle = document.getElementById("pageTitle");
if (displayTitle) {
    displayTitle.textContent = `${week} - ${classes} - ${subject}`;
}

const displayMe = document.getElementById("displayDiv");
if (displayMe) {
    displayMe.innerHTML = `
    <table class="min-w-full mb-2 overflow-hidden text-center">
      <thead class="bg-blue-100">
        <tr>
          <th class="px-4 py-2 border-black text-center"> المادة </th>
          <th class="px-4 py-2 border-black text-center"> الموضوع </th>
          <th class="px-4 py-2 border-black text-center"> الزمن </th>
          <th class="px-4 py-2 border-black text-center"> الصف </th>
          <th class="px-4 py-2 border-black text-center"> الحصة </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white items-center">
          <td class="px-4 py-2 border-black">${subject}</td>
          <td class="px-4 py-2 border-black">${topic}</td>
          <td class="px-4 py-2 border-black">${duration}</td>
          <td class="px-4 py-2 border-black">${classes}</td>
          <td class="px-4 py-2 border-black">${period}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-row space-x-4 border-2 border-gray-800 mb-2">
        <p class="text-green-600 pr-3">التمهيد: </p>
        <p class="pr-3">${introduction}</p>
    </div>
    <div class="grid grid-cols-3 gap-4">
        <div> مستوى أعمار المتعلمين : ${age}</div>
        <div>الأسبوع: ${week}</div>
        <div>التاريخ: ${date}</div>
    </div>

      <table class="min-w-full overflow-hidden">
      <thead class="bg-blue-50">
        <tr>
          <th class="px-4 py-2 border-black"> الأهداف السلوكية </th>
          <th class="px-4 py-2 border-black"> ملخص محتوى الدرس </th>
          <th class="px-4 py-2 border-black"> طريقة التدريس و مهارات الدرس </th>
          <th class="px-4 py-2 border-black"> الوسائل التعليمية المستخدمة </th>
          <th class="px-4 py-2 border-black"> الأنشطة / التقويم </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white">
          <td class="px-4 py-2 border-black" style="padding: 4px; text-align: right; vertical-align: top;">
            ${objectives}
          </td>
          <td class="border-black" style="padding: 4px; text-align: right; vertical-align: top;">
           هذا الدرس يشمل على دراسة ${topic} من ${verseStart} إلى ${verseEnd}
          </td>
          <td class="border-black" style="padding: 4px; text-align: right; vertical-align: top;">
           ${methodologies}
          </td>
          <td class="px-6 py-2 border-black" style="text-align: right; vertical-align: top;">
            <ol class="list-decimal pl-5">
             ${resources ? resources.split(",").map((item) => `<li>${item.trim()}</li>`).join("") : ''}
            </ol>
          </td>
          <td class="border-black" style="padding: 4px; text-align: right; vertical-align: top;">${evaluation}</td>
        </tr>
      </tbody>
    </table>

    <!--Assignment Section-->
    <div class="mb-3">
        <p class="text-green-600"> الواجبات </p>
        <div>
        <ol class="list-decimal pr-5">
            ${assignment ? assignment.split(",").map((item) => `<li>${item.trim()}</li>`).join("") : ''}
        </ol>
        </div>
    </div>
    <div class="block space-y-3">
      <div class="flex flex-col md:flex-row bg-[#f9fafb] border-2 border-gray-800 h-10 rounded-md p-3 space-y-0 w-fit h-fit"">
        <p>ملاحظات المدرس: ${teacherComment}</p>
        <p class="pr-4">توقيع</p>
      </div>
      <div class="flex flex-col md:flex-row bg-[#f9fafb] border-2 border-gray-800 h-10 rounded-md p-3 space-y-0 w-fit h-fit"">
        <p>ملاحظات المشرف: ${supervisorComment}</p>
        <p class="pr-4">توقيع</p>
      </div>
    </div>
    `;
}

