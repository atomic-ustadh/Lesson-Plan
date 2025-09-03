document.getElementById('myForm').addEventListener('submit', function (event) {
		event.preventDefault(); // Prevent the default form submission

		const subject = document.getElementById("subject").value;
		const topic = document.getElementById("topic").value;
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
		const introduction = document.getElementById("introduction").value;
		const evaluation = document.getElementById("evaluation").value;
		const teacherComment = document.getElementById("teacherComment").value;
		const supervisorComment = document.getElementById("supervisorComment").value;
		const assignment = Array.from(document.querySelectorAll('#assignmentFields input[type="text"]'))
			.map(input => input.value)
			.filter(value => value.trim() !== '')
			.join(', ');

		if (!subject || !topic || !duration || !classes || !period || !date || !age || !week || !verseStart || !verseEnd || !resources || !introduction || !evaluation || !teacherComment || !assignment) {
			alert("Please fill in all fields.");
			return;
		}


		// Send data to formhandle.html via URL
		const params = new URLSearchParams({ subject, topic, duration, classes, period, date, age, week, verseStart, verseEnd, resources, introduction, evaluation, teacherComment, supervisorComment, assignment });
		window.location.href = `../tawheed/tawheedformhandle.html?${params.toString()}`;
	});

	// Assignment cancel button logic
	document.addEventListener('click', function (e) {
		if (e.target && e.target.classList.contains('cancel-assignment')) {
			const item = e.target.closest('.assignment-item');
			if (item) item.remove();
		}
	});

	// Add assignment input field logic
	document.addEventListener('DOMContentLoaded', function () {
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