// Sample tasks data with additional times for assignments, projects, and quizzes
const tasks = [
    {
        id: '101',
        name: 'Programming Fundamentals',
        instructor: 'Dr. Rizwan',
        type: 'Assignment',
        content: 'Complete all exercises from Chapter 1 and submit by Friday.',
        extraContent: [
            { question: 'What is a variable?', answer: 'A variable is a storage location paired with a name.' },
            { question: 'What is a function?', answer: 'A function is a block of code that performs a specific task.' }
        ],
        uploadedTime: '2024-12-01T10:00:00', // Date the assignment was uploaded
        deadline: '2024-12-05T23:59:59', // Deadline for submission
        downloadUrl: 'https://example.com/ProgrammingFundamentals.pdf' // URL to download PDF
    },
    {
        id: '102',
        name: 'Calculus',
        instructor: 'Prof. Johnson',
        type: 'Quiz',
        content: 'Quiz on Limits, please solve the questions in the quiz portal.',
        extraContent: [
            { question: 'What is the limit of (x -> 0) for sin(x)/x?', answer: 'The limit is 1.' },
            { question: 'What is the derivative of x^2?', answer: 'The derivative is 2x.' }
        ],
        startTime: '2024-12-02T09:00:00', // Start time for the quiz
        endTime: '2024-12-02T10:00:00', // End time for the quiz
        downloadUrl: 'https://example.com/CalculusQuiz.docx' // URL to download Word file
    },
    {
        id: '103',
        name: 'Applied Physics',
        instructor: 'Mrs. Anosh',
        type: 'Project',
        content: 'Create a project demonstrating the application of Newton\'s Laws.',
        extraContent: [
            { question: 'What is Newton\'s First Law?', answer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.' },
            { question: 'What is Newton\'s Second Law?', answer: 'Force equals mass times acceleration (F = ma).' }
        ],
        uploadedTime: '2024-11-30T14:00:00', // Date the project was uploaded
        deadline: '2024-12-15T23:59:59', // Deadline for the project submission
        downloadUrl: 'https://example.com/NewtonLawsProject.pdf' // URL to download PDF
    },
    {
        id: '110',
        name: 'Multi-Variate Calculus',
        instructor: 'Sir Munsif Jatoi',
        type: 'Assigmenemt',
        content: 'Create a project demonstrating the application of Newton\'s Laws.',
        extraContent: [
            { question: 'What is Newton\'s First Law?', answer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.' },
            { question: 'What is Newton\'s Second Law?', answer: 'Force equals mass times acceleration (F = ma).' }
        ],
        uploadedTime: '2024-11-30T14:00:00', // Date the project was uploaded
        deadline: '2024-12-15T23:59:59', // Deadline for the project submission
        downloadUrl: 'https://example.com/NewtonLawsProject.pdf' // URL to download PDF
    }
];

// Function to handle file upload
function handleFileUpload(taskId) {
    const fileInput = document.getElementById(`file-input-${taskId}`);
    const file = fileInput.files[0];

    if (file) {
        alert(`File "${file.name}" uploaded successfully for Task ID: ${taskId}`);
    } else {
        alert("No file selected for upload.");
    }
}

// Function to open the modal and display task content
function openModal(taskId) {
    const modal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalContent = document.getElementById('modal-content');
    const modalQuestions = document.getElementById('modal-questions');
    const saveButton = document.getElementById('save-button');
    const downloadButton = document.getElementById('download-button');
    const taskTime = document.getElementById('task-time'); // For showing time information (start, end, deadline)

    // Find the task from the tasks array by its id
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        // Set task content inside the modal
        modalTitle.textContent = task.name;
        modalDescription.textContent = `Instructor: ${task.instructor} | Type: ${task.type}`;
        modalContent.textContent = task.content;

        // Display questions for quizzes or assignments
        modalQuestions.innerHTML = ''; // Clear previous content
        task.extraContent.forEach((item, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'mb-4';
            questionElement.innerHTML = `
                <strong>Q${index + 1}: ${item.question}</strong>
                <p class="text-gray-600">Answer: ${item.answer}</p>
            `;
            modalQuestions.appendChild(questionElement);
        });

        // Show time-related information based on task type
        if (task.type === 'Quiz') {
            taskTime.innerHTML = `
                <p><strong>Start Time:</strong> ${new Date(task.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> ${new Date(task.endTime).toLocaleString()}</p>
            `;
        } else if (task.type === 'Assignment' || task.type === 'Project') {
            taskTime.innerHTML = `
                <p><strong>Uploaded Time:</strong> ${new Date(task.uploadedTime).toLocaleString()}</p>
                <p><strong>Deadline:</strong> ${new Date(task.deadline).toLocaleString()}</p>
            `;
        }

        // Enable the download button if there's a download URL
        downloadButton.disabled = !task.downloadUrl;

        // Show the modal
        modal.classList.remove('hidden');
    }
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('task-modal');
    modal.classList.add('hidden');
}

// Function to handle save action (e.g., marking the task as completed)
function saveTask() {
    alert('Task saved successfully!');
    closeModal();
}

// Function to handle task download
function downloadTask() {
    const taskId = document.getElementById('modal-title').textContent;  // Use task name or any identifier to find the task
    const task = tasks.find(t => t.name === taskId);

    if (task && task.downloadUrl) {
        const downloadUrl = task.downloadUrl;

        // Simulating download of the file from the URL
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = downloadUrl.split('/').pop(); // Extract file name from URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('No download link available for this task.');
    }
}

// Function to render tasks dynamically
function renderTasks() {
    const tasksContainer = document.getElementById('tasks-container');
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300';
        taskCard.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${task.name}</h3>
            <p class="text-gray-600 mb-2">Course ID: ${task.id}</p>
            <p class="text-gray-600 mb-2">Instructor: ${task.instructor}</p>
            <p class="text-gray-600 mb-4">Type: ${task.type}</p>

            <div class="flex items-center gap-2">
                <input 
                    type="file" 
                    id="file-input-${task.id}" 
                    class="border w-[70%] p-2 rounded bg-gray-100 text-gray-800" 
                    accept="application/pdf, .docx, .pptx, .jpg, .png">
                <button 
                    onclick="handleFileUpload('${task.id}')" 
                    class="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                    Upload
                </button>
            </div>

            <div class="mt-4">
                <button 
                    onclick="openModal('${task.id}')" 
                    class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                    Open
                </button>
            </div>
        `;
        tasksContainer.appendChild(taskCard);
    });
}

// Render tasks when the page loads
renderTasks();
