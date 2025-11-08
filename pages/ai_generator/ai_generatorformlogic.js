document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generateWithAi');
    const statusDiv = document.getElementById('generationStatus');
    const myForm = document.getElementById('myForm');

    // Form fields
    const subjectEl = document.getElementById("subject");
    const topicEl = document.getElementById("topic");
    const objectivesEl = document.getElementById("objectives");
    const introductionEl = document.getElementById("introduction");
    const methodologiesEl = document.getElementById("methodologies");
    const evaluationEl = document.getElementById("evaluation");
    const teacherCommentEl = document.getElementById("teacherComment");

    if (generateBtn) {
        generateBtn.addEventListener('click', generateLessonPlan);
    }

    async function generateLessonPlan() {
        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) {
            statusDiv.textContent = 'Error: Gemini API Key not found. Please add it on the main page.';
            statusDiv.style.color = 'red';
            return;
        }

        const subject = subjectEl.value;
        const topic = topicEl.value;

        if (!subject || !topic) {
            statusDiv.textContent = 'Please select a subject and enter a topic first.';
            statusDiv.style.color = 'red';
            return;
        }

        statusDiv.textContent = 'Generating lesson plan with AI... please wait.';
        statusDiv.style.color = 'blue';
        generateBtn.disabled = true;

        const prompt = `Please generate a lesson plan for the subject "${subject}" on the topic "${topic}".
        The lesson plan should be in Arabic and include the following sections. Use the exact Arabic headers provided below for each section, followed by the content.

        ### الأهداف السلوكية
        (List the behavioral objectives here)

        ### التمهيد
        (Write the introduction here)

        ### طريقة التدريس
        (Describe the teaching methodologies here)

        ### الأنشطة \\ التقويم
        (Detail the activities and evaluation methods here)

        ### الموارد التعليمية
        (List the instructional resources here)
        `;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const generatedText = data.candidates[0].content.parts[0].text;

            // A simple parser for the generated text
            const objectives = generatedText.split('### الأهداف السلوكية')[1]?.split('###')[0]?.trim();
            const introduction = generatedText.split('### التمهيد')[1]?.split('###')[0]?.trim();
            const methodologies = generatedText.split('### طريقة التدريس')[1]?.split('###')[0]?.trim();
            const evaluation = generatedText.split('### الأنشطة \\ التقويم')[1]?.split('###')[0]?.trim();
            const resources = generatedText.split('### الموارد التعليمية')[1]?.split('###')[0]?.trim();

            if(objectives) objectivesEl.value = objectives.replace(/\*/g, '');
            if(introduction) introductionEl.value = introduction.replace(/\*/g, '');
            if(methodologies) methodologiesEl.value = methodologies.replace(/\*/g, '');
            if(evaluation) evaluationEl.value = evaluation.replace(/\*/g, '');
            if(resources) teacherCommentEl.value = "الموارد المقترحة من الذكاء الاصطناعي:\n" + resources.replace(/\*/g, '');


            statusDiv.textContent = 'Lesson plan generated successfully!';
            statusDiv.style.color = 'green';

        } catch (error) {
            console.error('Error generating lesson plan:', error);
            statusDiv.textContent = 'Error generating lesson plan. Check the console for details.';
            statusDiv.style.color = 'red';
        } finally {
            generateBtn.disabled = false;
        }
    }

    if (myForm) {
        myForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const subject = subjectEl.value;
            const topic = topicEl.value;
            const duration = document.getElementById("duration").value;
            const classes = document.getElementById("classes").value;
            const period = document.getElementById("period").value;
            const date = document.getElementById("date").value;
            const age = document.getElementById("age").value;
            const week = document.getElementById("week").value;
            const verseStart = document.getElementById("verseStart").value;
            const resources = Array.from(document.querySelectorAll('input[name="resources"]:checked'))
                .map(checkbox => checkbox.value)
                .join(', ');
            const verseEnd = document.getElementById("verseEnd").value;
            const introduction = introductionEl.value;
            const evaluation = evaluationEl.value;
            const objectives = objectivesEl.value;
            const methodologies = methodologiesEl.value;
            const teacherComment = teacherCommentEl.value;
            const supervisorComment = document.getElementById("supervisorComment").value;
            const assignment = Array.from(document.querySelectorAll('#assignmentFields input[type="text"]'))
                .map(input => input.value.trim())
                .filter(value => value !== '')
                .join(', ');

            if (!subject || !topic || !duration || !classes || !period || !date || !age || !week) {
                alert("Please fill in compulsory fields.");
                return;
            }

            // Send data to formhandle.html via URL
            const params = new URLSearchParams({
                subject,
                topic,
                duration,
                classes,
                period,
                date,
                age,
                week,
                verseStart,
                verseEnd,
                resources,
                introduction,
                evaluation,
                objectives,
                methodologies,
                teacherComment,
                supervisorComment,
                assignment
            });
            window.location.href = `./ai_generatorformhandle.html?${params.toString()}`;
        });
    }

    // Assignment cancel button logic
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('cancel-assignment')) {
            const item = e.target.closest('.assignment-item');
            if (item) item.remove();
        }
    });

    // Add assignment input field logic
    var addBtn = document.getElementById('addAssignmentBtn');
    var assignmentFields = document.getElementById('assignmentFields');
    if (addBtn && assignmentFields) {
        addBtn.addEventListener('click', function () {
            var div = document.createElement('div');
            div.className = 'flex items-center space-x-4 assignment-item mr-3';
            div.innerHTML = '<input type="text" id="assignment" name="assignment" placeholder="أدخل سؤال الواجب..." class="w-full border rounded px-2" /> <button type="button" class="cancel-assignment bg-red-600 text-white rounded px-2" aria-label="Cancel">X</button>';
            assignmentFields.appendChild(div);
        });
    }
});

//This section is for the toggle logic for the resources section
function toggleResources() {
    const resourcesDiv = document.getElementById('resources-hidden-div');
    if (resourcesDiv.style.display === 'none') {
        resourcesDiv.style.display = 'grid';
    } else {
        resourcesDiv.style.display = 'none';
    }
}