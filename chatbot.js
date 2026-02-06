/**
 * ========================================
 * OR STUDY ASSISTANT CHATBOT WIDGET
 * Standalone JavaScript - No dependencies
 * ========================================
 */

(function() {
    'use strict';

    // ========================================
    // CONFIGURATION
    // ========================================
    const CONFIG = {
        typingDelayMin: 800,
        typingDelayMax: 1500,
        welcomeDelay: 800,
        maxMessageLength: 1000
    };

    // ========================================
    // KNOWLEDGE BASE
    // ========================================
    const KNOWLEDGE = {
        platform: {
            keywords: ['how', 'work', 'use', 'platform', 'site', 'navigate'],
            response: "Welcome to the OR Quiz Platform! Here's how it works:\n\n1. Choose a section (Stock Control, Queuing Theory, etc.)\n2. Select quiz length (15 or 30 questions)\n3. Complete timed quiz with instant feedback\n4. Review results and retry to improve\n\nYou can take quizzes as many times as you want!"
        },
        quizRules: {
            keywords: ['quiz', 'rule', 'time', 'limit', 'duration'],
            response: "Quiz Rules:\n\n⏱️ Theory questions: 30 seconds each\n🧮 Calculation questions: 50 seconds each\n\n• Immediate feedback on each answer\n• Final score at the end\n• Unlimited retries\n• Randomized questions each time"
        },
        startingPoint: {
            keywords: ['start', 'begin', 'first', 'which', 'section', 'recommend'],
            response: "Starting recommendations:\n\n✅ New to OR: Start with Stock Control\n✅ Some background: Try Linear Programming\n✅ Want a challenge: Queuing Theory or Project Management\n\nBest approach: Follow your course syllabus or start with topics you find most interesting!"
        },
        stockControl: {
            keywords: ['stock', 'control', 'inventory', 'eoq'],
            response: "Stock Control (Inventory Management) optimizes inventory levels and reorder timing.\n\nKey concepts:\n• Economic Order Quantity (EOQ)\n• Safety stock for preventing stockouts\n• Reorder points\n• Balancing ordering and holding costs\n\nGreat for understanding supply chain cost minimization!"
        },
        queuingTheory: {
            keywords: ['queue', 'queuing', 'waiting', 'line', 'service'],
            response: "Queuing Theory analyzes waiting lines - think banks, hospitals, call centers.\n\nTopics covered:\n• Arrival rates (λ) and service rates (μ)\n• Queue performance metrics\n• Different queue models (M/M/1, M/M/c)\n• System utilization\n\nPractical math with real-world applications!"
        },
        linearProgramming: {
            keywords: ['linear', 'programming', 'lp', 'optimize', 'simplex'],
            response: "Linear Programming is the heart of OR - optimizing objectives under constraints.\n\nCore topics:\n• Mathematical problem formulation\n• Graphical solution methods\n• Simplex algorithm\n• Sensitivity analysis\n• Feasible regions\n\nIncredibly powerful - used in logistics, finance, and more!"
        },
        transportation: {
            keywords: ['transport', 'distribution', 'shipping', 'vogel', 'modi'],
            response: "Transportation Problems optimize distribution networks for minimum cost.\n\nKey methods:\n• Northwest Corner Method\n• Vogel's Approximation Method\n• MODI Method (optimality testing)\n• Handling unbalanced problems\n\nFundamental for supply chain optimization!"
        },
        assignment: {
            keywords: ['assignment', 'hungarian', 'allocate', 'resource'],
            response: "Assignment Problems handle optimal one-to-one matching.\n\nYou'll master:\n• Hungarian Algorithm\n• Matrix reduction techniques\n• Maximization problems\n• Unbalanced assignments\n\nEssential for resource allocation and scheduling!"
        },
        projectManagement: {
            keywords: ['project', 'management', 'cpm', 'pert', 'network', 'critical'],
            response: "Project Management / Network Analysis helps plan and control complex projects.\n\nKey techniques:\n• Critical Path Method (CPM)\n• PERT analysis\n• Network diagrams\n• Slack time calculations\n• Project duration optimization\n\nUsed in construction, software, and all project work!"
        },
        studyTips: {
            keywords: ['study', 'tip', 'advice', 'prepare', 'learn', 'improve'],
            response: "Top study tips for OR:\n\n📚 Practice regularly - daily short sessions beat cramming\n🧮 Master formulas - know when to apply them\n✍️ Work through examples - understand the 'why'\n🔄 Retry quizzes - reinforcement is key\n📝 Keep an error log - review mistakes weekly\n👥 Study with peers - teaching deepens understanding"
        },
        examPrep: {
            keywords: ['exam', 'test', 'examination'],
            response: "Exam preparation tips:\n\n1️⃣ Use timed quizzes to simulate exam pressure\n2️⃣ Review Past Questions section\n3️⃣ Practice both theory and calculations\n4️⃣ Identify weak areas for targeted practice\n5️⃣ Master time management\n\nConsistent practice beats last-minute cramming!"
        },
        pastQuestions: {
            keywords: ['past', 'question', 'previous', 'archive', 'download'],
            response: "Our Past Questions section has authentic exam papers by topic and year.\n\nHow to use:\n• Download PDFs for each section\n• Practice under timed conditions\n• Compare with provided solutions\n• Identify question patterns\n\nUse ethically for study only - supplement learning, don't replace it!"
        },
        lecturer: {
            keywords: ['lecturer', 'professor', 'teacher', 'winful'],
            response: "Prof. Ernest C. Winful is a distinguished OR academic with 20+ years of university teaching.\n\nExpertise:\n• Optimization techniques\n• Stochastic modeling\n• Decision analysis\n• Supply chain management\n\nHe designed this platform for active practice and immediate feedback. Visit the 'Lecturer' page to learn more!"
        },
        difficulty: {
            keywords: ['difficult', 'hard', 'easy', 'level', 'challenge'],
            response: "Quiz difficulty levels:\n\n🟢 Basic: Fundamental concepts and simple calculations\n🟡 Intermediate: Application problems\n🔴 Advanced: Complex scenarios and multi-step problems\n\nStart with 15-question quizzes, move to 30-question as you improve!"
        },
        mobile: {
            keywords: ['mobile', 'phone', 'app', 'tablet'],
            response: "Yes! Fully responsive on mobile and tablets.\n\nFeatures:\n• Full quiz functionality\n• Touch-friendly interface\n• Hamburger menu navigation\n• Dark mode support\n• Progress saved across devices\n\nStudy on the go!"
        },
        scores: {
            keywords: ['score', 'grade', 'result', 'progress', 'track'],
            response: "After each quiz:\n\n📊 Percentage score\n✅ Correct answer count\n⏱️ Total time taken\n📈 Performance feedback\n\nScores aren't saved between sessions - focus on learning from mistakes, not chasing perfection!"
        },
        academicIntegrity: {
            keywords: ['cheat', 'answer', 'solution', 'solve', 'homework'],
            response: "I'm here to guide learning, not provide direct answers!\n\n✅ I can:\n• Explain concepts at high level\n• Recommend study approaches\n• Clarify quiz rules\n• Suggest focus topics\n\n❌ I cannot:\n• Solve homework/exam questions\n• Provide step-by-step solutions\n• Give detailed formulas\n\nGoal: help you learn, not shortcut the process!"
        }
    };

    const GREETINGS = [
        "Hello! I'm your OR Study Assistant. How can I help you today?",
        "Hi there! Ready to tackle Operations Research? Ask me anything!",
        "Hey! I'm here to help with OR. What would you like to know?",
        "Greetings! I'm your study companion. How can I assist?"
    ];

    const FAREWELLS = [
        "Goodbye! Best of luck with your studies! 📚",
        "See you later! Keep practicing! 🎯",
        "Take care! Consistent practice is key! 💪",
        "Bye! Come back anytime you need help! 👋"
    ];

    const UNKNOWN = [
        "I'm not sure I understand. Could you rephrase? I can help with platform usage, quiz rules, OR sections, and study tips.",
        "Hmm, didn't catch that. Try asking about: platform features, specific OR sections, quiz timing, or study strategies.",
        "I'm designed to help with OR and this platform. Ask about a specific topic like 'Explain Linear Programming' or 'How do quizzes work?'",
        "Let me help you! Try asking about: course sections, quiz features, study preparation, or platform navigation."
    ];

    // ========================================
    // STATE
    // ========================================
    let isOpen = false;
    let isMinimized = false;
    let isTyping = false;
    let hasSeenWelcome = false;

    // ========================================
    // DOM ELEMENTS
    // ========================================
    let toggleBtn, chatContainer, messagesDiv, inputTextarea, sendBtn;
    let minimizeBtn, closeBtn, suggestionsDiv, badge;

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        // Get DOM elements
        toggleBtn = document.getElementById('orChatbotToggle');
        chatContainer = document.getElementById('orChatbotContainer');
        messagesDiv = document.getElementById('orChatbotMessages');
        inputTextarea = document.getElementById('orChatbotInput');
        sendBtn = document.getElementById('orChatbotSend');
        minimizeBtn = document.getElementById('orChatbotMinimize');
        closeBtn = document.getElementById('orChatbotClose');
        suggestionsDiv = document.getElementById('orChatbotSuggestions');
        badge = document.getElementById('orChatbotBadge');

        // Setup event listeners
        setupEventListeners();

        // Show welcome badge
        showBadge();
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    function setupEventListeners() {
        toggleBtn.addEventListener('click', toggleChat);
        minimizeBtn.addEventListener('click', minimizeChat);
        closeBtn.addEventListener('click', closeChat);
        sendBtn.addEventListener('click', handleSend);

        inputTextarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });

        inputTextarea.addEventListener('input', autoResize);

        // Suggestion chips
        const chips = suggestionsDiv.querySelectorAll('.or-suggestion-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.getAttribute('data-message');
                inputTextarea.value = message;
                handleSend();
            });
        });
    }

    // ========================================
    // CHAT CONTROLS
    // ========================================
    function toggleChat() {
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    function openChat() {
        isOpen = true;
        chatContainer.classList.add('active');
        toggleBtn.style.display = 'none';
        hideBadge();
        inputTextarea.focus();

        // Show welcome message on first open
        if (!hasSeenWelcome) {
            setTimeout(() => {
                showWelcome();
                hasSeenWelcome = true;
            }, CONFIG.welcomeDelay);
        }
    }

    function closeChat() {
        isOpen = false;
        isMinimized = false;
        chatContainer.classList.remove('active', 'minimized');
        toggleBtn.style.display = 'flex';
    }

    function minimizeChat() {
        isMinimized = !isMinimized;
        chatContainer.classList.toggle('minimized');
        
        // Update minimize icon
        if (isMinimized) {
            minimizeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>`;
        } else {
            minimizeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>`;
        }
    }

    function showBadge() {
        if (badge) {
            badge.classList.remove('hidden');
        }
    }

    function hideBadge() {
        if (badge) {
            badge.classList.add('hidden');
        }
    }

    // ========================================
    // MESSAGES
    // ========================================
    function showWelcome() {
        const welcomeMsg = "Welcome to the OR Study Assistant! 👋\n\nI'm here to help you navigate the platform and understand Operations Research concepts.\n\nTry asking:\n• How this platform works\n• About specific OR sections\n• For study tips\n• About quiz rules\n\nClick a suggestion or type your question!";
        addMessage(welcomeMsg, 'bot');
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `or-message ${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'or-message-avatar';
        avatar.textContent = sender === 'user' ? 'U' : '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'or-message-content';

        const bubble = document.createElement('div');
        bubble.className = 'or-message-bubble';
        bubble.textContent = text;

        const time = document.createElement('div');
        time.className = 'or-message-time';
        time.textContent = getTime();

        contentDiv.appendChild(bubble);
        contentDiv.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        messagesDiv.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTyping() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'or-message bot';
        messageDiv.id = 'orTypingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'or-message-avatar';
        avatar.textContent = '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'or-message-content';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'or-typing-indicator';
        typingDiv.innerHTML = `
            <div class="or-typing-dot"></div>
            <div class="or-typing-dot"></div>
            <div class="or-typing-dot"></div>
        `;

        contentDiv.appendChild(typingDiv);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        messagesDiv.appendChild(messageDiv);
        scrollToBottom();

        return messageDiv;
    }

    function hideTyping() {
        const typing = document.getElementById('orTypingIndicator');
        if (typing) {
            typing.remove();
        }
    }

    // ========================================
    // MESSAGE HANDLING
    // ========================================
    async function handleSend() {
        const message = inputTextarea.value.trim();

        if (!message || isTyping || message.length > CONFIG.maxMessageLength) {
            return;
        }

        // Add user message
        addMessage(message, 'user');

        // Clear input
        inputTextarea.value = '';
        autoResize();

        // Show typing
        isTyping = true;
        const typingIndicator = showTyping();

        // Delay
        const delay = Math.random() * (CONFIG.typingDelayMax - CONFIG.typingDelayMin) + CONFIG.typingDelayMin;
        await sleep(delay);

        // Generate response
        const response = generateResponse(message);

        // Hide typing and show response
        hideTyping();
        addMessage(response, 'bot');
        isTyping = false;
    }

    function generateResponse(message) {
        const msg = message.toLowerCase().trim();

        // Greetings
        if (isGreeting(msg)) {
            return randomItem(GREETINGS);
        }

        // Farewells
        if (isFarewell(msg)) {
            return randomItem(FAREWELLS);
        }

        // Check knowledge base
        for (const [key, data] of Object.entries(KNOWLEDGE)) {
            if (matchKeywords(msg, data.keywords)) {
                return data.response;
            }
        }

        return randomItem(UNKNOWN);
    }

    function isGreeting(msg) {
        const greetings = ['hi', 'hello', 'hey', 'greetings'];
        return greetings.some(g => msg.startsWith(g) || msg === g);
    }

    function isFarewell(msg) {
        const farewells = ['bye', 'goodbye', 'see you', 'farewell', 'later'];
        return farewells.some(f => msg.includes(f));
    }

    function matchKeywords(msg, keywords) {
        return keywords.some(k => msg.includes(k));
    }

    function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ========================================
    // UTILITIES
    // ========================================
    function getTime() {
        const now = new Date();
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    }

    function autoResize() {
        inputTextarea.style.height = 'auto';
        inputTextarea.style.height = Math.min(inputTextarea.scrollHeight, 100) + 'px';
    }

    function scrollToBottom() {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ========================================
    // START
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
