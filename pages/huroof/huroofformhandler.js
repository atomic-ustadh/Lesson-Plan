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
    const teacherComment = urlParams.get("teacherComment");
    const supervisorComment = urlParams.get("supervisorComment");
    const assignment = urlParams.get("assignment");

    /* const displayMe = document.getElementById("displayDiv");
     displayMe.innerHTML = `
         <p><strong>Subject:</strong> ${subject}</p>
         <p><strong>Topic:</strong> ${topic}</p>
         <p><strong>Duration:</strong> ${duration}</p>
         <p><strong>Class:</strong> ${classes}</p>
         <p><strong>Period:</strong> ${period}</p>
         <p><strong>Date:</strong> ${date}</p>
         <p><strong>Age:</strong> ${age}</p>
         <p><strong>Week:</strong> ${week}</p>
         <p><strong>Verse Start:</strong> ${verseStart}</p>
         <p><strong>Verse End:</strong> ${verseEnd}</p>
         <ol class="list-decimal pl-5">
             ${resources.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
         </ol>
         <p><strong>Introduction:</strong> ${introduction}</p>
         <p><strong>Evaluation:</strong> ${evaluation}</p>
         <p><strong>Teacher Comment:</strong> ${teacherComment}</p>
         <p><strong>Supervisor Comment:</strong> ${supervisorComment}</p>
         <ol class="list-decimal pl-5">
             ${assignment.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
         </ol>
     `;
     */
